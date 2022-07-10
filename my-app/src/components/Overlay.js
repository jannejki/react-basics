import React from 'react';

const Overlay = (props) => {
    return (
        <div className={props.visible ? 'super' : 'hidden'} onClick={_toggleOverLay}>
            <h1>supermove!</h1>
            <p>Player {props.player} gets the next turn!</p>
            <p>click anywhere to continue</p>
        </div>
    );
}

export default Overlay;

//==============================================================

// toggle overlay class between hidden and super depending on visibility
const _toggleOverLay = () => {
    const overlay = document.querySelector('.super');
    overlay.classList.toggle('hidden');
}