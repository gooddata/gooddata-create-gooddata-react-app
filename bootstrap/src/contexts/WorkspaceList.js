import React, { createContext, useState, useContext, useEffect } from "react";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";

import { defaultSourceState } from "../utils";
import { useBackend } from "../contexts/Auth";
import { useAuth } from "../contexts/Auth";
import { AuthStatus } from "../contexts/Auth/state";
import { workspaceFilter } from "../constants";

const WorkspaceListContext = createContext({
    ...defaultSourceState,
    firstWorkspace: null,
});

const filterWorkspaces = (workspaces, filter) => {
    return !filter ? workspaces : workspaces.filter(workspace => workspace.meta.title.match(filter));
};

const getFirstWorkspace = workspaces => {
    return workspaces.length && last(workspaces[0].id.split("/"));
};

export const WorkspaceListProvider = ({ children }) => {
    const { authStatus } = useAuth();
    const backend = useBackend();
    const [workspaceListState, setWorkspaceListState] = useState({ ...defaultSourceState });
    const [firstWorkspace, setFirstWorkspace] = useState(null);

    useEffect(() => {
        const getWorkspaces = async () => {
            setWorkspaceListState({ isLoading: true });

            try {
                const workspaces = [];
                let page = await backend
                    .workspaces()
                    .forCurrentUser()
                    .query();

                while (!isEmpty(page.items)) {
                    const allDescriptors = await Promise.all(page.items.map(workspace => workspace.getDescriptor()));

                    workspaces.push(...allDescriptors);
                    page = await page.next();
                }

                const filteredWorkspaces = filterWorkspaces(workspaces, workspaceFilter);
                setWorkspaceListState({
                    isLoading: false,
                    data: filteredWorkspaces,
                });
                setFirstWorkspace(getFirstWorkspace(filteredWorkspaces));
            } catch (error) {
                setWorkspaceListState({ isLoading: false, error });
            }
        };

        setWorkspaceListState({ isLoading: false });

        if (authStatus === AuthStatus.AUTHORIZED) {
            getWorkspaces();
        }
    }, [authStatus, backend]);

    return (
        <WorkspaceListContext.Provider value={{ ...workspaceListState, firstWorkspace }}>
            {children}
        </WorkspaceListContext.Provider>
    );
};

export const useWorkspaceList = () => useContext(WorkspaceListContext);
