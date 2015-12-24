#
# jenkins 1.6x (http://jenkins-ci.org)
#
# build:
#   docker build --force-rm=true -t subicura/jenkins .
# run:
#   docker run -p 80:8080 -v /home/ubuntu/jenkins:/app/jenkins \
#                         -v /var/run/docker.sock:/var/run/docker.sock \
#                         -d subicura/jenkins
#

FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive

# update ubuntu latest
RUN echo "2015.12.20"
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common git wget curl

# install dev library
RUN \
  apt-get -qq -y install bison openssl telnet libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev libffi-dev libmysqlclient-dev imagemagick libmagickcore-dev libmagickwand-dev

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
  wget -q -O - http://mirror.apache-kr.org/tomcat/tomcat-7/v7.0.67/bin/apache-tomcat-7.0.67.tar.gz | tar xfz - && \
  ln -s apache-tomcat-7.0.67 tomcat

# install jenkins
RUN \
  cd /app/tomcat/webapps && \
  rm -rf * && \
  wget -q http://mirrors.jenkins-ci.org/war/latest/jenkins.war -O ROOT.war

# install rbenv
RUN \
  git clone https://github.com/sstephenson/rbenv.git ~/.rbenv && \
  mkdir -p ~/.rbenv/plugins && \
  git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

# install node
RUN \
  curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
  apt-get -qq -y install nodejs && \
  npm install -g bower && \
  npm install -g grunt-cli

# install docker
# RUN \
#   curl -sSL https://get.docker.com/ | sh

# setup jenkins
WORKDIR /app
ENV JENKINS_HOME /app/jenkins/home

# add plugins
RUN mkdir -p /app/plugins
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/scm-api.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/git.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/git-client.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/git-server.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/workflow-step-api.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/ssh-agent.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/slack.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/violations.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/ansicolor.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/gitlab-hook.hpi

# add plugins (ruby)
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/rbenv.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/rake.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/ruby-runtime.hpi
RUN wget -q -P /app/plugins http://updates.jenkins-ci.org/latest/rubyMetrics.hpi

# env
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV TERM xterm

# volume
VOLUME ["/app/jenkins"]

# expose
EXPOSE 8080

# run
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
ADD run.sh /app/run.sh
CMD /app/run.sh

