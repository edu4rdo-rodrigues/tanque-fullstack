// /home/rpz/code/tanque-fullstack/tanque_frontend/src/app/page.tsx

"use client"

import Head from "next/head";
import CarouselTanques from "@/components/tanques/CarouselTanques";
import SlideDescription from "@/components/tanques/SlideDescription";
import { useEffect, useState } from 'react'; // Importa o useState]



export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // Define o estado para controlar o slide atual
  const [tankName, setTankName] = useState("");
  const [tankDescription, setTankDescription] = useState("");

  useEffect(() => {
    const fetchTankData = async () => {
      try {
        const nameResponse = await fetch(`http://127.0.0.1:8080/api/tankname/${currentIndex + 1}`)
        const descriptionResponse = await fetch(`http://127.0.0.1:8080/api/tanksdescription/${currentIndex + 1}`);

        const nameData = await nameResponse.json();
        const descriptionData = await descriptionResponse.json();

        setTankName(nameData);
        setTankDescription(descriptionData.description);
      } catch (error) {
        console.error("Failed to fetch tank data:", error);
      }
    };

    fetchTankData();
  }, [currentIndex]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Descrição da Página Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <CarouselTanques setCurrentIndex={setCurrentIndex} /> {/* Passa a função para atualizar o índice do slide */}
      </div>
      <div className='pageContainer'>
        <SlideDescription title={tankName} description={tankDescription} /> {/* Renderiza a descrição do slide atual */}
      </div>
    </>
  );
}
