import React from "react";

import "./Switch.css";

function Switch(props) {
    const [checked, setChecked] = React.useState(props.checked);
    const switchRef = React.useRef(null);

    const handleClick = () => {
        setChecked(!checked);
        switchRef.current.classList.toggle("active");
    };

    return (
        <div className="switch-container">
            <input type="checkbox" className="hidden select-none" />
            <div className={`switch ${checked && 'active'}`} ref={switchRef} onClick={handleClick}>
                <button className="switch-handle"></button>
                {checked ? (
                    <span className="active-text">Open</span>
                ) : (
                    <span className="inactive-text">Closed</span>
                )}
            </div>
        </div>
    );
}

export default Switch;
