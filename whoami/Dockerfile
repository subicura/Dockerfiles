# build
# * default : docker build --force-rm=true -t whoami .
#
# run
# * docker run -d -p 8080:8080 --name whoami whoami

FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

# update ubuntu latest
RUN \
  DEBIAN_FRONTEND=noninteractive apt-get -qq update && \
  DEBIAN_FRONTEND=noninteractive apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  DEBIAN_FRONTEND=noninteractive apt-get -qq -y install build-essential software-properties-common python-software-properties git curl

# install ruby2.1
RUN \
  add-apt-repository -y ppa:brightbox/ruby-ng && \
  DEBIAN_FRONTEND=noninteractive apt-get -qq update && \
  DEBIAN_FRONTEND=noninteractive apt-get -qq -y install ruby2.1 ruby2.1-dev && \
  gem install bundler --no-ri --no-rdoc 

# add application
WORKDIR /app

ADD ./whoami.rb /app/whoami.rb

# expose
EXPOSE 80

# run
CMD ["/usr/bin/ruby", "whoami.rb"]
