import React from 'react';

import PuffLoader from 'react-spinners/PuffLoader';

import './Loading.css';

function Loading() {
    return (
        <div className="loading">
            <PuffLoader size={72} color="#5d3ebc" />
        </div>
    );
}

export default Loading;
