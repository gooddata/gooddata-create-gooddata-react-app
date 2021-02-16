## GoodData.UI Accelerator Toolkit Application

This project was bootstrapped with [GoodData.UI Accelerator Toolkit](https://sdk.gooddata.com/gooddata-ui/docs/ht_create_your_first_visualization_toolkit.html).

-  To start the application on your workstation run the `npm run start` command. 
-  To create a production build run the `npm run build` command.

This project uses the [Create React App](https://github.com/facebook/create-react-app) (CRA) scripts and infrastructure, you 
can find the original documentation for CRA in [HOWTO.md](./HOTWO.md).

### Authentication and CORS

When building and deploying your application on top of Tiger backend you will sooner or later run into a delicate 
topic of [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS) combined
with Authentication.

The goal of this section is to help you arrive at correct application setup which can work with your Tiger
installation.

**Note: Please see the [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) 
page to learn how to correctly set environment variables for the application.**

#### Production Deployment

Application is always set to use Tiger's OIDC authentication flow. As soon as the application finds that the session
is not authenticated, the app will redirect to page where the flow starts.

-  If you host the application on the same origin as the Tiger installation then you do not have to change the 
   default configuration in any way.

-  If you host the application on a different origin than the Tiger installation, then you must set the 
   `REACT_APP_SET_HOSTNAME` env variable to `true`. This will ensure that wherever you deploy your application, 
   it will always connect to server specified in [constants.js](./src/constants.js) `backend` property.
   
   **This requires correct CORS setup of your Tiger installation**
   
#### Development on your workstation

Application may use Tiger's OIDC authentication flow or use API token. The behavior in each setup is different: 

*  In the OIDC authentication flow setup, the application will redirect to page where the flow starts as soon as it finds that the session is not authenticated. 
*  In the API Token authentication setup, the application will be sending the token from the very first request. If the token is invalid the application
   will encounter 401 error that it does not know how to handle and will crash.

The choice of the authentication method depends on your Tiger installation setup: 

-  If your Tiger installation is set up with CORS and allows the `https://localhost:3000` origin, then you can use the 
   OIDC authentication flow even while  developing the application on your workstation. To do this, set the `REACT_APP_SET_HOSTNAME` env 
   variable to `true`.

-  If your Tiger installation does not allow cross origin requests, then you must use API token authentication method. To
   enable this make sure that the `REACT_APP_SET_HOSTNAME` is not set and that the `REACT_APP_DEV_TIGER_API_TOKEN` is
   set and contains a valid API Token.

   In this setup, the application will not communicate with the Tiger backend directly. It will use a 'development proxy'
   running inside webpack dev server. Requests to all `/api` resources will be proxied to your Tiger installation running at 
   location specified in [constants.js](./src/constants.js) `backend` property.
   
   **IMPORTANT: If you have to go with the API token, make sure you specify the token in the `.env.development.local` file. This ensures
   that the value of your token will not leak into production build.**

### Getting started

Before you can create visualizations for data in your workspace, you need to export its Logical Data Model (LDM). You can 
then use the exported LDM entities to define the visualizations.

The export is simple: run the `npm run refresh-ldm` command.

-  This script will use information from [constants.js](./src/constants.js). It will connect to GoodData servers running 
   on the host specified in the `backend` property and [export](https://sdk.gooddata.com/gooddata-ui/docs/gdc_catalog_export.html) LDM for the `workspace` of your choice.

-  The script will use Tiger API Token for authentication. You need to set the `TIGER_API_TOKEN` env variable with the Token.

Once done, you will find that the [src/ldm/full.js](./src/ldm/full.js) file will be populated with attribute and measure definitions
matching the LDM defined in your workspace. You can then use these generated definitions as inputs to the different 
[visualization components](https://sdk.gooddata.com/gooddata-ui/docs/start_with_visual_components.html) available in GoodData.UI SDK.

**Note: Before running this script, please make sure `backend` is defined in `constants.js` file.**

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
