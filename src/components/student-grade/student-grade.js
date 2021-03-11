import React from "react";
import PropTypes from "prop-types";
import styles from "./student-grade.module.css";

function StudentGrade(props) {
    const { grade, idx } = props;
    return (
        <React.Fragment>
            <div className={styles.grade}>
                Test{idx + 1}: {grade}%
            </div>
        </React.Fragment>
    );
}
StudentGrade.propTypes = {
    grade: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
};
export default StudentGrade;
