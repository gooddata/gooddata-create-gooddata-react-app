// (C) 2020 GoodData Corporation
import bearFactory, { FixedLoginAndPasswordAuthProvider } from "@gooddata/sdk-backend-bear";

export const authProvider = new FixedLoginAndPasswordAuthProvider("", "");
const backend = bearFactory().withAuthentication(authProvider);

export default backend;
