import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentTag from "./student-tag";

describe("Student Tag Component Tests", () => {
    it("Renders a Student Tag component", async () => {
        expect.assertions(4);
        const mockTag = "test";
        const mockRemoveTag = jest.fn();
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const wrapper = mount(
            <StudentTag
                tag={mockTag}
                removeTag={mockRemoveTag}
                student={mockStudent}
            />
        );
        await waitFor(() => {
            expect(wrapper.props().tag).toBe(mockTag);
            expect(wrapper.props().removeTag).toBe(mockRemoveTag);
            expect(wrapper.props().student).toBe(mockStudent);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Test if the tag is removed when its clicked", async () => {
        expect.assertions(1);
        const mockTag = "test";
        const mockRemoveTag = jest.fn();
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const wrapper = mount(
            <StudentTag
                tag={mockTag}
                removeTag={mockRemoveTag}
                student={mockStudent}
            />
        );
        const tag = wrapper.find("div").at(0);
        tag.simulate("click");
        await waitFor(() => {
            expect(mockRemoveTag).toHaveBeenCalled();
        });
    });
});
