import React from "react";
import PropTypes from "prop-types";
import styles from "./search-input.module.css";

function SearchInput(props) {
    const { type, inputFunction } = props;
    return (
        <React.Fragment>
            <input
                className={styles.input}
                placeholder={`Search by ${type}`}
                onChange={(e) => {
                    inputFunction(e.target.value.toLowerCase().trim());
                }}
            />
        </React.Fragment>
    );
}
SearchInput.propTypes = {
    type: PropTypes.string.isRequired,
    inputFunction: PropTypes.func.isRequired,
};
export default SearchInput;
