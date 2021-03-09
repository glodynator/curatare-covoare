import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm';

class Slider extends Component {
    render() {
        const params = {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next.swiper-button-white',
                prevEl: '.swiper-button-prev.swiper-button-white',
            }
        };

        return (
            <Swiper {...params}>
                <div>
                    <img src="/images/featured/cleaned-sofa.jpg" alt="cleaned-sofa"/>
                </div>
                <div>
                    <img src="/images/featured/cleaned-mattress.jpg" alt="cleaned-mattress"/>
                </div>
                <div>
                    <img src="/images/featured/cleaned-carpet.jpg" alt="cleaned-carpet"/>
                </div>
                <div>
                    <img src="/images/featured/cleaned-chair.jpg" alt="cleaned-chair"/>
                </div>
                <div>
                    <img src="/images/featured/cleaned-kindergarten.jpg" alt="cleaned-kindergarten"/>
                </div>
            </Swiper>
        );
    }
}

export default Slider;