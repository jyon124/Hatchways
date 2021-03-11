import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./student-card.module.css";
import StudentAvatar from "../student-avatar/student-avatar";
import StudentName from "../student-name/student-name";
import StudentProfile from "../student-profile/student-profile";
import ExpandButton from "../expand-button/expand-button";
import StudentGrade from "../student-grade/student-grade";
import StudentTag from "../student-tag/student-tag";
import StudentTagForm from "../student-tag-form/student-tag-form";

function StudentCard(props) {
    const { student, addTag, removeTag } = props;
    const [isCollapsed, setIsCollapsed] = useState(true);

    function handleToggle() {
        setIsCollapsed(!isCollapsed);
    }

    function handleRenderGrades() {
        return student.grades.map((grade, idx) => {
            return <StudentGrade key={idx} idx={idx} grade={grade} />;
        });
    }

    function handleRenderTags() {
        return student.tags.map((tag, idx) => {
            return (
                <StudentTag
                    key={idx}
                    tag={tag}
                    student={student}
                    removeTag={removeTag}
                />
            );
        });
    }

    return (
        <React.Fragment>
            <div className={styles.container}>
                <StudentAvatar student={student} />
                <StudentName student={student} />
                <StudentProfile student={student} />
                <ExpandButton
                    handleToggle={handleToggle}
                    isCollapsed={isCollapsed}
                />
                <div className={styles.extendedContents}>
                    {isCollapsed ? null : (
                        <div>
                            <div>{handleRenderGrades()}</div>
                        </div>
                    )}
                </div>
                <div className={styles.tagsContainer}>
                    <div>{student.tags.length ? handleRenderTags() : null}</div>
                    <StudentTagForm
                        key={student.email + Math.random()}
                        addTag={addTag}
                        student={student}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
StudentCard.propTypes = {
    student: PropTypes.object.isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
};
export default StudentCard;
