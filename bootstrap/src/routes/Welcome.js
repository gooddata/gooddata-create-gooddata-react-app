import React from "react";
import { Link } from "react-router-dom";

import constants from "../constants";
import Page from "../components/Page";

import styles from "./Welcome.module.scss";

import findProjectIdUri from "../media/find-project-id.png";
import greyPagesMetricsdUri from "../media/grey-pages-metrics.png";
import kpiUri from "../media/kpi.png";
import iUri from "../media/i.svg";
import successUri from "../media/success.svg";

const linkProps = {
    target: "_blank",
    rel: "noopenner noreferrer",
};

const Code = ({ children, ...restProps }) => (
    <code className={styles.code} {...restProps}>
        {children}
    </code>
);
const Pre = ({ children, ...restProps }) => (
    <pre className={styles.pre} {...restProps}>
        {children}
    </pre>
);
const Blockquote = ({ children, ...restProps }) => (
    <blockquote className={styles.blockquote} {...restProps}>
        {children}
    </blockquote>
);

const Welcome = () => {
    return (
        <Page>
            <div className={styles.Lead}>
                <h1>
                    <img src={successUri} alt="" />
                    <br />
                    Congratulations!
                    <br />
                    Your GoodData-powered app is created.
                </h1>
            </div>

            <h2>Your new GoodData-powered app is ready!</h2>
            <p>
                Now, let’s take one more step and set up your home dashboard with a test headline report widget. This will
                help verify that everything is set up correctly.
            </p>

            <ol>
                <li>
                    In <Code>/src/routes/AppRouter.js</Code>, find the line that says{" "}
                    <Code>DELETE THIS LINE</Code>, and delete it.
                    <br />
                    This removes the redirect to this help page and sets up the default landing page dashboard
                    for your app.
                </li>
                <li>
                    Log in to your app at <Link to="/login">/login</Link>.
                </li>
                <li>
                    Go to https://secure.gooddata.com/labs/apps/, and click <b>UI Developer Toolkit</b> ->
                    <b>Visualization Builder</b>.<br />
                    The widget for creating visualizations opens.
                </li>
                <li>
                    From the visualization type toolbar, select the headline visualization.
                </li>
                <li>
                    Select the primary measure from the dropdown list.
                    <br />
                    The headline report is calculated and displayed.
                </li>
                <li>
                    Click <b>Copy code</b> and paste the copied code into your <Code>Home.js</Code>,
                    to the line reading `Place your content here`.
                </li>
                <li>
                    <p>
                        In <Code>src/constants.js</Code>:
                    </p>
                    <ol className={styles.subList}>
                        <li>
                            <p>
                                Check that <Code>backend</Code> is set to your domain URI.
                            </p>
                            For example, <Code>https://secure.gooddata.com</Code> or{" "}
                            <Code>https://developer.na.gooddata.com</Code>.
                        </li>
                        <li>
                            <p>
                                Set <Code>projectId</Code> to your project ID.
                            </p>
                            <Blockquote>
                                <img src={iUri} alt="(i)" className={styles.inlineImg} />
                                &emsp;
                                <a
                                    href="https://help.gooddata.com/doc/en/project-and-user-administration/administering-projects-and-project-objects/find-the-project-id"
                                    {...linkProps}
                                >
                                    Learn how to find your project ID.
                                </a>
                            </Blockquote>
                        </li>
                    </ol>
                    <p className={styles.imageFrame}>
                        <img src={findProjectIdUri} alt="Finding the project ID" />
                    </p>
                </li>
                <li>
                    <p>
                        Check the headline report on the <Link to="/">Home route</Link>.
                    </p>
                    <p className={styles.imageFrame}>
                        <img src={kpiUri} alt="KPI example" />
                    </p>
                    <p>
                        Most likely, the value of your headline report would be different. As long as you do not see an error,
                        you are good to go. If you do see an error, please use one of the {" "}
                        <a href="https://sdk.gooddata.com/gooddata-ui/docs/support_options.html">
                            GoodData.UI support options
                        </a>
                        .
                    </p>
                </li>
            </ol>
            <p>Now, you are ready to play around with your app.</p>

            <h2>Things to try next</h2>

            <h3>Add a page (route)</h3>
            <ol>
                <li>
                    Duplicate a route in <Code>/src/routes</Code>.
                </li>
                <li>
                    Add the new route to <Code>/src/routes/AppRouter.js</Code>.
                </li>
            </ol>

            <h3>Add a link to the navigation / menu</h3>
            <p>
                Add a new <Code>{`<NavLink>`}</Code> component to <Code>/src/components/Header/Links.js</Code>.
            </p>

            <h3>Add an example from the Live Examples</h3>
            <p>
                Explore the <a href="https://gooddata-examples.herokuapp.com">Live Examples</a> and try out
                some code snippets.
            </p>

            <h3>
                Deploy your app to <a href="https://www.heroku.com/">Heroku</a>
            </h3>
            <ol>
                <li>
                    <p>
                        Create a new Heroku app with the{" "}
                        <a href="https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack">
                            create-react-app buildpack
                        </a>{" "}
                        (<Code>mars/create-react-app</Code>).
                    </p>
                    <Pre>{`heroku create $APP_NAME --buildpack mars/create-react-app`}</Pre>
                </li>
                <li>
                    <p>Commit your changes.</p>
                    <Pre>{`git add .
git commit -m "Setup Heroku deployment"`}</Pre>
                </li>
                <li>
                    Send a request to {" "}
                    <a href="https://support.gooddata.com/">GoodData Support</a>{" "}
                    to allow cross-domain requests for your domains.
                    <br />
                    In the request, include the domain of your app (for example, <Code>gooddata-examples.herokuapp.com</Code>)
                    <br />
                    and the target GoodData domain (for example, <Code>developer.na.gooddata.com</Code>).
                    <br />
                    <b>NOTE:</b> If cross-domain requests are not allowed, you will not be able to log in
                    <br />
                    and will see a cross-domain error message.
                </li>
                <li>
                    <p>Trigger deployment, and open your app in a browser.</p>
                    <Pre>{`git push heroku master
heroku open`}</Pre>
                </li>
            </ol>

            <h3>Get familiar with Catalog Browser and Visualization Builder</h3>
                <p>
                    Go to the{" "}
                    <a href={`${constants.backend}/labs/apps/ui-developer-toolkit/build/index.html`}>Accelerator Toolkit</a>.
                </p>
                <p>Catalog Browser allows you to search for and review various objects
                (attributes, attribute displayForms, measures, and date datasets) in your project.</p>
                <p>Visualization Builder allows you to build a visualization in a few clicks and copy its code to use it in your application.</p>
        </Page>
    );
};

export default Welcome;
