@echo off
echo Initializing git repository...
cd /d "C:\Users\Mahak\CascadeProjects\portfolio"
git init
git add .
git commit -m "Initial commit: Portfolio website with photo"
git branch -M main
git remote add origin https://github.com/mhk-verma/portfolio.git
git push -u origin main
echo.
echo Repository initialized and pushed to GitHub!
echo.
echo Check your GitHub repository Actions tab to see the deployment workflow.
pause
