import React from "react";
import PropTypes from "prop-types";
import styles from "./student-avatar.module.css";

function StudentAvatar(props) {
    const { student } = props;
    return (
        <React.Fragment>
            <img src={student.pic} className={styles.avatar} alt="avatar" />
        </React.Fragment>
    );
}
StudentAvatar.propTypes = {
    student: PropTypes.object.isRequired,
};
export default StudentAvatar;
