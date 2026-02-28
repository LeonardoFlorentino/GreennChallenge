import type { Producer } from "../types/producer";

const producers: Producer[] = [
  {
    id: 1,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/DGwmfmaFiaGsH8hNyaLmCM2LzhZbANKxI3VhskGf.webp",
  },
  {
    id: 2,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/fUnUqfQFbyW4nLg14ejaGU6A4afxV0a9N8Z4pTUv.webp",
  },
  {
    id: 3,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/9N7KZOmzZ77NssEJsdQ109KcKHXQDXMcxPuR7g87.webp",
  },
  {
    id: 4,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/WHNLo6jMqBOZoHO0iFFwi3bhAz28DlrRGANESbD0.webp",
  },
  {
    id: 5,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/X3FLCEjBHF2BYtbfdo3wnlQ1ickJhAEJeM92neoI.webp",
  },
  {
    id: 6,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/8ji7jQXfUCrnHN1SnwThMljrWpsicPRS7X6oMEwa.webp",
  },
  {
    id: 7,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/wt6BVxtH5o9w4JocjcjKIvYolphaaC3nd50kQa8T.webp",
  },
  {
    id: 8,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/OPZCv2bCJWZSpIeDtHyBlpZ1rWH7baFYwOtxcs5C.webp",
  },
  {
    id: 9,
    imageUrl:
      "https://s3.gdigital.com.br/gdigital/24/QfbHbZayoB79OTbCXVaXpRjcBwcHro1Fo9u5CYxi.webp",
  },
];

export const getProducers = async (): Promise<Producer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(producers);
    }, 300);
  });
};
