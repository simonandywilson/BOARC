import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import * as style from "./carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const EventRendererCarouselSlide = ({ data }) => {
    const [swiper, setSwiper] = useState(null);
    const [margin, setMargin] = useState(0);

    useEffect(() => {
        const rem = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--margin")
        );
        setMargin(rem * parseFloat(getComputedStyle(document.documentElement).fontSize));
    }, []);

    return data.length > 0 ? (
        <div className={style.grid}>
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
            <div className={style.carousel}>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={margin}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    breakpoints={{
                        500: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                >
                    {data.map((slide) => {
                        return (
                            <SwiperSlide key={slide._id} className={style.slide}>
                                <Link to={`/${slide.slug}`} className={style.text}>
                                    <div>
                                        {new Date(slide.start).toLocaleDateString("en-GB", {
                                            weekday: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div>
                                        {new Date(slide.start).toLocaleDateString("en-GB", {
                                            month: "short",
                                        })}
                                    </div>
                                    <div>
                                        {new Date(slide.start).toLocaleDateString("en-GB", {
                                            year: "2-digit",
                                        })}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
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
    ) : (
        <div className={style.grid}>
            <div className={style.carousel}>
                <Swiper slidesPerView={5} spaceBetween={10}>
                    <SwiperSlide className={style.placeholderSlide}></SwiperSlide>
                </Swiper>
                <div className={style.loader}>
                    <span>
                        Loading Events <span className={style.spinner}></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EventRendererCarouselSlide;
