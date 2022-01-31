import React from 'react';

import "./Checkbox.css";

function Checkbox(props) {
    const { id } = props;
    const [checked, setChecked] = React.useState(false);

    return (
        <div className="checkbox h-5">
            <input type="checkbox" id={id} checked={checked} onChange={() => setChecked(!checked)} />
        </div>
    );
}

export default Checkbox;
