FROM dockerfile/nodejs
MAINTAINER chungsub.kim@purpleworks.co.kr

# update ubuntu latest
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# install essential packages
RUN \
  apt-get -qq -y install build-essential software-properties-common python-software-properties git

RUN apt-get install -y \
    python2.7 python-pip \
    libfreetype6 libfontconfig

# install prerender
RUN cd / && git clone https://github.com/prerender/prerender
WORKDIR /prerender
RUN npm install

# run
EXPOSE 3000
CMD ["node", "server.js"]

