import * as React from "react";
import StudentCard from "./student-card";
import StudentAvatar from "../student-avatar/student-avatar";
import StudentName from "../student-name/student-name";
import StudentProfile from "../student-profile/student-profile";
import ExpandButton from "../expand-button/expand-button";
import StudentGrade from "../student-grade/student-grade";
import StudentTag from "../student-tag/student-tag";
import StudentTagForm from "../student-tag-form/student-tag-form";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

jest.mock("../student-avatar/student-avatar");
jest.mock("../student-name/student-name");
jest.mock("../student-profile/student-profile");
jest.mock("../expand-button/expand-button");
jest.mock("../student-grade/student-grade");
jest.mock("../student-tag/student-tag");
jest.mock("../student-tag-form/student-tag-form");

describe("Student Card Component Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        StudentAvatar.mockImplementation(() => "StudentAvatar");
        StudentName.mockImplementation(() => "StudentName");
        StudentProfile.mockImplementation(() => "StudentProfile");
        ExpandButton.mockImplementation(() => "ExpandButton");
        StudentGrade.mockImplementation(() => "StudentGrade");
        StudentTag.mockImplementation(() => "StudentTag");
        StudentTagForm.mockImplementation(() => "StudentTagForm");
    });
    it("Renders a StudentCard component", async () => {
        expect.assertions(4);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        const wrapper = mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(wrapper.props().student).toBe(mockStudent);
            expect(wrapper.props().addTag).toBe(mockAddTag);
            expect(wrapper.props().removeTag).toBe(mockRemoveTag);
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Renders StudentAvatar child components when students data are available", async () => {
        expect.assertions(1);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentAvatar.mock.calls.length).toBe(1);
        });
    });
    it("Renders StudentName child components when students data are available", async () => {
        expect.assertions(1);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentName.mock.calls.length).toBe(1);
        });
    });
    it("Renders StudentProfile child components when students data are available", async () => {
        expect.assertions(1);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentProfile.mock.calls.length).toBe(1);
        });
    });
    it("Renders ExpandButton child components when students data are available", async () => {
        expect.assertions(1);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(ExpandButton.mock.calls.length).toBe(1);
        });
    });
    it("Renders StudentGrade child components when students data are available", async () => {
        expect.assertions(1);
        const stateSetter = jest.fn();
        jest.spyOn(React, "useState").mockImplementationOnce((stateValue) => [
            (stateValue = false),
            stateSetter,
        ]);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: [],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        const gradeLength = mockStudent.grades.length;
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentGrade.mock.calls.length).toBe(gradeLength);
        });
    });
    it("Renders StudentTag child components when students data are available", async () => {
        expect.assertions(1);
        const stateSetter = jest.fn();
        jest.spyOn(React, "useState").mockImplementationOnce((stateValue) => [
            (stateValue = false),
            stateSetter,
        ]);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: ["one", "two", "three"],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        const tagsLength = mockStudent.tags.length;
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentTag.mock.calls.length).toBe(tagsLength);
        });
    });
    it("Renders StudentTagForm child components when students data are available", async () => {
        expect.assertions(1);
        const stateSetter = jest.fn();
        jest.spyOn(React, "useState").mockImplementationOnce((stateValue) => [
            (stateValue = false),
            stateSetter,
        ]);
        const mockStudent = {
            city: "California",
            company: "Hatchways",
            email: "jyon1204@gmail.com",
            firstName: "Nate",
            grades: ["100", "100", "100", "100", "100", "100", "100", "100"],
            id: "1",
            lastName: "Won",
            pic: "https:image.url.jpg",
            skill: "FrontendDevelopment",
            tags: ["one", "two", "three"],
        };
        const mockAddTag = jest.fn();
        const mockRemoveTag = jest.fn();
        mount(
            <StudentCard
                student={mockStudent}
                addTag={mockAddTag}
                removeTag={mockRemoveTag}
                index={1}
            />
        );
        await waitFor(() => {
            expect(StudentTagForm.mock.calls.length).toBe(1);
        });
    });
});
