import React from "react";
import { Link } from "gatsby";
import * as style from "./carousel.module.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

const EventRendererCarouselSlide = ({ data }) => {
    const swiper = useSwiper();
    return (
        <div className={style.grid}>
            <button className={style.arrowLeft} onClick={() => swiper.slidePrev()}>
                <div>&lsaquo;</div>
            </button>
            <div className={style.carousel}>
                <Swiper slidesPerView={5} spaceBetween={10}>
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
            <button className={style.arrowRight} onClick={() => swiper.slideNext()}>
                <div>&rsaquo;</div>
            </button>
        </div>
    );
};

export default EventRendererCarouselSlide;
