import React, {FC, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import styled from "styled-components";
import {IPaths} from "../store/productStore";
import {BASE_URL} from "../utils/consts";
import NoFoto from "./NoFoto";
import {baseTheme} from "../styles/theme";


interface ICoverSwiper {
    fotoSlider: IPaths[],
    minLimitFoto: number
}


const SwiperBlock: FC<ICoverSwiper> = (
    {fotoSlider, minLimitFoto}
) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    let quantityFoto = Array.isArray(fotoSlider)
        ? fotoSlider.length
        : 0

    let newFotoSlider: IPaths[] = quantityFoto > minLimitFoto
        ? fotoSlider
        : fotoSlider.concat(new Array(minLimitFoto - quantityFoto)
            .fill("0")
            .map(() => {
                return {
                    idPath: Math.random(),
                    idDevice: 0,
                    pathName: "",
                    pathNameUrl: ""
                }
            })
        )

    return (
        <CoverSwiper>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                }}
                spaceBetween={0}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    newFotoSlider.map(path => <SwiperSlide key={path.idPath}>

                        {
                            path.pathNameUrl.length > 0
                                ? <img src={BASE_URL + path.pathNameUrl} alt={"foto"}/>
                                : <NoFoto/>
                        }


                    </SwiperSlide>)
                }

            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 1,
                    },
                    425: {
                        slidesPerView: 3,
                        spaceBetween: 4,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 6,
                    },
                    1440: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
                //slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"

            >
                {
                    newFotoSlider.map(path => <SwiperSlide key={path.idPath}>
                        {
                            path.pathNameUrl.length > 0
                                ? <img src={BASE_URL + path.pathNameUrl} alt={"foto"}/>
                                : <NoFoto/>
                        }

                    </SwiperSlide>)
                }
            </Swiper>
        </CoverSwiper>
    );
};

export default SwiperBlock;

const CoverSwiper = styled.div`
    height: 100%;
    width: 100%;

    background: #000;

    .swiper {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .swiper-slide {
        background-size: cover;
        background-position: center;
    }

    .mySwiper2 {
        height: 80%;
        width: 100%;
    }

    .mySwiper {
        height: 20%;
        box-sizing: border-box;
        padding: 10px 0;
    }

    .mySwiper .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }

    .mySwiper .swiper-slide-thumb-active {
        opacity: 1;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .swiper-button-prev,
    .swiper-button-next{
        @media(${baseTheme.maxMedia.laptop1024}){
            display: none;
        }
    }



`
