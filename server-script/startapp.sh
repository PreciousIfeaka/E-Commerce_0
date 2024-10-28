#!/bin/bash

sudo cd /home/ubuntu/actions-runner/_work/E-Commerce_0/E-Commerce_0
sudo mkdir -p logs
sudo touch logs/output.log && sudo chmod 0777 logs/output.log
sudo /usr/bin/yarn start >> logs/output.log 2>&1