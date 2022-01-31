import React from 'react';
import { useSelectContext } from './SelectContext';

const Option = React.forwardRef((props, ref) => {
    const { children, value } = props;
    const { changeSelectedOption } = useSelectContext();

    return (
        <div className="option-item" onClick={() => changeSelectedOption(children, value)}>
            {children}
        </div>
    );
});

export default Option;
