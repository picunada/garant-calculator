#!/bin/bash

BASEDIR=dirname "$0"
FULLPATH=cd "$BASEDIR"; pwd
cd $FULLPATH

DOCKERIMAGE=mt/garantcalculator.bestbg.online

NAME=garantcalculator.bestbg.online.d

docker kill $NAME 1> /dev/null 2> /dev/null
docker rm $NAME 1> /dev/null 2> /dev/null

docker run -d \
--net=mynet \
--restart=always \
--name $NAME \
--log-opt mode=non-blocking \
--log-opt max-size=50m \
$DOCKERIMAGE
