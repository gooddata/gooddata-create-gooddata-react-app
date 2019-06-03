import React from "react";

import Page from "../components/Page";
import LogoutForm from "../components/Auth/LogoutForm";

import pageStyles from "../components/Page.module.scss";
import { useAuth } from "../contexts/Auth";

function Logout() {
    const { logout } = useAuth();

    return (
        <Page className={pageStyles.Inverse} mainClassName={pageStyles.VerticalCenter}>
            <LogoutForm logout={logout} />
        </Page>
    );
}

export default Logout;
