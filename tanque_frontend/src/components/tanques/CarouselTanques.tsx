// /home/rpz/code/tanque-fullstack/tanque_frontend/src/components/tanques/CarouselTanques.tsx
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
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const slideWidth = carouselRef.current.children[0].clientWidth;
      carouselRef.current.scrollTo({ left: currentIndex * slideWidth, behavior: 'smooth' });
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(currentIndex); // Atualiza o índice do slide pai quando o estado muda
  }, [currentIndex, setCurrentIndex]);



  // Mantenha os estados para os dados dos tanques
  const [tankData, setTankData] = useState<Array<{ img: string; title: any; }>>([]);
  const [tankImageData, setTankImageData] = useState<any | null>(null);
  const [tanknameData, setTankNameData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  // Busque os dados de todas as imagens e nomes dos tanques
  useEffect(() => {
    const fetchTankData = async () => {
      try {
        const imagePromises = [];
        const namePromises = [];

        // Busque os dados de todas as imagens e nomes dos tanques
        for (let i = 1; i <= slides.length; i++) {
          imagePromises.push(fetch(`http://127.0.0.1:8080/api/images/${i}`, { method: 'GET' }));
          namePromises.push(fetch(`http://127.0.0.1:8080/api/tankname/${i}`));
        }

        // Espere todas as solicitações completarem
        const imageResponses = await Promise.all(imagePromises);
        const nameResponses = await Promise.all(namePromises);

        // Extraia os dados das respostas
        const tankData = [];
        for (let i = 0; i < slides.length; i++) {
          const imageRes = imageResponses[i];
          const nameRes = nameResponses[i];

          const blob = await imageRes.blob();
          const imgUrl = URL.createObjectURL(blob);
          const tankName = await nameRes.json();

          tankData.push({ img: imgUrl, title: tankName });
        }

        // Atualize o estado com os dados dos tanques
        setTankData(tankData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tank data');
        setLoading(false);
      }
    };

    fetchTankData();
  }, []);


  return (
    <>
      <div className={styles.carouselContainer}>
        <button className={`${styles.button} ${styles.prev}`} onClick={prevSlide}>
          &#10094;
        </button>
        <div className={styles.carousel} ref={carouselRef}>
          {tankData.map((tank, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.active : styles.inactive}`}
            >
              <SlideTanque img={tank.img} title={tank.title} />
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
