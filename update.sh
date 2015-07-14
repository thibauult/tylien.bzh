#!/bin/sh

git pull
npm install
bower install
pm2 restart COMPTAPP