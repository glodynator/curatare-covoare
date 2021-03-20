import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm';

import cleaningVideo from '../../resources/videos/video-exemple-curatare.mp4';
import cleaningSofa from '../../resources/images/prezentare/curatare-canapea.jpg';
import cleaningMattress from '../../resources/images/prezentare/curatare-saltea.jpg';
import cleaningCarpet from '../../resources/images/prezentare/curatare-covor.jpg';
import cleaningChair from '../../resources/images/prezentare/curatare-scaun.jpg';
import cleaningKindergarten from '../../resources/images/prezentare/curatare-gradinita.jpg';

class Slider extends Component {
    onSlideChange() {
        const elVideo = this.slides[this.previousIndex].querySelector('video');

        if (elVideo) {
            elVideo.pause();
        }
    }

    render() {
        const params = {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next.swiper-button-white',
                prevEl: '.swiper-button-prev.swiper-button-white',
            },
            on: {
                slideChange: this.onSlideChange
            }
        };

        return (
            <Swiper {...params}>
                <div>
                    <video width="100%" height="auto" controls>
                        <source src={cleaningVideo} type="video/mp4"/>
                    </video>
                </div>
                <div>
                    <img src={cleaningSofa} alt="exemplu-canapea-curatata"/>
                </div>
                <div>
                    <img src={cleaningMattress} alt="exemplu-saltea-curatata"/>
                </div>
                <div>
                    <img src={cleaningCarpet} alt="exemplu-covor-curatata"/>
                </div>
                <div>
                    <img src={cleaningChair} alt="exemplu-scaun-curatata"/>
                </div>
                <div>
                    <img src={cleaningKindergarten} alt="exemplu-gradinita-curatata"/>
                </div>
            </Swiper>
        );
    }
}

export default Slider;