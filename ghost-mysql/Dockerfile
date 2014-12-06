# build command
# * default: docker build --force-rm=true -t subicura/ghost-mysql .
# * nocache: docker build --force-rm=true --no-cache=true -t subicura/ghost-mysql .

FROM dockerfile/nodejs

# Install Ghost
RUN \
  cd /tmp && \
  wget -q https://github.com/TryGhost/Ghost/releases/download/0.5.6/Ghost-0.5.6.zip && \
  unzip Ghost-*.zip -d /ghost && \
  rm -f Ghost-*.zip && \
  cd /ghost && \
  npm install --production && \
  useradd ghost --home /ghost

# Add files.
ADD start.bash /ghost-start

# Set environment variables.
ENV NODE_ENV production

# Define mountable directories.
VOLUME ["/data", "/ghost-override"]

# Define working directory.
WORKDIR /ghost

# Define default command.
CMD ["bash", "/ghost-start"]

# Expose ports.
EXPOSE 2368