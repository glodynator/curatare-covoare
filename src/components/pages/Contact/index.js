import React from 'react';

export default function Contact() {
    return (
        <section className='contact-page'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='contact-page__headline'>Contact</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-8'>
                    <section className="contact-page__map-container">
                        <div className="embed-responsive embed-responsive-4by3">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1656.7728647966119!2d21.233493940926756!3d45.70404048968596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455c2557a28501%3A0xf0729ae0f45d9197!2sDavid+Voniga!5e0!3m2!1sro!2sro!4v1519474878415"
                                width="600" height="450" title="contact-map" allowFullScreen/>
                        </div>
                    </section>
                </div>
                <div className='col-12 col-lg-4'>
                    <section className="contact-page__info">
                        <h4>Adres&#259;</h4>
                        <p>Giroc, Rom&#226;nia</p>
                        <p className="contact-page__location">
                            <a className="link" target="_blank" rel="noopener noreferrer"
                                                   href="https://www.google.ro/maps/place/David+Voniga/@45.7040405,21.2334939,17.75z/data=!4m5!3m4!1s0x47455c2557a28501:0xf0729ae0f45d9197!8m2!3d45.7042825!4d21.2337325?hl=ro">Indicații
                            de orientare</a>
                        </p>
                        <h4>Informa&#539;ii de contact</h4>
                        <a className="contact-page__phone link" href='tel:0785 337 467'>0785 337 467</a>
                    </section>
                    <section className="contact-page__schedule">
                        <h4>Program de lucru</h4>
                        <table className="contact-page__program">
                            <tr>
                                <td>lun.</td>
                                <td>09:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>mar.</td>
                                <td>09:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>mie.</td>
                                <td>09:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>joi</td>
                                <td>09:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>vin.</td>
                                <td>09:00 - 20:00</td>
                            </tr>
                            <tr>
                                <td>s&#226;m.</td>
                                <td>&#206;nchis</td>
                            </tr>
                            <tr>
                                <td>dum.</td>
                                <td>&#206;nchis</td>
                            </tr>
                        </table>
                        <p><em>Asisten&#539;&#259; telefonic&#259; non-stop</em></p>
                    </section>
                </div>
            </div>
        </section>
    );
}