import React, { useState, useEffect } from 'react'
import './Category.css'

const types = ["food", "nature", "brain"];

function Category({active, setActive}) {
    const getClassName = (type) => {
        const base = "complexity-btn";
        if (active === type) {
          return `${base} ${base}--active`;
        } else {
          return `${base}`;
        }
    };


    return(
      <>
        <p className="catTitle">TOPIC</p>
        <div className="category-selector">
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

export default Category;