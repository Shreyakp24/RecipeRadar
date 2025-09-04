import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 

function Carousel({ slides }) {
  return (
    <div className="relative px-10 overflow-hidden">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={45}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="carousel-slide">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
