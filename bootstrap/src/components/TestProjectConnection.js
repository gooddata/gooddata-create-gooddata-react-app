import React from "react";
import { useAuth } from "../contexts/Auth";
import InlineLoading from "./InlineLoading";
import constants from "../constants";

export const TestProjectConnection = () => {
    const authState = useAuth();

    if (authState.isLoading) {
        return (
            <div>
                <InlineLoading /> Checking if user is logged in&hellip;
            </div>
        );
    }

    if (!authState.data) {
        return <div>Login to check if project {constants.projectId} is successfully connected</div>;
    }

    return <div>Data</div>;
};

export default TestProjectConnection;
