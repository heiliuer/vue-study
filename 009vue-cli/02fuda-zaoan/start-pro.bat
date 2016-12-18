@echo off
::call npm run build
cd dist
set port=8081
python -m http.server %port%
ipStart %port%
