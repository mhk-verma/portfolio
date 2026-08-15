@echo off
echo Pushing to GitHub...
cd /d "C:\Users\Mahak\CascadeProjects\portfolio"
git add .
git commit -m "Add portfolio website with photo and GitHub Actions workflow"
git push origin main
echo.
echo Pushed successfully!
echo.
echo Check your GitHub repository Actions tab to see the deployment workflow.
pause
