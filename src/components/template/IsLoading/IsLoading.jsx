import React from 'react';
import './IsLoading.css';

function IsLoading() {
  return (
    <section className="loading">
        <div className="loading_wrapper">
            <h1 className="loading_title">درحال برسی</h1>
            <p className="loading_text">لطفا کمی منتظر باشید 
            </p>
                <span className="loader"></span>
        </div>
    </section>
  )
}

export default IsLoading