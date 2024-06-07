// /home/rpz/code/tanque-fullstack/tanque_frontend/src/app/page.tsx

"use client"

import Head from "next/head";
import SlideDescription from "@/components/tanques/SlideDescription";
import { useEffect, useState } from 'react'; // Importa o useState]
import ChangeTheCarouselSlideIndex from "@/components/tanques/ChangeTheCarouselSlideIndex";



export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // Define o estado para controlar o slide atual
  const [tankNameDecorated, setTankNameDecorated] = useState("");
  const [tankDescription, setTankDescription] = useState("");

  useEffect(() => {
    const fetchTankData = async () => {
      try {
        const nameDecoratedResponse = await fetch(`http://127.0.0.1:8080/api/tank_name_decorated/${currentIndex + 1}`)
        const descriptionResponse = await fetch(`http://127.0.0.1:8080/api/tank_description/${currentIndex + 1}`);

        //console.log(descriptionResponse);
        

        const nameDecoratedData = await nameDecoratedResponse.json();
        const descriptionData = await descriptionResponse.json();

        //console.log(descriptionData);

        setTankNameDecorated(nameDecoratedData);
        setTankDescription(descriptionData);
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
        <ChangeTheCarouselSlideIndex setCurrentIndex={setCurrentIndex} />
      </div>
      <div className='pageContainer'>
        <SlideDescription title={tankNameDecorated} description={tankDescription} /> {/* Renderiza a descrição do slide atual */}
      </div>
    </>
  );
}
