#!/bin/bash

cd /home/e-commerce-be/e-commerce
mkdir -p logs
timestamp=$(date +"%Y-%m-%d")

yarn start >> logs/dev${timestamp}.log 2>&1