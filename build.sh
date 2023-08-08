#!/bin/bash

BASEDIR=dirname "$0"
FULLPATH=cd "$BASEDIR"; pwd
cd $FULLPATH

#git pull.
docker build --pull --tag=mt/garantcalculator.bestbg.online .
