// The name of the application. It is rendered in a header of the web application.
export const appName = "My App";

// The URL of analytical GoodData backend with workspaces, insights, metrics, attributes, datasets, and users
// that will be available to the application.
export const backend = "https://developer.na.gooddata.com";

// The ID of workspace that is selected by default in the optional workspace picker component (located in the web
// application header). It is also a default setting for script that refreshes LDM data used by the application.
// LDM script shows list of available workspaces on backend in the case when the value is not set to any ID.
export const workspace = "";

// RegExp used by optional workspace picker component (located in the web application header) to filter out
// workspaces that should not be rendered to the application user. Only the workspaces with title that match
// the regular expression will be rendered. Set to 'undefined' to show all the available workspaces.
// Example: /test/ or /^GoodData/
export const workspaceFilter: RegExp | undefined = undefined;
