# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## GitHub Contributions Integration

This site can display an accurate GitHub-style contributions heatmap using the GitHub GraphQL API without exposing tokens in the browser. It works by generating a `public/contributions.json` file in CI and having the client load that file.

- Client: `src/components/ContributionHeatmap.tsx` now prefers `public/contributions.json` and falls back to a lightweight REST-based estimate if missing.
- Generator: `scripts/fetch-contributions.mjs` fetches the last 365 days via GitHub GraphQL and writes `public/contributions.json`.
- Automation: `.github/workflows/update-contributions.yml` runs nightly and on demand to refresh the JSON and commit it.

Setup steps:

1. Create a GitHub fine-grained Personal Access Token (classic also works) and store it as a repository secret named `GH_CONTRIBUTIONS_TOKEN`.
   - Minimum: no explicit scopes required for public data; to include private contribution counts, ensure your GitHub profile is set to “Include private contributions on my profile”. A personal token from your account is sufficient.
2. Optionally set a repo variable `GITHUB_USERNAME` (defaults to `darraghmahns`).
3. Trigger the workflow via “Run workflow” in Actions, or wait for the nightly run. This will create/update `public/contributions.json`.
4. Deploy as usual; the client will fetch `/contributions.json` at runtime.

Local development notes:

- You can manually run the generator with: `GITHUB_API_TOKEN=... GITHUB_USERNAME=... node scripts/fetch-contributions.mjs`
- Optionally set `REACT_APP_GITHUB_USERNAME` in a local `.env` for the client default profile link.

To learn React, check out the [React documentation](https://reactjs.org/).
