import tigerFactory, { AnonymousAuthProvider } from "@gooddata/sdk-backend-tiger";
import { backend } from "../../constants";

const backendConfig = {};

if (process.env.REACT_APP_SET_HOSTNAME) {
    backendConfig.hostname = backend;
}


export const createBackend = () => {
    return tigerFactory(backendConfig);
};

export const backendWithCredentials = (backend, username, password) => {
    return backend.withAuthentication(new AnonymousAuthProvider());
};
