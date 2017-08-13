#
# ubuntu latest upgrade version
#
# build:
#   docker build --force-rm=true -t subicura/ruby-node:2.3_6 .

FROM subicura/ubuntu:16.04

MAINTAINER subicura@subicura.com

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git curl wget 

# install ruby2.3
RUN \
  add-apt-repository -y ppa:brightbox/ruby-ng && \
  apt-get -qq update && \
  apt-get -qq -y install ruby2.3 ruby2.3-dev && \
  gem install bundler --no-ri --no-rdoc

# install node 6
RUN \
    wget -qO- https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get -qq -y install nodejs


