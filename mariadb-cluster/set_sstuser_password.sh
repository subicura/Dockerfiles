#!/bin/sh

set -u

mv /etc/mysql/conf.d/galera.cnf /etc/mysql/conf.d/galera.bak

MSA=/usr/bin/mysqladmin

/usr/bin/mysqld_safe &

# check booting

sleep 5 # wait for mysqld_safe to rev up, and check for port 3306
port_open=0

while [ "$port_open" -eq 0 ]; do
   /bin/nc -z -w 5 127.0.0.1 3306
   if [ $? -ne 0 ]; then
       echo "Sleeping waiting for port 3306 to open: result " $? 
       sleep 1
   else
       echo "Port 3306 is open"
       port_open=1
   fi
done

# set password
echo "set sstuser password"
SSTUSER_PASSWORD_QUERY="CREATE USER 'sstuser'@'localhost' IDENTIFIED BY '${SSTUSER_PASSWORD}'"
echo "$SSTUSER_PASSWORD_QUERY" | mysql -u root mysql
echo "GRANT RELOAD, LOCK TABLES, REPLICATION CLIENT ON *.* TO 'sstuser'@'localhost'" | mysql -u root mysql
echo "FLUSH PRIVILEGES" | mysql -u root mysql

# shutdown
echo "Shutting down MySQL server"
${MSA} -uroot shutdown

mv /etc/mysql/conf.d/galera.bak /etc/mysql/conf.d/galera.cnf