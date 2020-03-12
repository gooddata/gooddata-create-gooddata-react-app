import React, { createContext, useState, useContext, useEffect } from "react";
import { useQueryState } from "react-router-use-location-state";

import { projectId as constProjectId } from "../constants";
import { useProjectList } from "../contexts/ProjectList";

const ProjectIdContext = createContext({
    projectId: constProjectId,
    setProjectId: () => {},
});

export const ProjectIdProvider = ({ children }) => {
    const projectList = useProjectList();
    const [queryProjectId, setQueryProjectId] = useQueryState("projectId", constProjectId);
    const [projectId, setProjectId] = useState(queryProjectId);

    // update query string with actual projectId
    useEffect(() => {
        setQueryProjectId(projectId);
        // Do not include setQueryProjectId into effect dependecies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId, queryProjectId]);

    // if projectId was not set yet then try to use user's last opened project
    useEffect(() => {
        if (!projectId && projectList.firstProjectId) setProjectId(projectList.firstProjectId);
    }, [projectId, projectList]);

    return (
        <ProjectIdContext.Provider value={{ projectId, setProjectId }}>{children}</ProjectIdContext.Provider>
    );
};

export const useProjectId = () => useContext(ProjectIdContext);
