# haproxy-confd

Dockerfile to build the haproxy docker image

## etcd key/value

/services/web/{key} {ip:port}

**example**

```
etcdctl set /services/web/web_1 172.17.8.101:49153
```

## haproxy config template

- haproxy.cfg.http.rr.tmpl : http & round robin
- haproxy.cfg.http.consistent.tmpl : http & hash-type consistent

## build

docker build -t haproxy-confd .

## run

docker run -d -p 80:80 haproxy-confd

## log

docker logs -f [container id]
