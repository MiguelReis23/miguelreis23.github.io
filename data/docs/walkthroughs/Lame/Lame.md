# HTB Walkthrough — Machine: Lame

**Target IP:** `10.10.10.3`  

**Author:** Miguel Reis  

**Difficulty:** Easy  

**OS:** Linux

![[Lame-20240715174847888.png]]

We try to use metasploit to exploit a possible [vulnerability](https://www.rapid7.com/db/modules/exploit/unix/ftp/vsftpd_234_backdoor/) it didn't work.

We find that samba 3.0.20 may also have a vulnerability [CVE-2007-2447](https://www.cvedetails.com/cve/CVE-2007-2447/) and we can try to use metasploit to get a reverse shell.

After getting a reverse shell as root we can upgrade it with:


```
script /dev/null -c bash
```

