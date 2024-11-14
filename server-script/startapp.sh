#!/bin/bash

cd /home/e-commerce-be/e-commerce
mkdir -p logs

sudo chown -R e-commerce-be:e-commerce-be logs

timestamp=$(date +"%Y-%m-%d")
yarn start >> logs/dev${timestamp}.log 2>&1