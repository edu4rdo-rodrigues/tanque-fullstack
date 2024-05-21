// /home/rpz/code/tanques-de-guerra-russos/src/components/tanques/SlideDescription.tsx
// SlideDescription.tsx

import React from 'react';
import styles from '../../styles/SlideDescription.module.css'; // Importa o arquivo CSS

interface SlideDescriptionProps {
  title: string;
  description: string
}

const SlideDescription: React.FC<SlideDescriptionProps> = ({ title, description }) => {
  return (
    <div className={styles.slideDescription}> {/* Aplica a classe CSS usando o módulo CSS */}
      <h2>{title}</h2>
      {/* Aqui você pode adicionar mais informações ou estilizar conforme necessário */}
      <p>{description}</p>
    </div>
  );
};

export default SlideDescription;
