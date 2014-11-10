# build
#   docker build -t subicura/mariadb-cluster .
#
# bootstrap
#   run "mysql_install_db" first
# init
#   docker run --rm -it \
#              -p 3306:3306 \
#              -p 4444:4444 \
#              -p 4567:4567 \
#              -p 4568:4568 \
#              -v /mnt/mysql/lib:/var/lib/mysql \
#              -e SSTUSER_PASSWORD=1234 \
#              -e NODE_NAME=galera1 \
#              -e NODE_ADDRESS=172.17.8.101 \
#              subicura/mariadb-cluster
# cluster node
#   docker run --rm -it \
#              -p 3306:3306 \
#              -p 4444:4444 \
#              -p 4567:4567 \
#              -p 4568:4568 \
#              -v /mnt/mysql/lib:/var/lib/mysql \
#              -e SSTUSER_PASSWORD=1234 \
#              -e NODE_NAME=galera2 \
#              -e NODE_ADDRESS=172.17.8.102 \
#              -e CLUSTER_ADDRESS=172.17.8.101,172.17.8.102,172.17.8.103 \
#              subicura/mariadb-cluster
# garb  node
#   docker run --rm -it \
#              -p 4567:4567 \
#              -e GALERA_NODES="172.17.8.101:4567 172.17.8.102:4567 172.17.8.103:4567" \
#              subicura/mariadb-cluster


FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive 

# update ubuntu latest
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade #2014.11.10

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git curl

# install mariadb
RUN \
  apt-get -y install python-software-properties && \
  apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xcbcb082a1bb943db && \
  add-apt-repository 'deb http://ftp.kaist.ac.kr/mariadb/repo/10.0/ubuntu/ trusty main' && \
  apt-get -y update && \
  apt-get -y install mariadb-galera-server galera openntpd rsync netcat-openbsd socat pv

# install xtrabackup
RUN \
  apt-key adv --keyserver keys.gnupg.net --recv-keys 1C4CBDCDCD2EFD2A && \
  add-apt-repository 'deb http://repo.percona.com/apt trusty main' && \
  apt-get -y update && \
  apt-get install -y percona-xtrabackup

# add conf
ADD galera.cnf /etc/mysql/conf.d/galera.cnf

# volume
VOLUME ["/var/lib/mysql"]

# expose
EXPOSE 3306
EXPOSE 4444
EXPOSE 4567
EXPOSE 4568

# run
ADD set_sstuser_password.sh /root/set_sstuser_password.sh
ADD run.sh /root/run.sh
RUN chmod +x /root/run.sh /root/set_sstuser_password.sh
CMD /root/run.sh
