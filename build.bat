@echo off
echo Building for production...
cd /d "C:\Users\Mahak\CascadeProjects\portfolio"
call npm run build
echo.
echo Build completed successfully!
echo.
echo The built files are in the dist folder.
pause
