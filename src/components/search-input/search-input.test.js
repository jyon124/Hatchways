import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import SearchInput from "./search-input";

describe("Search Input Component Tests", () => {
    it("Renders a Search Input component", async () => {
        expect.assertions(3);
        const mockType = "name";
        const mockInputFunction = jest.fn();
        const wrapper = mount(
            <SearchInput type={mockType} inputFunction={mockInputFunction} />
        );
        await waitFor(() => {
            expect(wrapper.props().type).toBe(mockType);
            expect(wrapper.props().inputFunction).toBe(mockInputFunction);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Test if inputFunction invokes when input has been entered", async () => {
        expect.assertions(1);
        const mockType = "name";
        const mockInputFunction = jest.fn();
        const wrapper = mount(
            <SearchInput type={mockType} inputFunction={mockInputFunction} />
        );
        const input = wrapper.find("input").at(0);
        input.instance().value = "Test";
        input.simulate("change");
        await waitFor(() => {
            expect(mockInputFunction).toHaveBeenCalled();
        });
    });
});
