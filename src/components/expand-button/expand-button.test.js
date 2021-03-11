import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import ExpandButton from "./expand-button";

describe("Student Expand Button Component Tests", () => {
    it("Renders a Student Expand Button component", async () => {
        expect.assertions(3);
        const mockIsCollapsed = false;
        const mockHandleToggle = jest.fn();
        const wrapper = mount(
            <ExpandButton
                isCollapsed={mockIsCollapsed}
                handleToggle={mockHandleToggle}
            />
        );
        await waitFor(() => {
            expect(wrapper.props().isCollapsed).toBe(mockIsCollapsed);
            expect(wrapper.props().handleToggle).toBe(mockHandleToggle);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Test if Toggle function invokes when its clicked", async () => {
        const mockIsCollapsed = true;
        const mockHandleToggle = jest.fn();
        const wrapper = mount(
            <ExpandButton
                isCollapsed={mockIsCollapsed}
                handleToggle={mockHandleToggle}
            />
        );
        const expandBtn = wrapper.find("div").at(0);
        expandBtn.simulate("click");
        await waitFor(() => {
            expect(mockHandleToggle).toHaveBeenCalled();
        });
    });
});
