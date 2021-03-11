import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import App from "./App";

describe("App Tests", () => {
    it("Renders a App component", async () => {
        expect.assertions(1);
        const wrapper = mount(<App />);
        await waitFor(() => {
            expect(wrapper.containsMatchingElement(<App />)).toEqual(true);
        });
    });
});
