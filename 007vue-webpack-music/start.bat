@echo off

call webpack

cd server-src
set PORT=5369
echo running port %PORT% ...
node app.js %PORT%