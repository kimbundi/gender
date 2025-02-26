import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Image.css';
import { assets } from '../../../assets/assets';

const Image = () => {
  return (
    <div className="container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src={assets.gen1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.gen4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.gen5} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Image;
