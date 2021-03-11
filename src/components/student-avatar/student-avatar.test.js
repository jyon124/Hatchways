import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import StudentAvatar from "./student-avatar";

describe("Student Avatar Component Tests", () => {
    it("Renders a Student Avatar component", async () => {
        expect.assertions(2);
        const student = { pic: "https:image.url.jpg" };
        const wrapper = mount(<StudentAvatar student={student} />);
        await waitFor(() => {
            expect(wrapper.props().student).toBe(student);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
