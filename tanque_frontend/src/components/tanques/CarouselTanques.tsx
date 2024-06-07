// /home/rpz/code/tanque-fullstack/tanque_frontend/src/components/tanques/CarouselTanques.tsx
// /home/rpz/code/tanques-de-guerra-russos/src/components/tanques/CarouselTanques.tsx

import React, { useRef, useState, useEffect } from "react";
import SlideTanque from "./SlideTanque";
import SlideDescription from "./SlideDescription";
import styles from "../../styles/Carousel.module.css";

interface CarouselTanquesProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  tanks: string[];
  awaitListTanks: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const CarouselTanques: React.FC<CarouselTanquesProps> = ({ currentIndex, setCurrentIndex, tanks, awaitListTanks,  prevSlide, nextSlide, carouselRef }) => {



  // Mantenha os estados para os dados dos tanques
  const [tankData, setTankData] = useState<Array<{ img: string; title: any; }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  if (awaitListTanks == true) {
    console.log("tanks props", tanks);
  }

  
  


  // Busque os dados de todas as imagens e nomes dos tanques
  useEffect(() => {
    
    const fetchTankData = async () => {
      try {
      
        const imagePromises = [];
        const namePromises = [];

  
        // Busque os dados de todas as imagens e nomes dos tanques
        for (let i = 1; i <= tanks.length; i++) {
          imagePromises.push(fetch(`http://127.0.0.1:8080/api/tank_img/${i}`, { method: 'GET' }));
          namePromises.push(fetch(`http://127.0.0.1:8080/api/tank_name/${i}`));
        }
    


        // Espere todas as solicitações completarem
        const imageResponses = await Promise.all(imagePromises);
        const nameResponses = await Promise.all(namePromises);

        

        // Extraia os dados das respostas
        const tankData = [];
        for (let i = 0; i < tanks.length; i++) {
          const imageRes = imageResponses[i];
          const nameRes = nameResponses[i];
        
          const blob = await imageRes.blob();
          const imgUrl = URL.createObjectURL(blob);
          const tankName = await nameRes.json();
        
          tankData.push({ img: imgUrl, title: tankName });
        }

        // Atualize o estado com os dados dos tanques
        setTankData(tankData);
        setLoading(true);
        
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tank data');
        setLoading(false);
      }
    };

    fetchTankData();
  }, [awaitListTanks == true]);


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
