import React, { useState, useEffect } from 'react'
import './Complexity.css'

const types = ["easy", "medium", "hard"];

function Complexity({active, setActive}) {
    const getClassName = (type) => {
        const base = "complexity-btn";
        if (active === type) {
          return `${base} ${base}--active ${base}--${type}`;
        } else {
          return `${base} ${base}--${type}`;
        }
    };


    return(
      <>
        <p className="compTitle">COMPLEXITY</p>
        <div className="complexity-selector">
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

export default Complexity