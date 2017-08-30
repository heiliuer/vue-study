@echo off

call webpack


set /p PORT=<port.txt
cd server-src
echo running port %PORT% ...
node app.js %PORT%
