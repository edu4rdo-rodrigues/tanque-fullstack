// /home/rpz/code/tanque-fullstack/tanque_frontend/src/components/tanques/ChangeTheCarouselSlideIndex.tsx
import React, { useEffect, useRef, useState } from "react";
import CarouselTanques from "./CarouselTanques";

interface ChangeTheCarouselSlideIndexProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ChangeTheCarouselSlideIndex: React.FC<ChangeTheCarouselSlideIndexProps> = ({ setCurrentIndex }) => {
  const [tanks, setTanks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndexLocal] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [awaitListTanks, setAwaitListTanks] = useState(false)

  console.log("tanks: ", tanks);
  

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/tanks"); // Faz a solicitação para obter os tanques da API
        if (!response.ok) {
          throw new Error("Failed to fetch tanks");
        }
        const data = await response.json();
        setTanks(data);
      } catch (error) {
        console.error("Failed to fetch tanks:", error);
      }
    };

    fetchTanks();
  }, []);

  useEffect(() => {
    if (tanks.length !== 0) {
      setAwaitListTanks(true)
    } else {
      setAwaitListTanks(false)
    }
  })

  const nextSlide = () => {
    setCurrentIndexLocal((prevIndex) => (prevIndex + 1) % tanks.length);
  };

  const prevSlide = () => {
    setCurrentIndexLocal((prevIndex) => (prevIndex - 1 + tanks.length) % tanks.length);
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

  return (
    <CarouselTanques 
      currentIndex={currentIndex} 
      setCurrentIndex={setCurrentIndex} 
      tanks={tanks}
      awaitListTanks={awaitListTanks}
      prevSlide={prevSlide} 
      nextSlide={nextSlide} 
      carouselRef={carouselRef}  
    />
  );
};

export default ChangeTheCarouselSlideIndex;
