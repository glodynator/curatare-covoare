import React from 'react';

const ServiceDescription = () => {
    return (
        <section className='service'>
            <p>GRATUIT : Orice spalati cu noi va fi dezinfectat gratuit! Afla mai multe despre dezinfectantul nostru <a href="#">aici</a>.</p>
            {/*testul subliniat poate sugera un link...este link ?*/}
            <p className="underline">(de ce trebuie sa folosim dezinfectant, ce dezinfectant sa folosim, de unde aducem microbii, ce microbi traiesc si ce probleme putem avea noi, copii si animalele de companie)</p>
            <p>Aceasta serviciu a fost creat pentru a combate  acarienii si microbii ce se afla in tapiterii si covoare. </p>
            <p>O sa va puneti intrebarea de ce?</p>
            <p>Daca o sa cititi povestea noastra o sa aflati mai detaliat ce ne-a determinat sa incepem astfel de servici si sa fim unici, sa informam clientul, sa il invatam din experinta noastra si sa ne educam sa prevenim, nu sa tratam.</p>
            <p>Putem spune, fara sa exageram, ca dormim cu dusmanul in pat. Un dusman tacut si invizibil dar care ne pune sanatatea in pericol zi de zi (ne referim la acarieni, mucegaiuri si microbi).</p>
            <p>Oamenii nu prea au stiut ce presupune acest serviciu, erau axati decat pe estetic, in general aveam cerinte pentru tapiterii auto, am incercat sa le explicam fiecaruia la ce riscuri se pot expune daca nu va acorda atentie igienizarii tapiteriilor si covoarelor din casa.</p>
            <p>Dezinfectantul nostru are actiune:</p>
            <ul>
                <li className='diamond'>Bactericida testata pe:<p className='bullet'>Staphylococcus aureus, Pseudomonas aeruginosa, Escherichia coli K12;</p></li>
                <li className='diamond'>Fungicida testata pe:<p className='bullet'>Candida albicans , Aspergillus niger</p></li>
            </ul>
            <p>Stiati ca ?</p>
            <h6 className='service__section-title'>1.1. ACARIENII</h6>
            <ul className='service__list'>
                <li className='arrow'>Traim cu ei si ii inspiram timp 7-8 ore in timp ce dormim;</li>
                <li className='arrow'>Traiesc in haine, lenjerii de pat, plapume, paturi, draperii,  se afla intr-un numar foarte mare in perne , saltele, canapele si covoare/mochete;</li>
                <li className='arrow'>Desi cu o mare parte din acestia putem trai in armonie, totusi, excrementele lor sunt foarte pericoloase in concentratii mari</li>
            </ul>
            <h6>1.2. Afectiuni provocate de acarieni:</h6>
            <ul>
                <li className='bullet'>Alergii la acarienii din praful de casa, pacientii prezinta simptome respiratorii si/sau oculare (astm, rinita, rinosinuzita, conjunctivita).</li>
                <li className='bullet'>Manifestarile variaza in intensitate de la usoare (stranut, rinoree, nas infundat, prurit nazal si ocular, hiperlacrimatie, ochi rosii, edeme palpebrale, etc) pana la manifestari mai severe, de tip astmatic (senzatie de sufocare si de presiune la nivelul toracelui, 6411tuse suparatoare, tuse la efort, respiratie zgomotoasa, suieratoare, oboseala la eforturi usoare, etc).</li>
            </ul>
            {/*lipseste titlul sectiunii*/}
            <h6 className='service__section-title'>2.1.</h6>
            <p>Cel mai frecvent pacienti alergici la acarienii din praful de casa vor prezenta simptome respiratorii si/sau oculare (astm, rinita, rinosinuzita, conjunctivita). Manifestarile variaza in intensitate de la usoare (stranut, rinoree, nas infundat, prurit nazal si ocular, hiperlacrimatie, ochi rosii, edeme palpebrale, etc) pana la manifestari mai severe, de tip astmatic (senzatie de sufocare si de presiune la nivelul toracelui, tuse suparatoare, tuse la efort, respiratie zgomotoasa, suieratoare, oboseala la eforturi usoare, etc).</p>
            <p>Utilizăm echipamente și soluții profesionale pentru spălarea țesaturilor, extracția murdăriei, și distrugerea microbilor și mucegaiurilor.</p>
        </section>
    );
};

export default ServiceDescription;