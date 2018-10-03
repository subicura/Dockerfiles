FROM jenkins/jenkins:lts
LABEL maintainer "Chungsub Kim <subicura@subicura.com>"

USER root

ENV DOCKER_VERSION 18.06.1-ce
ENV DOCKER_COMPOSE_VERSION 1.22.0
RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz | tar --strip-components=1 -xz -C /usr/local/bin docker/docker
RUN curl -fsSL https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

USER jenkins
