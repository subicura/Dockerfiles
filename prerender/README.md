# docker-prerender

Dockerfile to build the prerender container image

https://github.com/prerender/prerender

# build

docker build -t prerender .

# run

docker run -d -p 9000:3000 prerender

# run with env

docker run -d -p 9000:3000 -e RESOURCE_DOWNLOAD_TIMEOUT=8000 prerender

# log

docker logs -f [container id]

# test

http://[server ip]:9000/http://google.com
