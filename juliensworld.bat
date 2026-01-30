@echo off

:: navigating to host location
echo Accessing juliensworld.com folder path
cd C:\Documents and Settings\Owner\My Documents\mysite
echo.

:: log directory
echo "Current directory: %CD%"
echo.

echo Preparing to push web page updates to origin...
echo Initiating git push request...
echo Negotiating with host...
echo.

:: versioning user input
set /p commitMsg=Enter versioning data: 
set newline=^& echo.
echo.

:: log write message
echo Writing to blog with following update message: %newline%%newline%%commitMsg%%newline%%newline%WinXP%newline%Signed-off-by: Julien ^<jjalageas@gmail.com^>
echo.

:: write changes to versioning tool
git commit -am "%commitMsg%" -m "" -m "WinXP" -m "Signed-off-by: Julien <jjalageas@gmail.com>"
git push
echo.

echo juliensworld.com has received the latest updates.
pause

