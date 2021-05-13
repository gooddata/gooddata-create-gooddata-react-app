## GoodData.UI Accelerator Toolkit Application

This project was bootstrapped with [GoodData.UI Accelerator Toolkit](https://sdk.gooddata.com/gooddata-ui/docs/ht_create_your_first_visualization_toolkit.html).

-  To start the application on your workstation run the `npm run start` command.
-  To create a production build run the `npm run build` command.

This project uses the [Create React App](https://github.com/facebook/create-react-app) (CRA) scripts and infrastructure, you
can find the original documentation for CRA in [HOWTO.md](./HOWTO.md).

This application uses the GoodData.CN as a backend. Please note, that in the developer tools context, we refer to the GoodData.CN using the codename `tiger` (for example in the npm package names and variable names).

### Authentication and CORS

When building and deploying your application on top of GoodData.CN backend you will sooner or later run into a delicate
topic of [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS) combined
with Authentication.

The goal of this section is to help you arrive at correct application setup which can work with your GoodData.CN
installation.

**Note: Please see the [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
page to learn how to correctly set environment variables for the application.**

#### Production Deployment

Application is always set to use GoodData.CN's OIDC authentication flow. As soon as the application finds that the session
is not authenticated, the app will redirect to page where the flow starts.

-  If you host the application on the same origin as the GoodData.CN installation then you do not have to change the
   default configuration in any way.

-  If you host the application on a different origin than the GoodData.CN installation, then you must set the
   `REACT_APP_SET_HOSTNAME` env variable to `true`. This will ensure that wherever you deploy your application,
   it will always connect to server specified in [constants.ts](./src/constants.ts) `backend` property.

   **This requires correct CORS setup of your GoodData.CN installation**

#### Development on your workstation

Application may use GoodData.CN's OIDC authentication flow or use API token. The behavior in each setup is different:

*  In the OIDC authentication flow setup, the application will redirect to page where the flow starts as soon as it finds that the session is not authenticated.
*  In the API Token authentication setup, the application will be sending the token from the very first request. If the token is invalid the application
   will encounter 401 error that it does not know how to handle and will crash.

The choice of the authentication method depends on your GoodData.CN installation setup:

-  If your GoodData.CN installation is set up with CORS and allows the `https://localhost:3000` origin, then you can use the
   OIDC authentication flow even while  developing the application on your workstation. To do this, set the `REACT_APP_SET_HOSTNAME` env
   variable to `true`.

-  If your GoodData.CN installation does not allow cross origin requests, then you must use API token authentication method. To
   enable this make sure that the `REACT_APP_SET_HOSTNAME` is not set and that the `REACT_APP_DEV_TIGER_API_TOKEN` is
   set and contains a valid API Token.

   In this setup, the application will not communicate with the GoodData.CN backend directly. It will use a 'development proxy'
   running inside webpack dev server. Requests to all `/api` resources will be proxied to your GoodData.CN installation running at
   location specified in [constants.ts](./src/constants.ts) `backend` property.

   **IMPORTANT: If you have to go with the API token, make sure you specify the token in the `.env.development.local` file. This ensures
   that the value of your token will not leak into production build.**

### Getting started

Before you can create visualizations for data in your workspace, you need to export its Logical Data Model (LDM). You can
then use the exported LDM entities to define the visualizations.

The export is simple: run the `npm run refresh-md` command.

-  This script will use information from [constants.ts](./src/constants.ts). It will connect to GoodData servers running
   on the host specified in the `backend` property and [export](https://sdk.gooddata.com/gooddata-ui/docs/gdc_catalog_export.html) MD for the `workspace` of your choice.

-  The script will use GoodData.CN API Token for authentication. You need to set the `TIGER_API_TOKEN` env variable with the Token.

Once done, you will find that the [src/md/full.ts](src/md/full.ts) file will be populated with attribute and measure definitions
matching the MD defined in your workspace. You can then use these generated definitions as inputs to the different
[visualization components](https://sdk.gooddata.com/gooddata-ui/docs/start_with_visual_components.html) available in GoodData.UI SDK.

**Note: Before running this script, please make sure `backend` is defined in `constants.ts` file.**

### Deployment

To deploy the application, you can run

```bash
npm run build
```

which will create a `build` folder with all the build outputs that can you can then host anyway you want. Built like this, the application will assume that the GoodData Analytical Backend is hosted on the same host as the application itself.

In case you want to host the application on a host other than the one you use to host the GoodData Analytical Backend, you should build the application like this

```bash
npm run build-with-explicit-hostname
```

Built like this, the application will connect to the GoodData Analytical Backend hosted at the host specified in `src/constants.ts` in `backend` field.
