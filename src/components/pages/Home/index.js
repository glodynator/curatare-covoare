import React from 'react';

import Slider from '../../slider'
import SideSection from '../SideSection';
import Articles from '../Articles';

import cleaningVideo from '../../../resources/videos/video-prezentare-curatare.mp4';

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
                            <p>Sa ne prezentam:<br/><br/>
                                Echipa S.C. A-Z CLEAN BY NICOLLE S.R.L.  este experta  in servicii de  curatare / spalare / igienizare covoare, mochete si tapiterii (scaune, scaune auto pentru copii, fotolii, canapele,coltare saltele, carucioare copii, saltele copii si  tapiterii auto).<br/>
                                Scopul nostru este sa fim cei mai buni si ca fiecare client sa fie multumit.<br/>
                                Acordam o atentie deosebita dezinfectarii obiectelor curatate, fara a neglija insa si aspectul fizic al acestora.
                            </p>
                        </div>
                    </div>
                    <div className='home-page__section row'>
                        <div className='home-page__media col-12 col-md-7'>
                            <video width="100%" height="auto" controls>
                                <source src={cleaningVideo} type="video/mp4"/>
                            </video>
                        </div>
                        <div className='col-12 col-md-5'>
                            <p>Vrei sa vezi cateva din lucrările noastre?<br/><br/>
                                Ti-am pregatit un videoclip scurt  pentru ca tu sa  poti vedea rezultatele lucrărilor noastre, dar si cata mizerie se aduna in tapiterii si covoare, fara sa ne dam seama.
                            </p>
                        </div>
                    </div>
                    <div className='home-page__section row'>
                        <div className='col-12'>
                            <h2 className='home-page__section-title'>Servicii</h2>
                            <p>Serviciul nostru se executa  in locatia ta, la: domiciliul tau, birou,  restaurant,  hotel, cresa, gradinita, biserica etc. Comanda minima este de 100 lei in Timisoara.<br/>
                                Garantia calitatii serviciilor noastre o dovedesc sutele de recenzii de pe pagina noastra de facebook.<br/>
                                Le poti vedea aici: <a href="https://www.facebook.com/CuratareCovoareTapiterii/reviews/?ref=page_internal">CuratareCovoareTapiterii</a>.
                            </p>
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