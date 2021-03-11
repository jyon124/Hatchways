import React from "react";
import PropTypes from "prop-types";
import styles from "./student-profile.module.css";

function StudentProfile(props) {
    const { student } = props;

    function handleAverageGrade(grades) {
        const sum = grades.reduce((a, b) => parseInt(a) + parseInt(b));
        let avg = (sum / grades.length).toFixed(2);
        return avg;
    }

    return (
        <React.Fragment>
            <div className={styles.content}>
                <div>City: {student.city}</div>
                <div>Email: {student.email}</div>
                <div>Company: {student.company}</div>
                <div>Skill: {student.skill}</div>
                <div>Average: {handleAverageGrade(student.grades)}%</div>
            </div>
        </React.Fragment>
    );
}
StudentProfile.propTypes = {
    student: PropTypes.object.isRequired,
};
export default StudentProfile;
