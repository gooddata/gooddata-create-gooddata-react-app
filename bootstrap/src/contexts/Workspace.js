import React, { createContext, useState, useContext, useEffect } from "react";
import { useQueryState } from "react-router-use-location-state";
import { WorkspaceProvider as DefaultWorkspaceProvider } from "@gooddata/sdk-ui";
import { workspace as constWorkspace } from "../constants";
import { useWorkspaceList } from "../contexts/WorkspaceList";

const WorkspaceContext = createContext({
    workspace: constWorkspace,
    setWorkspace: () => {},
});

export const WorkspaceProvider = ({ children }) => {
    const workspaceList = useWorkspaceList();
    const [queryWorkspace, setQueryWorkspace] = useQueryState("workspace", constWorkspace);
    const [workspace, setWorkspace] = useState(queryWorkspace);

    // update query string with actual workspace
    useEffect(() => {
        setQueryWorkspace(workspace);
        // Do not include setQueryWorkspace into effect dependecies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspace, queryWorkspace]);

    // if workspace was not set yet then try to use first workspace available
    useEffect(() => {
        if (!workspace && workspaceList.firstWorkspace) setWorkspace(workspaceList.firstWorkspace);
    }, [workspace, workspaceList]);

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            <DefaultWorkspaceProvider workspace={workspace}>{children}</DefaultWorkspaceProvider>
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);
