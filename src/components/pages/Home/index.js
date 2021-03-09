import React from 'react';

import Slider from '../../slider'
import SideSection from '../SideSection';
import Articles from '../Articles';

export default function Home() {
    return (
        <div className='home-page'>
            <div className='row'>
                <div className='col-12 col-lg-8'>
                    <div className='home-page__section row'>
                        <div className='home-page__media col-12 col-md-7'>
                            <Slider/>
                        </div>
                        <div className='col-12 col-md-5'>
                            <p>Curățenie și igienizare la cele mai ridcate standarde. Fie că este vorba de casa ta (canapele, fotolii, saltele, covoare, scaune), mașina ta sau vrei ca angajații tai sa lucreze într-un mediu curat și igienic, noi suntem cea mai bună alegere. Avem o vastă experiență în curățenie iar o imagine face cât o mie de cuvinte.</p>
                        </div>
                    </div>
                    <div className='home-page__section row'>
                        <div className='home-page__media col-12 col-md-7'>
                            <video width="100%" height="auto" controls>
                                <source src="/videos/cleaning-presentation.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div className='col-12 col-md-5'>
                            <p>Am pregătit pentru tine o mică demonstrație cum decurce o parte din procesul de curățenie al unei canapele. În felul acesta îti poți face o idee între cum arată o canapea înainte și după curățare, dar și cată mizerie se poate aduna în țesăturile din obiectele de mobilier fară ca noi să ne dăm seama.</p>
                        </div>
                    </div>
                    <div className='home-page__section row'>
                        <div className='col-12'>
                            <h2 className='home-page__section-title'>Servicii</h2>
                            <p>Serviciile noastre acoperă o gama variată de obiecte din casa ta, de la locul de muncă sau din grădinițele în care cresc copiii noștri. Pentru casa ta te putem ajuta prin curățarea și igienizarea covoarelor, saltelelor, canapelelor sau a altor obiecte ce conțin țesături. În caz că vrei să asiguri un mediu curat și igienic pentru angajații tăi îți oferim servicii profesionale de curățare a mochetelor și a scaunelor. De asemenea oferim servicii de curățare și igienizare a mochetelor, covoarelor, saltelelor și scaunelor din gradinițe astfel încat copiii sa se poate dezvolta și juca într-un mediu sănătos.</p>
                        </div>
                    </div>
                    <div className='home-page__section row'>
                        <div className='col-12'>
                            <h2 className='home-page__section-title'>Articole recente</h2>
                            <div className='home-page__latest_articles'>
                                <Articles limit={4} />
                            </div>
                        </div>
                    </div>
                </div>
                <SideSection/>
            </div>
        </div>
    );
}