import React from 'react';
import styles from "./FormInput.module.scss";

const FormInput = ({ handleChange, label, ...otherProps}) => (
    <div className={styles.groupContainer}>
    <input className={styles.formInputContainer} onChange={handleChange} {...otherProps} />
    {
        label ?
        (<label className={styles.formInputLabel}>
            {label}
        </label>)
        :
        null
    }
    </div>
);

export default FormInput;