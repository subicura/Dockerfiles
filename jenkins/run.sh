#!/bin/sh

sed -i -e "s/port=\"8080\"/port=\"8080\" URIEncoding=\"UTF-8\"/g" /app/tomcat/conf/server.xml
/app/tomcat/bin/catalina.sh run
