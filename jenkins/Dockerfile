#
# jenkins 1.6x (http://jenkins-ci.org)
#
# build:
#   docker build --force-rm=true -t subicura/jenkins .
# run:
#   docker run -p 8080:8080 -v /home/ubuntu/jenkins:/app/jenkins -d subicura/jenkins
#

FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive

# update ubuntu latest
RUN echo "2015.05.18"
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common git wget

# install java
RUN \
  echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get -qq update && \
  apt-get -qq -y install oracle-java7-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk7-installer
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# install tomcat
RUN \
  mkdir /app && \
  cd /app && \
  wget -q -O - http://mirror.apache-kr.org/tomcat/tomcat-7/v7.0.62/bin/apache-tomcat-7.0.62.tar.gz | tar xfz - && \
  ln -s apache-tomcat-7.0.62 tomcat

# install jenkins
RUN \
  cd /app/tomcat/webapps && \
  rm -rf * && \
  wget -q http://mirrors.jenkins-ci.org/war/latest/jenkins.war -O ROOT.war

# setup jenkins
WORKDIR /app
RUN \
  mkdir jenkins
ENV JENKINS_HOME /app/jenkins
ENV CATALINA_OPTS "-Dfile.encoding=UTF-8 -Xmx512m -Xmx1024m -XX:MaxPermSize=512M -Djava.awt.headless=true"

# volume
VOLUME ["/app/jenkins"]

# expose
EXPOSE 80 443

# run
ADD run.sh /app/run.sh
CMD /app/run.sh
#CMD /usr/local/nginx/sbin/nginx
