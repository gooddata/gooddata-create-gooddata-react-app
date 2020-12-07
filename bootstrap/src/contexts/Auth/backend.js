import bearFactory, {
    FixedLoginAndPasswordAuthProvider,
    ContextDeferredAuthProvider,
} from "@gooddata/sdk-backend-bear";
import { backend } from "../../constants";

const backendConfig = {};

if (process.env.REACT_APP_SET_HOSTNAME) {
    backendConfig.hostname = backend;
}

export const createBackend = () => {
    return bearFactory(backendConfig).withAuthentication(new ContextDeferredAuthProvider());
};

export const backendWithCredentials = (backend, username, password) => {
    return backend.withAuthentication(new FixedLoginAndPasswordAuthProvider(username, password));
};
