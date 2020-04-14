import React from "react";
import last from "lodash/last";

import InlineLoading from "../InlineLoading";
import { useProjectId } from "../../contexts/ProjectId";
import { useProjectList } from "../../contexts/ProjectList";

import styles from "./ProjectPicker.module.scss";

const getProjectId = project => project && last(project.links.self.split("/"));

const isInList = (projectId, projectList) => {
    return projectId && projectList && projectList.some(project => getProjectId(project) === projectId);
};

const projectOptions = projects =>
    projects.map(project => {
        const projectId = getProjectId(project);
        return (
            <option value={projectId} key={projectId}>
                {project.meta.title}
            </option>
        );
    });

const ProjectPicker = () => {
    const { projectId, setProjectId } = useProjectId();
    const projectList = useProjectList();

    if (projectList.isLoading) return <InlineLoading />;

    if (projectList.error) return <div>{"Error loading projects"}</div>;

    if (!projectList.data || !projectList.data.length) return <div>{"No projects available."}</div>;

    if (projectList.data.length === 1)
        return <div className={styles.OneProject}>{projectList.data[0].meta.title}</div>;

    return (
        <div className={styles.ProjectPickerContainer}>
            <select
                value={projectId}
                onChange={event => setProjectId(event.target.value)}
                className={styles.ProjectPicker}
            >
                {!isInList(projectId, projectList.data) && (
                    <option value={""} key={"0"}>
                        Please select...
                    </option>
                )}
                {projectOptions(projectList.data)}
            </select>
        </div>
    );
};

export default ProjectPicker;
