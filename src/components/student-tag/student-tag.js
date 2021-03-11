import React from "react";
import PropTypes from "prop-types";
import styles from "./student-tag.module.css";

function StudentTag(props) {
    const { tag, student, removeTag } = props;
    return (
        <React.Fragment>
            <div className={styles.tag} onClick={() => removeTag(tag, student)}>
                {tag}
                <span className={styles.tagDelete}>X</span>
            </div>
        </React.Fragment>
    );
}
StudentTag.propTypes = {
    student: PropTypes.object.isRequired,
    tag: PropTypes.string.isRequired,
    removeTag: PropTypes.func.isRequired,
};
export default StudentTag;
