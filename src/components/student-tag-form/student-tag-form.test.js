import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentTagForm from "./student-tag-form";

describe("Student Tag Form Component Tests", () => {
    it("Renders a Student Tag Form component", async () => {
        expect.assertions(3);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const mockAddTag = jest.fn();
        const wrapper = mount(
            <StudentTagForm student={mockStudent} addTag={mockAddTag} />
        );
        await waitFor(() => {
            expect(wrapper.props().student).toBe(mockStudent);
            expect(wrapper.props().addTag).toBe(mockAddTag);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Test if Tag form works correctly", async () => {
        const mockAddTag = jest.fn();
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const wrapper = mount(
            <StudentTagForm student={mockStudent} addTag={mockAddTag} />
        );
        const newTagNameInput = wrapper.find("input").at(0);
        const submit = wrapper.find("input").at(1);
        newTagNameInput.instance().value = "Test";
        newTagNameInput.simulate("change");
        submit.simulate("submit");
        await waitFor(() => {
            expect(mockAddTag).toHaveBeenCalled();
        });
    });
    it("If invalid input has been received, raise an alert", async () => {
        expect.assertions(1);
        const mockAddTag = jest.fn();
        jest.spyOn(window, "alert").mockImplementation(() => {});
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const wrapper = mount(
            <StudentTagForm student={mockStudent} addTag={mockAddTag} />
        );
        const newTagNameInput = wrapper.find("input").at(0);
        const submit = wrapper.find("input").at(1);
        newTagNameInput.instance().value = "  ";
        newTagNameInput.simulate("change");
        submit.simulate("submit");
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });
});
