// (C) 2019 GoodData Corporation
import inquirer from "inquirer";

export const inquireName = () =>
    inquirer
        .prompt({
            message: "What is your application name?",
            name: "name",
            type: "input",
        })
        .then(value => value.name);

export const inquireDomain = () =>
    inquirer
        .prompt([
            {
                message: "What is your domain?",
                name: "domain",
                type: "list",
                choices: [
                    {
                        value: "secure.gooddata.com",
                    },
                    {
                        value: "developer.na.gooddata.com",
                    },
                    {
                        value: "salesengineering.na.gooddata.com",
                    },
                    {
                        name: "I have a custom domain",
                        value: "WHITE_LABELLED",
                    },
                ],
            },
            {
                message: "Insert your domain",
                name: "domain",
                type: "input",
                when: ({ domain }) => domain === "WHITE_LABELLED",
            },
        ])
        .then(value => value.domain);

export const CHOOSING_PROJECT_ID = "CHOOSING_PROJECT_ID";

export const inquireProjectId = () =>
    inquirer
        .prompt([
            {
                message: "Do you have a GoodData project ID ready?",
                name: "projectId",
                type: "list",
                choices: [
                    {
                        name: "I want to log in and choose from the projects available to me",
                        value: CHOOSING_PROJECT_ID,
                    },
                    {
                        name: "I have a project ID ready",
                        value: "PASTING_PROJECT_ID",
                    },
                    {
                        name: "I don't have any project ID",
                        value: "",
                    },
                ],
            },
            {
                message: "Enter projectId",
                name: "projectId",
                type: "input",
                when: ({ projectId }) => projectId === "PASTING_PROJECT_ID",
            },
        ])
        .then(value => value.projectId);

export const inquireUsernamePassword = () =>
    inquirer.prompt([
        { message: "Username", name: "username", type: "input" },
        { message: "Password", name: "password", type: "password" },
    ]);

export const inquireProjectChoice = projects =>
    inquirer
        .prompt({
            message: "Pick from available projects",
            name: "projectId",
            type: "list",
            choices: projects.map(project => ({
                name: project.title,
                value: project.identifier,
            })),
        })
        .then(value => value.projectId);
