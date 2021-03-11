import api from "./api.js";
import { waitFor } from "@testing-library/react";

describe("API Tests: FetchStudents", () => {
    const mockFetchJson = jest.fn();
    jest.spyOn(global, "fetch");
    afterEach(() => {
        fetch.mockClear();
        mockFetchJson.mockClear();
    });
    it("Calls the fetch API and return the JSON data", async () => {
        expect.assertions(3);
        const response = {
            students: [
                {
                    city: "California",
                    company: "Hatchways",
                    email: "jyon1204@gmail.com",
                    firstName: "Nate",
                    grades: [
                        "100",
                        "100",
                        "100",
                        "100",
                        "100",
                        "100",
                        "100",
                        "100",
                    ],
                    id: "1",
                    lastName: "Won",
                    pic: "https:image.url.jpg",
                    skill: "FrontendDevelopment",
                },
            ],
        };
        mockFetchJson.mockImplementation(async () => response);
        fetch.mockImplementation(async () => ({
            json: mockFetchJson,
        }));
        const data = await api.fetchStudents();
        expect(fetch).toHaveBeenCalled();
        expect(mockFetchJson).toHaveBeenCalled();
        expect(data).toEqual(response);
    });
    it("Throws an error in case the network call fails", async () => {
        expect.assertions(1);
        const error = new Error("Network request failed");
        fetch.mockImplementation(() => Promise.reject(error));
        await waitFor(() => {
            expect(api.fetchStudents()).rejects.toEqual(error);
        });
    });
});
