import React from "react";

import "@gooddata/react-components/styles/css/main.css";
import { BackendProvider } from "@gooddata/sdk-ui";
import AppRouter from "./routes/AppRouter";
import { useAuth } from "./contexts/Auth";
import { ProjectListProvider } from "./contexts/ProjectList";

function App() {
    const { backend } = useAuth();

    return (
        <BackendProvider backend={backend}>
            <ProjectListProvider>
                <AppRouter />
            </ProjectListProvider>
        </BackendProvider>
    );
}

export default App;
