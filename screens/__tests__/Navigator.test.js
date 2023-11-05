import React from "react";
import renderer, { act } from "react-test-renderer";
import Navigator from "../Navigator";

describe("navigator", () => {  
    const component = renderer.create(<Navigator />).toJSON(); 
    
    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    })
});