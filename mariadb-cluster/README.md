# haproxy-confd

Dockerfile to build the mariadb galera cluster docker image

## Usage

galera cluster는 최초실행시 CLUSTER_ADDRESS를 구성하지 않고 실행한다.
그 후에 붙는 서버는 CLUSTER_ADDRESS를 반드시 입력해야 하고 3개중에 2개 이상이 떠 있을 경우에는 그대로 실행해도 되지만
1개만 떠 있으면 처음부터 다시 실행해야 한다.
