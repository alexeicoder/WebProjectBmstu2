import React, { ChangeEvent, MouseEvent } from 'react';
import Input from '../Input/Input';
import Label from '../Label/Label';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    checkboxId: string;
    labelId?: string; // Optional label ID
    labelText: string;
    onClick?: (event: MouseEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checkboxId,
    labelId,
    labelText,
    onClick,
    onChange = () => { },
    checked = false,
    disabled = false,
}) => {
    return (
        <div className={styles.checkboxSection}>
            <Input
                id={checkboxId}
                type="checkbox"
                onClick={onClick}
                onChange={onChange}
                className={styles.checkbox}
                checked={checked}
                disabled={disabled} value={''} />
            <Label id={labelId} htmlFor={checkboxId} className={styles.checkboxTitle}>
                {labelText}
            </Label>
        </div>
    );
};

export default Checkbox;
