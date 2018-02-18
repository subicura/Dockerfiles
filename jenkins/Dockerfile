FROM jenkins/jenkins:lts
LABEL maintainer "Junghoon Kim <k@purpleworks.co.kr>"

USER root

ENV DOCKER_VERSION 17.12.0-ce
ENV DOCKER_COMPOSE_VERSION 1.19.0
RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz | tar --strip-components=1 -xz -C /usr/local/bin docker/docker
RUN curl -fsSL https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

USER ${user}

# Install Jenkins plugins
RUN install-plugins.sh \
    ant \
    antisamy-markup-formatter \
    blueocean \
    bouncycastle-api \
    build-timeout \
    command-launcher \
    docker-workflow \
    email-ext \
    gradle \
    git \
    ldap \
    locale \
    mapdb-api \
    matrix-auth \
    pam-auth \
    pipeline-github-lib \
    pipeline-stage-view \
    resource-disposer \
    slack \
    ssh-slaves \
    subversion \
    timestamper \
    workflow-aggregator \
    ws-cleanup 
