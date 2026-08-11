/**
 * KSC — GALLERY DATA
 * Drop real photos into /src/assets/gallery/ and swap the imports below.
 * The first two entries are placeholders — swap the file names for the real
 * shop-front and study-material photos when you upload them.
 */
import shopFront from "../assets/gallery/shop-front.svg"; // TODO: replace with real shop-front photo (e.g. shop-front.jpg)
import studyMaterials from "../assets/gallery/study-materials.svg"; // TODO: replace with real study-material/answer-script storage photo

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "shop-front",
    src: shopFront,
    alt: "Karur Study Center shop front",
    caption: "Karur Study Center — Front Office",
  },
  {
    id: "study-materials",
    src: studyMaterials,
    alt: "Study materials and answer-script storage at Karur Study Center",
    caption: "Study Material & Answer-Script Storage",
  },
  // TODO: append more gallery entries as photos arrive, e.g.
  // { id: "campus-fair", src: somePhoto, alt: "...", caption: "..." },
];