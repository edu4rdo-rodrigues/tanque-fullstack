// /home/rpz/code/tanques-de-guerra-russos/src/components/infoTanques/index.ts
import ImgTanqueT72BM from "../../../public/imgs-tanques-russos/T-72BM.jpg"
import ImgTanqueT80 from "../../../public/imgs-tanques-russos/T-80.jpg"
import ImgTanqueT90A from "../../../public/imgs-tanques-russos/T-90A.jpg"
import ImgTanqueT14 from "../../../public/imgs-tanques-russos/T-14.jpg"

import descriptions from "../../../public/tanque-descriptions.json";

export const slides = [
  { 
    img: ImgTanqueT72BM, 
    title: "T-72BM", 
    titleEffected: `"Velhote" T-72BM`,
    description: descriptions["T-72BM"]
  },
  { 
    img: ImgTanqueT80, 
    title: "T-80", 
    titleEffected: `T-80`,
    description: descriptions["T-80"]
  },
  { 
    img: ImgTanqueT90A, 
    title: "T-90A",
    titleEffected: `T-90A "Vladimir"`,
    description: descriptions["T-90A"]
  },
  { 
    img: ImgTanqueT14, 
    title: "T-14",
    titleEffected: `T-14 “Armata”`,
    description: descriptions["T-14"]
  },
];
