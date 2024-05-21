// /home/rpz/code/tanques-de-guerra-russos/src/app/page.tsx
"use client"

import Head from "next/head";
import CarouselTanques from "@/components/tanques/CarouselTanques";
import SlideDescription from "@/components/tanques/SlideDescription";
import { slides } from '@/components/infoTanques/index'; // Importa a array de slides
import { useState } from 'react'; // Importa o useState

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // Define o estado para controlar o slide atual

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
        <SlideDescription title={slides[currentIndex].titleEffected} description={slides[currentIndex].description} /> {/* Renderiza a descrição do slide atual */}
      </div>
    </>
  );
}
