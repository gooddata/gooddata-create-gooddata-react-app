import React from "react";
import { shallow } from "enzyme";

import Logo from "../Logo";
import constants from "../../../constants";

describe("Logo component", () => {
    it("should render correctly app name", () => {
        const wrapper = shallow(<Logo />);
        expect(wrapper.children().text()).toEqual(constants.appName);
    });
});
