#!/bin/bash

cd /home/ubuntu/actions-runner/_work/E-Commerce_0/E-Commerce_0
mkdir -p logs
/usr/bin/yarn start >> logs/output.log 2>&1