import React, { createContext, useState, useContext, useEffect } from "react";
import last from "lodash/last";

import { defaultSourceState } from "../utils";
import sdk from "../sdk";
import { useAuth } from "../contexts/Auth";
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
    const authState = useAuth();
    const [projectListState, setProjectListState] = useState({ ...defaultSourceState });
    const [firstProjectId, setFirstProjectId] = useState(null);

    useEffect(() => {
        const getProjects = async userId => {
            setProjectListState({ isLoading: true });
            try {
                const currentProjects = await sdk.project.getProjects(userId);
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
        if (!authState.isLoading && authState.data) getProjects(authState.data.loginMD5);
    }, [authState.isLoading, authState.data]);

    return (
        <ProjectListContext.Provider value={{ ...projectListState, firstProjectId }}>
            {children}
        </ProjectListContext.Provider>
    );
};

export const useProjectList = () => useContext(ProjectListContext);
