#! /usr/bin/env sh
#

cd /app
rm -rf dist
yarn build
exec yarn start
