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
