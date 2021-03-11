import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentGrade from "./student-grade";

describe("Student Grade Component Tests", () => {
    it("Renders a Student Grade component", async () => {
        expect.assertions(3);
        const mockIdx = 1;
        const mockGrade = "94";
        const wrapper = mount(<StudentGrade grade={mockGrade} idx={mockIdx} />);
        await waitFor(() => {
            expect(wrapper.props().grade).toBe(mockGrade);
            expect(wrapper.props().idx).toBe(mockIdx);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
