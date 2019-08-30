import React from "react";

import "@gooddata/react-components/styles/css/main.css";
import { AuthProvider } from "./contexts/Auth";
import AppRouter from "./routes/AppRouter";

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
