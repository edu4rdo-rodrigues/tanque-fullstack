// /home/rpz/code/tanque-fullstack/tanque_frontend/src/components/tanques/SlideTanque.tsx
"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Carousel.module.css';





interface SlideProps {
  img: string;
  title: string
}


const SlideTanque: React.FC<SlideProps> = ({ img, title }) => {

  return (
    <div className={styles.slideContent}>
      <div className={styles.slideImage}>
        <Image 
          src={img} 
          //layout="responsive" 
          objectFit="cover" 
          alt={title} 
          width={500} 
          height={300} 
        />
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default SlideTanque;
