import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentName from "./student-name";

describe("Student Name Component Tests", () => {
    it("Renders a Student Name component", async () => {
        expect.assertions(2);
        const mockStudent = {
            firstName: "Nate",
            lastName: "Won",
        };
        const wrapper = mount(<StudentName student={mockStudent} />);
        await waitFor(() => {
            expect(wrapper.props().student).toBe(mockStudent);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Tests if the Student full-name has turned to the upper case letters", async () => {
        expect.assertions(1);
        const mockStudent = {
            firstName: "nate",
            lastName: "won",
        };
        const wrapper = mount(<StudentName student={mockStudent} />);
        await waitFor(() => {
            expect(wrapper.contains("NATE WON")).toEqual(true);
        });
    });
});
