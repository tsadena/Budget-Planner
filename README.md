# Budget Planner

A simple budget planning software for managing income and expenses.


**-> Folder structure**

src/

├─ assets/            # Static files: images, icons, fonts

├─ components/        # Reusable UI components (buttons, cards, sidebar, navbar)

├─ context/           # React context for global state (auth, theme, user data)

├─ hooks/             # Custom React hooks (e.g., useAuth, useExpenses)

├─ pages/             # Full-page components/screens (Login, Dashboard, Expense Tracker, etc.)

├─ services/          # API calls and backend service functions

├─ styles/            # Global styles and CSS files

└─ utils/             # Utility/helper functions (formatting, calculations)

**Note: Empty folders have .gitkeep to be tracked in Git.**


**-> Branch Worflow**

We follow a feature-branch workflow:

1. dev branch:
   
All active development happens here.

Never push directly to main.

2. Feature branches:
   
Each new feature gets its own branch off dev, named like:

Example: feature-login-page, feature-dashboard, feature-expense-tracker

Work on the assigned branch, commit, and push regularly.

3. Pull Requests (PRs):
   
When a feature is ready, open a PR from your feature branch → dev.

After review, merge into dev.

4. Merging to main:
   
Only fully tested and approved code in dev gets merged into main.


**-> Naming Conventions**

Branches: feature-<feature-name>

Pages and components: PascalCase (Login.js, Dashboard.js, Sidebar.js)

Hooks: useCamelCase.js (useAuth.js)

Services: lowercase with camelCase (authService.js)

CSS files: match the component/page (Login.css, Sidebar.css)


**-> Coding and Git Workflow in VS Code**

1. Open the project in VS Code
   
Open VS Code → File > Open Folder → select your project folder.

2. Switch to your assigned branch
   
Open the integrated terminal in VS Code (Ctrl + ~ on Windows or Cmd + ~ on Mac).

Run: git fetch

git checkout feature-your-branch

git pull origin feature-your-branch

3. Start Coding
   
Add or edit files in the appropriate folders (pages/, components/, etc.).

Save your changes (Cmd + S / Ctrl + S).

4. Stage your changes
   
(In VS code terminal)Run: git add .

Or use the Source Control panel in VS Code → click the + icon next to changed files.

5. Commit your changes
    
(In VS code terminal) Run:git commit -m "Brief description of what you changed"

PS. Make sure the message clearly describes the changes 

6. Push your changes to GitHub
    
(In VS code terminal) Run; git push origin feature-your-branch

Your updates will now be available on GitHub for review or merge.


**-> Instructions to Run Locally**

1. Clone the repo (if you haven’t yet): git clone <repo-url>
                                        cd <repo-folder>

2. Switch to dev branch: git checkout dev
                         git pull origin dev

3. Install deoendencies: npm install

4. Start the development server: npm start

5. Working on your feature: git checkout feature-your-branch
                            # code, then
                            git add .
                            git commit -m "Your commit message"
                            git push origin feature-your-branch

**Note: Make sure to pull latest dev before starting a new feature branch to avoid conflicts.**


**-> Tips**

Always work on your feature branch, never directly on dev or main.

Commit frequently in small steps for easier tracking.

Use the VS Code Source Control panel if you prefer a GUI over terminal commands.
