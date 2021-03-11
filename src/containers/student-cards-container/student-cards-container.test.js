import React from "react";
import api from "../../service/api";
import StudentCardsContainer from "./student-cards-container";
import StudentCard from "../../components/student-card/student-card";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

jest.mock("../../service/api");
jest.mock("../../components/student-card/student-card");

describe("Student Cards Container Component Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Renders a Student Cards Container component", async () => {
        expect.assertions(1);
        const wrapper = mount(<StudentCardsContainer />);
        await waitFor(() => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
    it("Renders Student Card components when students data are available", async () => {
        expect.assertions(2);
        const data = {
            students: [{ id: "1" }, { id: "2" }],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation(() => "StudentCard");
        mount(<StudentCardsContainer />);
        await waitFor(() => {
            expect(api.fetchStudents).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(StudentCard.mock.calls.length).toBe(2);
        });
    });
    it("Test if each student data properly initialized with empty tag array", async () => {
        const data = {
            students: [{ id: "1" }, { id: "2" }],
        };
        const expected = {
            students: [
                { id: "1", tags: [] },
                { id: "2", tags: [] },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation(() => "StudentCard");
        mount(<StudentCardsContainer />);
        await waitFor(() => {
            expect(api.fetchStudents()).toEqual(expected);
        });
    });
    it("Renders StudentCards that only match the name search term", async () => {
        const data = {
            students: [
                {
                    firstName: "Nate",
                    lastName: "Won",
                    id: "1",
                    tags: [],
                },
                {
                    firstName: "Joy",
                    lastName: "Kim",
                    id: "2",
                    tags: [],
                },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation(() => "StudentCard");
        const wrapper = mount(<StudentCardsContainer />);
        const newNameInput = wrapper.find("input").at(0);
        newNameInput.instance().value = "J";
        newNameInput.simulate("change");
        await waitFor(() => {
            expect(StudentCard.mock.calls.length).toBe(1);
        });
    });
    it("Renders StudentCards that only match the tag search term", async () => {
        const data = {
            students: [
                {
                    firstName: "Nate",
                    lastName: "Won",
                    id: "1",
                    tags: ["test"],
                },
                {
                    firstName: "Joy",
                    lastName: "Kim",
                    id: "2",
                    tags: ["new"],
                },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation(() => "StudentCard");
        const wrapper = mount(<StudentCardsContainer />);
        const newTagInput = wrapper.find("input").at(1);
        newTagInput.instance().value = "t";
        newTagInput.simulate("change");
        await waitFor(() => {
            expect(StudentCard.mock.calls.length).toBe(1);
        });
    });
    it("Renders StudentCards that only match the search & tag search term", async () => {
        const data = {
            students: [
                {
                    firstName: "Nate",
                    lastName: "Won",
                    id: "1",
                    tags: ["test"],
                },
                {
                    firstName: "Joy",
                    lastName: "Kim",
                    id: "2",
                    tags: ["new"],
                },
                {
                    firstName: "James",
                    lastName: "Paul",
                    id: "3",
                    tags: ["wait"],
                },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation(() => "StudentCard");
        const wrapper = mount(<StudentCardsContainer />);
        const newNameInput = wrapper.find("input").at(0);
        newNameInput.instance().value = "J";
        newNameInput.simulate("change");
        const newTagInput = wrapper.find("input").at(1);
        newTagInput.instance().value = "wait";
        newTagInput.simulate("change");
        await waitFor(() => {
            expect(StudentCard.mock.calls.length).toBe(1);
        });
    });
    it("Check if StudentCards are sorted by most relevant to the name search input", async () => {
        const data = {
            students: [
                {
                    firstName: "B",
                    lastName: "AC",
                    id: "1",
                    tags: [],
                },
                {
                    firstName: "A",
                    lastName: "BC",
                    id: "2",
                    tags: [],
                },
                {
                    firstName: "AA",
                    lastName: "BB",
                    id: "3",
                    tags: [],
                },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation((student) => {
            return student.student.firstName + student.student.lastName;
        });
        const wrapper = mount(<StudentCardsContainer />);
        const newNameInput = wrapper.find("input").at(0);
        newNameInput.instance().value = "AB";
        newNameInput.simulate("change");
        await waitFor(() => {
            expect(wrapper.html()).toContain("ABCAABB");
        });
    });
    it("Check if StudentCards are sorted alphabetically in case the same name search term exists in different cards", async () => {
        const data = {
            students: [
                {
                    firstName: "name",
                    lastName: "C",
                    id: "1",
                    tags: [],
                },
                {
                    firstName: "name",
                    lastName: "A",
                    id: "2",
                    tags: [],
                },
                {
                    firstName: "name",
                    lastName: "B",
                    id: "3",
                    tags: [],
                },
            ],
        };
        api.fetchStudents.mockImplementation(() => data);
        StudentCard.mockImplementation((student) => {
            return student.student.firstName + student.student.lastName;
        });
        const wrapper = mount(<StudentCardsContainer />);
        const newNameInput = wrapper.find("input").at(0);
        newNameInput.instance().value = "name";
        newNameInput.simulate("change");
        await waitFor(() => {
            expect(wrapper.html()).toContain("nameAnameBnameC");
        });
    });
});
