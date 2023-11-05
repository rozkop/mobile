import React from "react";
import renderer from "react-test-renderer";
import ProfileScreen from "../ProfileScreen";

describe("profile screen", () => {
    const component = renderer.create(<ProfileScreen />).toJSON();

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    })
});