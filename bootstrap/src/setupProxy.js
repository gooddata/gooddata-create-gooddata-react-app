const proxy = require("http-proxy-middleware");

require("@babel/register")({
    presets: ["@babel/preset-typescript", "@babel/preset-env"],
    plugins: ["add-module-exports"],
    extensions: [".ts", ".js"],
});

const constants = require("./constants.ts");

const domain = constants.backend;
module.exports = function (app) {
    app.use(
        proxy("/gdc", {
            changeOrigin: true,
            cookieDomainRewrite: "localhost",
            secure: false,
            target: domain,
            headers: {
                host: domain.replace(/https:\/\//, ""),
                origin: null,
                // This is essential for Tiger backends. To ensure 401 flies when not authenticated and using proxy
                "X-Requested-With": "XMLHttpRequest",
            },
            onProxyReq: function (proxyReq, _req, _res) {
                proxyReq.setHeader("accept-encoding", "identity");
            },
        }),
    );
    app.use(
        proxy("/*.html", {
            changeOrigin: true,
            secure: false,
            target: domain,
        }),
    );
    app.use(
        proxy("/packages/*.{js,css}", {
            changeOrigin: true,
            secure: false,
            target: domain,
        }),
    );
};
