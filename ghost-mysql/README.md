# ghost-mysql

Dockerfile to build the ghost docker image

## Install

1. mysql 설치 (https://github.com/tutumcloud/tutum-docker-mysql)

```
docker run --rm -v /data/ghost/mysql:/var/lib/mysql tutum/mysql /bin/bash -c "/usr/bin/mysql_install_db"
docker run --name=db -d -e MYSQL_GHOST_PASS=new-ghost-password -p 3306:3306 -v /data/ghost/mysql:/var/lib/mysql tutum/mysql

# change admin password
docker exec -it db /bin/bash
$ /usr/bin/mysqladmin -u root password 'new-admin-password'
```

2. db 설치

```
docker exec -it db /bin/bash
$ /usr/bin/mysql -uroot -p

create database ghost CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
grant all privileges on ghost.* to ghost@'%' identified by 'new-ghost-password' with grant option;
flush privileges;
```

3. 설정파일

```
vi /data/ghost/app/config.js
```

4. run

```
docker run --name ghost --link db:db -d -p 80:2368 -v /data/ghost/app:/ghost-override subicura/ghost-mysql
```

## Reference

- https://github.com/dockerfile/ghost
