import React from "react";
import PropTypes from "prop-types";
import styles from "./student-name.module.css";

function StudentName(props) {
    const { student } = props;

    function handleUpperCaseFullname(student) {
        const fullname = `${student.firstName} ${student.lastName}`;
        return fullname.toUpperCase();
    }

    return (
        <React.Fragment>
            <h1 className={styles.name}>{handleUpperCaseFullname(student)}</h1>
        </React.Fragment>
    );
}
StudentName.propTypes = {
    student: PropTypes.object.isRequired,
};
export default StudentName;
