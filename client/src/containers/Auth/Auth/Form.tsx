import * as React from 'react';
import * as styles from './Auth.css';

interface Props {
    fields: React.ReactNode[];
    button: React.ReactNode;
}

const Form = (props: Props) => {
    const items = props.fields.map((field, index) => (
        <div key={index} className={styles.field}>
            {field}
        </div>
    ));
    return (
        <form className="form">
            {items}
            <div className={styles.btn}>
                {props.button}
            </div>
        </form>
    );
};

export default Form;