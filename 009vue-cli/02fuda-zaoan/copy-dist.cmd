@echo off
rmdir /s/q F:\Projects\my-githubs\fuda-zaoan\fuda-zaoan-android\app\src\main\assets\
robocopy dist\ F:\Projects\my-githubs\fuda-zaoan\fuda-zaoan-android\app\src\main\assets\ /s /e
ping 127.1 -n 3 >nul
exit

