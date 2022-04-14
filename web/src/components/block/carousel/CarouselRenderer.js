import React, { useState } from "react";
import * as style from "./carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "gatsby-plugin-sanity-image";
import "swiper/css";
// import "swiper/css/pagination";

const CarouselRenderer = ({ value }) => {
    const [swiper, setSwiper] = useState(null);
    return (
        <div className={style.grid}>
            <div className={style.carousel}>
                <button className={style.arrowLeft} onClick={() => swiper.slidePrev(500, true)}>
                    <svg
                        width="25.195"
                        height="45.146"
                        viewBox="0 0 25.195 45.146"
                        style={{ transform: "scaleX(-1)" }}
                    >
                        <path
                            d="M-22,0,0,21.5-22,43"
                            transform="translate(23.048 1.073)"
                            fill="none"
                            stroke="var(--text-colour)"
                            strokeMiterlimit="10"
                            strokeWidth="3"
                        />
                    </svg>
                </button>

                <Swiper
                    // pagination={{
                    //     type: "progressbar",
                    // }}
                    modules={[Pagination]}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    loop={true}
                >
                    {value.content.map((slide) => {
                        return (
                            <SwiperSlide key={slide._key}>
                                <div className={style.wrapper}>
                                    <Image
                                        {...slide}
                                        alt={slide.alt}
                                        width={1000}
                                        className={style.image}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <button className={style.arrowRight} onClick={() => swiper.slideNext(500, true)}>
                    <svg width="25.195" height="45.146" viewBox="0 0 25.195 45.146">
                        <path
                            d="M-22,0,0,21.5-22,43"
                            transform="translate(23.048 1.073)"
                            fill="none"
                            stroke="var(--text-colour)"
                            strokeMiterlimit="10"
                            strokeWidth="3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CarouselRenderer;
