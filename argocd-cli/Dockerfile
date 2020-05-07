
FROM curlimages/curl as downloader

ARG ARGOCD_VERSION=v1.5.4
WORKDIR /tmp
RUN curl -L -O https://github.com/argoproj/argo-cd/releases/download/${ARGOCD_VERSION}/argocd-linux-amd64

FROM alpine

COPY --from=downloader /tmp/argocd-linux-amd64 /usr/bin/argocd
RUN chmod +x /usr/bin/argocd
