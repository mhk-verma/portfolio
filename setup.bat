@echo off
echo Installing dependencies...
cd /d "C:\Users\Mahak\CascadeProjects\portfolio"
call npm install --legacy-peer-deps
echo.
echo Dependencies installed successfully!
echo.
echo To start the development server, run: npm run dev
echo To build for production, run: npm run build
pause
