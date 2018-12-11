FROM jenkins/jenkins:lts
LABEL maintainer "Chungsub Kim <subicura@subicura.com>"

USER root

RUN apt-get update
RUN apt-get install -yqq libltdl-dev python-pip
RUN pip install --upgrade awscli

ENV DOCKER_VERSION 18.09.0
ENV DOCKER_COMPOSE_VERSION 1.23.2
RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz | tar --strip-components=1 -xz -C /usr/local/bin docker/docker
RUN curl -fsSL https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
