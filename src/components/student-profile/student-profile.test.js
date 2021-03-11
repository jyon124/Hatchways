import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentProfile from "./student-profile";

describe("Student Profile Component Tests", () => {
    it("Renders a Student Profile component", async () => {
        expect.assertions(2);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            skill: "FrontendDevelopment",
        };
        const wrapper = mount(<StudentProfile student={mockStudent} />);
        await waitFor(() => {
            expect(wrapper.props().student).toBe(mockStudent);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Tests if average grades have calculated properly with two decimal places", async () => {
        expect.assertions(1);
        const student = {
            grades: ["82", "64", "100", "95", "100", "98", "72", "100"],
        };
        const len = student.grades.length;
        const avg = (
            student.grades.reduce((a, b) => parseInt(a) + parseInt(b)) / len
        ).toFixed(2);
        const wrapper = mount(<StudentProfile student={student} />);
        await waitFor(() => {
            expect(wrapper.contains(avg)).toBe(true);
        });
    });
});
