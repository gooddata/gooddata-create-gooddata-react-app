const { createProxyMiddleware } = require("http-proxy-middleware");

require("@babel/register")({
    presets: ["@babel/preset-typescript", "@babel/preset-env"],
    plugins: ["add-module-exports"],
    extensions: [".ts", ".js"],
});

const constants = require("./constants.ts");

const domain = constants.backend;
module.exports = function (app) {
    app.use(
        "/gdc",
        createProxyMiddleware({
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            secure: false,
            target: domain,
            headers: {
                host: domain.replace(/^https:\/\//, ""),
                // This is essential for Tiger backends. To ensure 401 flies when not authenticated and using proxy
                "X-Requested-With": "XMLHttpRequest",
            },
            onProxyReq: function (proxyReq, _req, _res) {
                // changeOrigin: true does not work well for POST requests, so remove origin like this to be safe
                proxyReq.removeHeader("origin");
                proxyReq.setHeader("accept-encoding", "identity");
            },
        }),
    );
    app.use(
        "/*.html",
        createProxyMiddleware({
            changeOrigin: true,
            secure: false,
            target: domain,
        }),
    );
    app.use(
        "/packages/*.{js,css}",
        createProxyMiddleware({
            changeOrigin: true,
            secure: false,
            target: domain,
        }),
    );
};
