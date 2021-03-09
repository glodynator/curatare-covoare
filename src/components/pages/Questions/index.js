import React from 'react';

export default function Questions() {
    return (
        <section className='questions-page'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='questions-page__headline'>Intrebarile voastre</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <ul className="questions-page__faq-list">
                        <li className="questions-page__faq-item">
                            <p className="questions-page__faq-question">Question 1</p>
                            <p className="questions-page__faq-answer">Answer 1</p>
                        </li>
                        <li>
                            <p className="questions-page__faq-question">Question 2</p>
                            <p className="questions-page__faq-answer">Answer 2</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}