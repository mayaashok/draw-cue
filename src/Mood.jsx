import React, { useState, useEffect } from 'react'
import './Mood.css'

const types = ["calm", "dreamy", "stressed"];

function Mood({active, setActive}) {
    const getClassName = (type) => {
        const base = "mood-btn";
        if (active === type) {
          return `${base} ${base}--active`;
        } else {
          return `${base}`;
        }
    };


    return(
      <>
        <p className="moodTitle">MOOD</p>
        <div className="mood-selector">
            {types.map((type) => (
                <button
                    key={type}
                    className={getClassName(type)}
                    onClick={() => setActive(type)}>
                {type}
                </button>
            ))}
        </div>
      </>
    );
}

export default Mood