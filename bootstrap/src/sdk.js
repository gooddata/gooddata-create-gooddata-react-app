import { factory as createSdk } from "@gooddata/gooddata-js";
import { backend } from "./constants";

// IMPORTANT
// Only set domain in production, so that requests from localhosts are handled by development proxy. See setupProxy.js
// Cross-domain requests need to be allowed for specific domains by GoodData. You can request cross-domain exceptions at support@gooddata.com
const domain = process.env.NODE_ENV === "production" ? backend : null;
const sdk = createSdk({
    domain,
    // If you set origin package, GoodData will be able to find
    // and possibly troubleshoot your requests in the logs.
    // originPackage: {
    //     name: "my-application-package",
    //     version: "1.0.0"
    // }
});

export default sdk;
