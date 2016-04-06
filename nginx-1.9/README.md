# nginx

nginx source build with alpine linux

## run

```
$ docker run -p 80:80 -v /data/nginx/sites:/usr/local/nginx/conf/sites -d subicura/nginx:1.9
```

## volume

- /usr/local/nginx/conf/certs
  - ssl cert file
- /usr/local/nginx/conf/conf.d/*.conf
  - additional nginx configuration
- /usr/local/nginx/conf/sites
  - http configuration
- /usr/local/nginx/conf/streams
  - stream configuration
