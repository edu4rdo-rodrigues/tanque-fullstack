// /home/rpz/code/tanques-de-guerra-russos/src/components/tanques/CarouselTanques.tsx

import React, { useRef, useState, useEffect } from "react";
import SlideTanque from "./SlideTanque";
import SlideDescription from "./SlideDescription";
import styles from "../../styles/Carousel.module.css";
import { slides } from "@/components/infoTanques/index";

interface CarouselTanquesProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselTanques: React.FC<CarouselTanquesProps> = ({ setCurrentIndex }) => {
  const [currentIndex, setCurrentIndexLocal] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndexLocal((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndexLocal((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.children[0].clientWidth;
      carouselRef.current.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(currentIndex); // Atualiza o índice do slide pai quando o estado muda
  }, [currentIndex, setCurrentIndex]);

  return (
    <>
      <div className={styles.carouselContainer}>
        <button className={`${styles.button} ${styles.prev}`} onClick={prevSlide}>
          &#10094;
        </button>
        <div className={styles.carousel} ref={carouselRef}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.active : styles.inactive}`}
            >
              <SlideTanque img={slide.img} title={slide.title} />
              {index === currentIndex && (
                <SlideDescription title={slide.title} description={slide.description} />
              )}
            </div>
          ))}
        </div>
        <button className={`${styles.button} ${styles.next}`} onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default CarouselTanques;
