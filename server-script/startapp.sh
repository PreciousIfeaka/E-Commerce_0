#!/bin/bash

cd ~/e-commerce

timestamp=$(date +"%Y-%m-%d")

pnpm start >> logs/dev${timestamp}.log 2>&1