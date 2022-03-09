import React from "react";
import * as style from "./carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "gatsby-plugin-sanity-image";
import "swiper/css";
// import "swiper/css/pagination";

const CarouselRenderer = ({ value }) => {
    return (
        <div className={style.grid}>
            <div className={style.carousel}>
                <Swiper
                    pagination={{
                        type: "progressbar",
                    }}
                    modules={[Pagination]}
                >
                    {value.content.map((slide) => {
                        return (
                            <SwiperSlide key={slide._key}>
                                <Image
                                    {...slide}
                                    alt={slide.alt}
                                    width={1000}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default CarouselRenderer;
