# HTB Walkthrough — Machine: Cap

**Target IP:** `10.10.10.245`  

**Author:** Miguel Reis  

**Difficulty:** Easy  

**OS:** Linux


![[Cap-20240818184636794.png]]

On the http page we see that security snapshot does a 5 second pcap that you can download, you can also access others captures changing the link:
![[Cap-20240818193649581.png]]

Downloading it we find unencrypted ftp traffic displaying login credentials

![[Cap-20240818193733785.png]]


The /usr/bin/python3.8 is
found to have cap_setuid and cap_net_bind_service , which isn't the default setting..

CAP_SETUID allows the process to gain setuid privileges without the SUID bit set. This
effectively lets us switch to UID 0 i.e. root.


```python
import os
os.setuid(0)
os.system("/bin/bash")
```
