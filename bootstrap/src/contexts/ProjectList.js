import React, { createContext, useState, useContext, useEffect } from "react";
import last from "lodash/last";

import { defaultSourceState } from "../utils";
import sdk from "@gooddata/gd-bear-client";
import { useAuth } from "../contexts/Auth";
import { AuthStatus } from "../contexts/Auth/state";
import { projectFilter } from "../constants";

const ProjectListContext = createContext({
    ...defaultSourceState,
    firstProjectId: null,
});

const filterProjects = (projects, filter) => {
    return !filter ? projects : projects.filter(project => project.meta.title.match(filter));
};

const getFirstProject = projects => {
    return projects.length && last(projects[0].links.self.split("/"));
};

export const ProjectListProvider = ({ children }) => {
    const { authStatus } = useAuth();
    const [projectListState, setProjectListState] = useState({ ...defaultSourceState });
    const [firstProjectId, setFirstProjectId] = useState(null);

    useEffect(() => {
        const getProjects = async userInfo => {
            setProjectListState({ isLoading: true });
            try {
                const currentProjects = await sdk.project.getProjects((await userInfo).loginMD5);
                const filteredProjects = filterProjects(currentProjects, projectFilter);
                setProjectListState({
                    isLoading: false,
                    data: filteredProjects,
                });
                setFirstProjectId(getFirstProject(filteredProjects));
            } catch (error) {
                setProjectListState({ isLoading: false, error });
            }
        };

        setProjectListState({ isLoading: false });
        if (authStatus === AuthStatus.AUTHORIZED) getProjects(sdk.user.getAccountInfo());
    }, [authStatus]);

    return (
        <ProjectListContext.Provider value={{ ...projectListState, firstProjectId }}>
            {children}
        </ProjectListContext.Provider>
    );
};

export const useProjectList = () => useContext(ProjectListContext);
