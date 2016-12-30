@echo off

set /p PORT=<port.txt
set target="http://localhost:"%PORT%

set "chrome="
for /f "tokens=2,*" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Clients\StartMenuInternet\Google Chrome\shell\open\command" /ve 2^>nul') do set "chrome=%%~B"
if not defined chrome for /f "tokens=2,*" %%A in ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Clients\StartMenuInternet\Google Chrome\shell\open\command" /ve 2^>nul') do set "chrome=%%~B"
if not defined chrome goto no-chrome
if defined chrome goto start

:start
set chrome="%chrome%"
echo Success open chrome
::set chrome="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
::%chrome%  %target% --user-agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36 MicroMessenger/4.5.255"
%chrome%  --app=%target% 
goto end

:no-chrome
echo Google Chrome was not found.

:end
echo auto exiting...
ping 127.1 -n 3 >nul