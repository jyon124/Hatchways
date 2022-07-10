// const hatchwayURL = "https://www.hatchways.io/api/assessment/students";
import students from "./students.json";

const fetchRequest = {
    fetchStudents: async () => {
        // const response = await fetch(hatchwayURL);
        // const data = await response.json();
        return students;
    },
};
export default fetchRequest;
