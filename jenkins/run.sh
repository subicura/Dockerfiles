#!/bin/sh

#CATALINA_OPTS="-Dfile.encoding=UTF-8 -Xmx512m -Xmx1024m -XX:MaxPermSize=512M -Djava.awt.headless=true"
CATALINA_OPTS="-Dfile.encoding=UTF-8 -Djava.awt.headless=true"

# copy plugins
if [ ! -d /app/jenkins/plugins ] ; then
  mkdir /app/jenkins/plugins
fi

for f in `ls /app/plugins`
do
  if [ ! -f /app/jenkins/plugins/$f ] ; then
    cp /app/plugins/$f /app/jenkins/plugins
  fi
done

sed -i -e "s/port=\"8080\"/port=\"8080\" URIEncoding=\"UTF-8\"/g" /app/tomcat/conf/server.xml
/app/tomcat/bin/catalina.sh run
