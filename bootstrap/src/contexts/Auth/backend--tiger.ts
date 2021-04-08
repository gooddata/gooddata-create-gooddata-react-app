import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import tigerFactory, {
    ContextDeferredAuthProvider,
    redirectToTigerAuthentication,
    TigerTokenAuthProvider,
} from "@gooddata/sdk-backend-tiger";
import throttle from "lodash/throttle";

import { backend } from "../../constants";

const throttledHandler = throttle(redirectToTigerAuthentication, 500, { leading: false, trailing: true });

const createBackendForDevelopment = () => {
    if (!process.env.REACT_APP_SET_HOSTNAME && process.env.REACT_APP_DEV_TIGER_API_TOKEN) {
        console.info(
            "The application will use Tiger API Token for authentication and will use the proxy to send requests to the backend.",
        );

        return tigerFactory().withAuthentication(
            new TigerTokenAuthProvider(process.env.REACT_APP_DEV_TIGER_API_TOKEN),
        );
    }

    console.info(
        "The application will use Tiger OIDC authentication flow for authentication and will send requests directly to the backend. Please make sure your installation has correct CORS setup.",
    );

    return tigerFactory({ hostname: backend }).withAuthentication(
        new ContextDeferredAuthProvider(throttledHandler),
    );
};

const createBackendForProduction = () => {
    if (!process.env.REACT_APP_SET_HOSTNAME) {
        return tigerFactory().withAuthentication(new ContextDeferredAuthProvider(throttledHandler));
    }

    return tigerFactory({ hostname: backend }).withAuthentication(
        new ContextDeferredAuthProvider(throttledHandler),
    );
};

/**
 * Creates and configures an instance of Analytical Backend to use in the application. This can be a delicate
 * matter especially in development mode - considering that CORS and OIDC authentication MAY be needed. The
 * configuration is as follows:
 *
 * In production build:
 *
 * -  Backend is always set to use Tiger's OIDC authentication flow. As soon as a NotAuthenticated error
 *    is encountered, the app will redirect to page where the flow starts
 *
 * -  If the `REACT_APP_SET_HOSTNAME` env variable IS set, then Analytical Backend will be configured to
 *    talk with server running at location specified in constants.ts / backend property. This MAY lead to
 *    cross-origin requests if the application is served from different origin.
 *
 * -  If the `REACT_APP_SET_HOSTNAME` env variable IS NOT, then the Analytical Backend will assume it
 *    Tiger is running on the same origin.
 *
 * In development build:
 *
 * -  There is a proxy set up and running inside the webpack dev server. All `/api` endpoints are
 *    proxied to the Tiger instance running at location specified in constants.ts / backend property.
 *
 * -  If `REACT_APP_SET_HOSTNAME` env variable IS NOT set and the `REACT_APP_DEV_TIGER_API_TOKEN` env variable IS set,
 *    then the backend will be configured to use the local proxy and will use the token set in the
 *    `REACT_APP_DEV_TIGER_API_TOKEN` env variable.
 *
 *    ^^^ This is the setup of choice if your Tiger installation is not set up with HTTPS and CORS headers. Please
 *    consult documentation to learn how to obtain the authentication token.
 *
 * -  In all other cases, the Analytical Backend will be configured to communicate with Tiger servers running
 *    at location specified in constants.ts / backend property AND use the OIDC authentication flow.
 *
 * @return {IAnalyticalBackend}
 */
export const createBackend = () => {
    if (process.env.NODE_ENV !== "production") {
        return createBackendForDevelopment();
    }

    return createBackendForProduction();
};

/**
 * This is function does not need to be implemented for Tiger backend. Tiger uses OIDC authentication flow
 * and it will be a 3rd party solution asking for username and password. The backend constructed in `createBackend`
 * is already setup to redirect to where the authentication flow starts.
 */
export const backendWithCredentials = (backend: IAnalyticalBackend, _username: string, _password: string) => {
    return backend;
};
