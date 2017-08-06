#
# ubuntu latest upgrade version
#
# build:
#   docker build --force-rm=true -t subicura/ubuntu:14.04 .

FROM ubuntu:14.04

MAINTAINER subicura@subicura.com

ENV DEBIAN_FRONTEND noninteractive

RUN echo "20170803"
RUN sed -i -e 's/archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y upgrade

RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8  
