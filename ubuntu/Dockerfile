#
# ubuntu latest upgrade version
#
# build:
#   docker build --force-rm=true -t subicura/ubuntu:16.04 .

FROM ubuntu:16.04

MAINTAINER subicura@subicura.com

ENV DEBIAN_FRONTEND noninteractive

RUN echo "20171220"
# RUN sed -i -e 's/archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y upgrade

RUN apt-get install -qq -y locales
RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8  
