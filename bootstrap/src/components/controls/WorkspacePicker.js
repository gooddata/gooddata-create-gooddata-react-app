import React from "react";
import last from "lodash/last";

import InlineLoading from "../InlineLoading";
import { useWorkspace } from "../../contexts/Workspace";
import { useWorkspaceList } from "../../contexts/WorkspaceList";

import styles from "./WorkspacePicker.module.scss";

const getWorkspace = workspace => workspace && last(workspace.id.split("/"));

const isInList = (workspace, workspaceList) => {
    return (
        workspace && workspaceList && workspaceList.some(workspace => getWorkspace(workspace) === workspace)
    );
};

const workspaceOptions = workspaces =>
    workspaces.map(workspace => {
        const constWorkspace = getWorkspace(workspace);
        return (
            <option value={constWorkspace} key={constWorkspace}>
                {workspace.title}
            </option>
        );
    });

const WorkspacePicker = () => {
    const { workspace, setWorkspace } = useWorkspace();
    const workspaceList = useWorkspaceList();

    if (workspaceList.isLoading) return <InlineLoading />;

    if (workspaceList.error) return <div>{"Error loading workspaces"}</div>;

    if (!workspaceList.data || !workspaceList.data.length) return <div>{"No workspaces available."}</div>;

    if (workspaceList.data.length === 1)
        return <div className={styles.OneWorkspace}>{workspaceList.data[0].title}</div>;

    return (
        <div className={styles.WorkspacePickerContainer}>
            <select
                value={workspace}
                onChange={event => setWorkspace(event.target.value)}
                className={styles.WorkspacePicker}
            >
                {!isInList(workspace, workspaceList.data) && (
                    <option value={""} key={"0"}>
                        Please select...
                    </option>
                )}
                {workspaceOptions(workspaceList.data)}
            </select>
        </div>
    );
};

export default WorkspacePicker;
