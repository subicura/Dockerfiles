FROM jenkins/jenkins:lts
LABEL maintainer "Junghoon Kim <k@purpleworks.co.kr>"

USER root

RUN apt-get update \
    && apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common \
    && curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" \
    && apt-get update \
    && apt-get install -y docker-ce \
	&& rm -rf /var/lib/apt/lists/*

ENV DOCKER_COMPOSE_VERSION 1.18.0

RUN curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

ARG user=jenkins

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
    ssh-slaves \
    subversion \
    timestamper \
    workflow-aggregator \
    ws-cleanup 