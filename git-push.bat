@echo off
echo Pushing to GitHub...
cd /d "C:\Users\Mahak\CascadeProjects\portfolio"
git add .
git commit -m "Update hero photo"
git push origin main
echo.
echo Pushed successfully!
echo.
echo Your site will be live at: https://mhk-verma.github.io/portfolio/
pause
