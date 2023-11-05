import React from "react";
import renderer from "react-test-renderer";
import HomeScreen from "../HomeScreen";

describe("home screen", () => {
    const component = renderer.create(<HomeScreen />).toJSON();

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    })
});