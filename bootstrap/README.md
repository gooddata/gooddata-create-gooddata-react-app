This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run refresh-ldm`

**Note: Before running this script, please make sure `backend` is defined in `constants.js` file.**

Generates and refreshes data pulled from the `backend` and `projectId/workspace` defined in `constants.js` file. If `projectId/workspace` is not defined, the script will prompt you to choose one of the workspaces available in the `backend`. To avoid constantly typing in credentials, you can create `.gdcatalogrc` file where you define your `username` and `password`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

There are two ways to deploy your application.

1. If your domain does not have CORS set up and you want to get up and running fast, you can use the pre-configured Docker image included with the app.
2. If the Docker way is not suitable for you, you can build and deploy the app manually (keep in mind that you will have to setup CORS on your GoodData domain so that it allows access from your application).

#### Using the built-in Docker support

The application comes with a simple Dockerfile. This image is a pre-configured nginx instance that both serves the application files and acts as a reverse proxy for your GoodData domain. In this deployment, your GoodData domain does not need any CORS setup because the application will only communicate with its origin server.
To use it, run these commands in your terminal:

```bash
# build production version of your application
npm run build
# build the docker image
docker build -t your-tag .
# run the docker image
docker run \
    --publish 3000:8080 \
    --name your-name \
    --env BACKEND_HOST="secure.gooddata.com" \
    --env BACKEND_URL="https://secure.gooddata.com" \
    your-tag:latest
```

The meaning of the `docker run` parameters is:

-   `--publish 3000:8080` – expose the nginx running on port 8080 by default (you can change that if needed by adding `--env PORT=5000`, just make sure you update the `--publish` value accordingly), to port 3000 on your machine.
-   `--name your-name` – assign a name to the container run.
-   `--env BACKEND_HOST="secure.gooddata.com"` and `--env BACKEND_URL="https://secure.gooddata.com"` – set the host/URL where the GoodData analytical backend is running respectively. You need to change these values if you host GoodData on a different domain.

#### Building and deploying manually

To deploy the application without the use of the provided Dockerfile, you can run

```bash
npm run build
```

which will create a `build` folder with all the build outputs that can you can then host anyway you want. Built like this, the application will assume that the GoodData Analytical Backend is hosted on the same host as the application itself.

In case you want to host the application on a host other than the one you use to host the GoodData Analytical Backend, you should build the application like this

```bash
npm run build-with-explicit-hostname
```

Built like this, the application will connect to the GoodData Analytical Backend hosted at the host specified in `src/constants.js` in `backend` field.

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
