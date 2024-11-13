#!/bin/bash

cd /home/e-commerce-be/e-commerce
sudo mkdir -p logs
timestamp=$(date +"%Y-%m-%d")

sudo touch logs/dev${timestamp}.log
pnpm start >> logs/dev${timestamp}.log 2>&1