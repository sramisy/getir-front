import React from 'react';

function PopularSearch(props) {
    const {
        item,
        onClick,
    } = props;

    return (
        <li>
            <button onClick={onClick}>
                {item}
            </button>
        </li>
    );
}

export default PopularSearch;
