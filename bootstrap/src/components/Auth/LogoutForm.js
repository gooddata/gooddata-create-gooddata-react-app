import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import CustomLoading from "../CustomLoading";

const LogoutForm = ({ history, logout }) => {
    useEffect(() => {
        logout().then(() => history.push("/login"));
    });

    return <CustomLoading label="Logging you out..." />;
};

export default withRouter(LogoutForm);
