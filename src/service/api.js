const hatchwayURL = "https://www.hatchways.io/api/assessment/students";

const fetchRequest = {
    fetchStudents: async () => {
        const response = await fetch(hatchwayURL);
        const data = await response.json();
        return data;
    },
};
export default fetchRequest;
