#
# Diamond with influxdb 0.8.8
#
# build:
#   docker build -t subicura/diamond .
#
# run:
#   docker run -d \
#     -v /proc:/chroot/proc:ro \
#     -v /sys:/chroot/sys:ro \
#     -v /dev:/chroot/dev:ro \
#     -v /run:/chroot/run:ro \
#     -e HOSTNAME=`hostname` \
#     -e INFLUXDB_HOSTNAME=192.168.81.111 \
#     subicura/diamond 
#

FROM ubuntu:14.04
MAINTAINER chungsub.kim@purpleworks.co.kr

ENV DEBIAN_FRONTEND noninteractive

# update ubuntu latest
RUN echo "2015.06.22"
RUN \
  apt-get -qq update && \
  apt-get -qq -y dist-upgrade

# Install base packages
RUN apt-get install -y git python python-support python-configobj python-pip build-essential python-dev make pbuilder python-mock cdbs

# Install diamond
RUN git clone https://github.com/BrightcoveOS/Diamond.git /opt/Diamond
WORKDIR /opt/Diamond
RUN make builddeb 
RUN dpkg -i build/diamond_4.*.deb

# Install dependency
RUN apt-get install -y libmysqlclient-dev
RUN pip install influxdb
RUN pip install MySQL-python

# Initialize chroot
RUN bash -c "mkdir -p /chroot/{root,tmp,opt}"
RUN bash -c "cp -r /{lib,lib64,bin,usr,etc,var} /chroot/"

# Add config
ADD diamond.conf /chroot/opt/diamond.conf

# Run command
ADD run.sh /opt/Diamond/run.sh
RUN chmod +x /opt/Diamond/run.sh

CMD /opt/Diamond/run.sh
