import React from "react";
import PropTypes from "prop-types";
import styles from "./expand-button.module.css";

function ExpandButton(props) {
    const { isCollapsed, handleToggle } = props;
    return (
        <React.Fragment>
            <div className={styles.expandBtn} onClick={() => handleToggle()}>
                <div className={styles.horizontalLine}></div>
                <div className={isCollapsed ? styles.verticalLine : null}></div>
            </div>
        </React.Fragment>
    );
}
ExpandButton.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
};
export default ExpandButton;
