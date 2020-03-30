import React from "react";

import Page from "../components/Page";
import { useProjectId } from "../contexts/ProjectId";

const Home = () => {
    const { projectId } = useProjectId();
    return (
        <Page>
            {/* In components replace hard-coded IDs with projectId={projectId} */}
            Place your content here&hellip;
        </Page>
    );
};

export default Home;
