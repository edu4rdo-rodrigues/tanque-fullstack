// /home/rpz/code/tanques-de-guerra-russos/src/components/tanques/SlideTanque.tsx

import Image, { StaticImageData } from 'next/image';
import styles from '../../styles/Carousel.module.css';

interface SlideProps {
  img: StaticImageData;
  title: string;
}

const SlideTanque: React.FC<SlideProps> = ({ img, title }) => (
  <div className={styles.slideContent}>
    <div className={styles.slideImage}>
      <Image src={img} layout="responsive" objectFit="cover" alt={title} />
    </div>
    <p className={styles.title}>{title}</p>
  </div>
);

export default SlideTanque;
