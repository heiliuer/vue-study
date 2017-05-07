@echo off

call npm install --registry=https://registry.npm.taobao.org  --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass

pause
::npm config set registry=https://registry.npm.taobao.org
