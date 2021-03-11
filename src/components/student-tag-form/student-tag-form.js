import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./student-tag-form.module.css";

function StudentTagForm(props) {
    const { student, addTag } = props;

    const [tagInput, setTagInput] = useState("");

    function handleTagSubmit(e) {
        e.preventDefault();
        // Prevent from adding invalid empty input
        if (tagInput.trim().length) {
            addTag(tagInput, student);
            setTagInput("");
        } else {
            alert("Invalid Tag name");
        }
    }

    function handleTagInput(e) {
        e.preventDefault();
        setTagInput(e.target.value);
    }

    return (
        <React.Fragment>
            <form onSubmit={(e) => handleTagSubmit(e)}>
                <input
                    className={styles.input}
                    placeholder="Tag name"
                    type="text"
                    value={tagInput}
                    onChange={(e) => handleTagInput(e)}
                />
                <input className={styles.tagSubmit} type="submit" />
            </form>
        </React.Fragment>
    );
}
StudentTagForm.propTypes = {
    student: PropTypes.object.isRequired,
    addTag: PropTypes.func.isRequired,
};
export default StudentTagForm;
