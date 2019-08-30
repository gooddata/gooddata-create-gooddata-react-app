import React from "react";
import { Link } from "react-router-dom";

import constants from "../constants";
import Page from "../components/Page";

import styles from "./Help.module.scss";

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

const Help = () => {
    return (
        <Page>
            <div className={styles.Lead}>
                <h1>
                    <img src={successUri} alt="" />
                    <br />
                    Congrats!
                    <br />
                    Your GoodData app was created.
                </h1>
            </div>

            <h2>Last step to do</h2>
            <p>
                Your new GoodData powered app is ready! However… :) As the last step, let’s create a test KPI
                widget to create your home dashboard and test that everything was set up correctly.
            </p>

            <h3>Create your home dashboard</h3>
            <p>To create your default landing page dashboard, remove the redirect to this help page.</p>
            <ol>
                <li>
                    Go to <Code>/src/routes/AppRouter.js</Code>
                </li>
                <li>
                    Find the line that says <Code>DELETE THIS LINE</Code>
                </li>
                <li>Delete that line</li>
            </ol>

            <h3>Test that everything was set up correctly</h3>
            <p>Confirm that the app is properly set up.</p>
            <ol>
                <li>
                    Ensure you are <Link to="/login">logged in</Link>.
                </li>
                <li>
                    Add a simple{" "}
                    <a href="https://sdk.gooddata.com/gooddata-ui/docs/kpi_component.html" {...linkProps}>
                        KPI
                    </a>{" "}
                    to <Code>src/routes/Home.js</Code>.<br />
                    <Pre
                        style={{
                            backgroundColor: "#242629",
                            color: "#E8EAEA",
                            padding: 10,
                        }}
                    >
                        {`import { Kpi } from '@gooddata/react-components';

<Kpi
    projectId="<project-id>"
    measure="<measure-identifier>"
/>`}
                    </Pre>
                    <Blockquote>
                        <img src={iUri} alt="(i)" className={styles.inlineImg} />
                        &emsp;The code above is the most basic KPI usage. For a more complex example, see{" "}
                        <a href="https://sdk.gooddata.com/gooddata-ui/docs/kpi_component.html" {...linkProps}>
                            KPI
                        </a>
                    </Blockquote>
                    <p>
                        Replace {`<project-id>`} with an id of your project.{" "}
                        <a
                            href="https://help.gooddata.com/doc/en/project-and-user-administration/administering-projects-and-project-objects/find-the-project-id"
                            {...linkProps}
                        >
                            Learn how to find your project id.
                        </a>
                    </p>
                    <p className={styles.imageFrame}>
                        <img src={findProjectIdUri} alt="Find your project id" />
                    </p>
                    <p>
                        Replace {`<measure-identifier>`} with an id of the measure of your choice.{" "}
                        <a
                            href={`${constants.backend}/gdc/md/${constants.projectId}/query/metrics`}
                            {...linkProps}
                        >
                            Find your measures here
                        </a>
                        , select a measure and then look for <Code>metric.meta.identifier</Code> on the
                        details page.
                    </p>
                    <p className={styles.imageFrame}>
                        <img src={greyPagesMetricsdUri} alt="Grey pages - metrics" />
                    </p>
                </li>
                <li>
                    <p>
                        Check your KPI on the <Link to="/">Home route</Link>.
                    </p>
                    <p className={styles.imageFrame}>
                        <img src={kpiUri} alt="KPI example" />
                    </p>
                    <p>
                        Value of your KPI is likely different. As long as you don't see Error, you are good to
                        go. If you do see an error, please contact{" "}
                        <a href="https://sdk.gooddata.com/gooddata-ui/docs/support_options.html">
                            GoodData.UI support
                        </a>
                        .
                    </p>
                </li>
                <li>Now you are ready to play around with your app.</li>
            </ol>

            <h2>You might want to try next</h2>
            <p>Here are few tips what you could start with when developing your own application.</p>

            <h3>Add page (route)</h3>
            <ol>
                <li>
                    Duplicate a route in <Code>/src/routes</Code>
                </li>
                <li>
                    Add a new route in <Code>/src/routes/AppRouter.js</Code>
                </li>
            </ol>

            <h3>Add a link to the Navigation / Menu</h3>
            <ol>
                <li>
                    Add a new <Code>{`<NavLink>`}</Code> component to <Code>/src/Header/Links.js</Code>
                </li>
            </ol>

            <h3>Add any example from Live Examples</h3>
            <ol>
                <li>
                    Go to <a href="https://gooddata-examples.herokuapp.com">Live Examples</a>, explore and try
                    out some code snippets.
                </li>
            </ol>
        </Page>
    );
};

export default Help;
