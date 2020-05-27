# gooddata-create-gooddata-react-app

© 2019 GoodData Corporation

# GoodData Create React App

This is a CLI tool that creates a new React project with a proxy set up to connect to your projects on the GoodData platform.
The new app features some widgets and helpers that could come in handy.
The app is built on top of Create React App. For more info see [Create React App documentation](https://facebook.github.io/create-react-app/).

## How to use

To create a project called `my-app`, run this in your terminal:

```bash
npx @gooddata/create-gooddata-react-app my-app
```

Then follow the instructions provided by the CLI.

When navigating to your application using an IP address instead of localhost, you may run into `401` errors while trying to log in. This is due to proxying and cookie rewriting rules that the generated application uses to get around CORS. Use localhost instead of IP addresses to access the application because the development server rewrites GDC cookies to be for localhost.

_NOTE:_ We use `yarn` dependency manager. To install it, follow its [documentation](https://yarnpkg.com/lang/en/docs/install). If you don't want to use `yarn`, provide the `--no-install` flag like `npx @gooddata/create-gooddata-react-app my-app --no-install` . This will skip calling `yarn install` and you will have to manually install the dependencies of the created app. Please note that we do not provide `package-lock.json` so the application may not work properly when dependencies are installed using `npm`.

## CLI usage

`@gooddata/create-gooddata-react-app` supports several optional flags:

-   `-d, --domainUrl <domain>` URL of your GoodData domain
-   `-c, --config <config>` path to configuration file (see below)
-   `--no-install` skip yarn installing the app dependencies
-   `--verbose` output additional logs, useful mainly for debugging and bug reports
-   `-h, --help` output usage information
-   `--backend <backend>` switch backend to a desired one (default: bear)

### Configuration file

The configuration file has the following structure:

```json
{
    "domain": "(Required) domain where the project is hosted, e.g. https://developer.na.gooddata.com",
    "appName": "(Optional) name of the app to use"
}
```

## Prerequisites

Before running `@gooddata/create-gooddata-react-app`, please make sure that you have all compatible [technologies](https://sdk.gooddata.com/gooddata-ui/docs/about_gooddataui.html#supported-technologies) installed on your device.

## Troubleshooting

In case there are errors while running `@gooddata/create-gooddata-react-app`, please try these steps.

### Remove older versions

Sometimes having older versions of `@gooddata/create-gooddata-react-app` can cause errors. In that case please remove any previously installed versions by running

```bash
npm uninstall -g @gooddata/create-gooddata-react-app
yarn global remove @gooddata/create-gooddata-react-app
```

### Force npx to use the latest version

You can force `npx` to use latest version of the tool by running

```bash
npx --ignore-existing @gooddata/create-gooddata-react-app my-app
```

### Enable verbose output

You can increase the logging level of `@gooddata/create-gooddata-react-app my-app` by providing the `--verbose` flag like

```bash
npx @gooddata/create-gooddata-react-app my-app --verbose
```
