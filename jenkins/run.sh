#!/bin/bash

# docker version
if [ -n "$DOCKER_VERSION" ] ; then
  wget https://get.docker.com/builds/Linux/x86_64/docker-${DOCKER_VERSION} -O /usr/bin/docker
fi

# rbenv
if [ ! -d /app/jenkins/rbenv ] ; then
  mkdir -p /app/jenkins/rbenv
  cp -rp /root/.rbenv/{.*,*} /app/jenkins/rbenv
fi
mv /root/.rbenv /root/.rbenv_bak
ln -s /app/jenkins/rbenv /root/.rbenv

# npm
if [ ! -d /app/jenkins/npm ] ; then
  mkdir -p /app/jenkins/npm
  cp -rp /root/.npm/{.*,*} /app/jenkins/npm
fi
mv /root/.npm /root/.npm_bak
ln -s /app/jenkins/npm /root/.npm

# docker in docker
docker $DOCKER_OPTS -H unix:///var/run.docker.sock -d &

CATALINA_OPTS="-Djava.security.egd=file:/dev/./urandom -Dfile.encoding=UTF-8 -Xms1024m -Xmx2048m -XX:MaxPermSize=512m -XX:MaxPermSize=1024m -Djava.awt.headless=true"

# copy plugins
if [ ! -d /app/jenkins/home/plugins ] ; then
  mkdir -p /app/jenkins/home/plugins
fi

for f in `ls /app/plugins`
do
  if [ ! -f /app/jenkins/home/plugins/$f ] ; then
    cp /app/plugins/$f /app/jenkins/home/plugins
  fi
done

sed -i -e "s/port=\"8080\"/port=\"8080\" URIEncoding=\"UTF-8\"/g" /app/tomcat/conf/server.xml
/app/tomcat/bin/catalina.sh run

