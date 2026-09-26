export interface GalleryItem {
  id: string;
  category: 'Inauguration' | 'Technical Events' | 'Non-Technical Events' | 'Prize Distribution' | 'Behind the Scenes';
  caption: string;
  query: string;
  image: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Inauguration',
    caption: 'Official PRAYUDDHA 2K26 Poster',
    query: 'symposium poster launch',
    image: '/images/poster/prayuddha-2k26-official-poster.png',
  },
  {
    id: 'g2',
    category: 'Inauguration',
    caption: 'Anna University BIT Campus Main Entrance',
    query: 'anna university entrance',
    image: '/images/venue/venue-entrance.png',
  },
  {
    id: 'g3',
    category: 'Inauguration',
    caption: 'Campus Route & Location Map',
    query: 'campus location map',
    image: '/images/venue/campus-map.png',
  },
  {
    id: 'g4',
    category: 'Inauguration',
    caption: 'Anna University Official Crest',
    query: 'anna university seal',
    image: '/images/branding/anna-university-logo.png',
  },
  {
    id: 'g5',
    category: 'Inauguration',
    caption: 'PRAYUDDHA Official Emblem',
    query: 'prayuddha emblem',
    image: '/images/branding/prayuddha-logo.png',
  },
  {
    id: 'g6',
    category: 'Behind the Scenes',
    caption: 'Official Symposium WhatsApp Community QR',
    query: 'whatsapp qr code',
    image: '/images/qr/whatsapp-group-qr.png',
  },
];

export const galleryFilters = ['All', 'Inauguration', 'Behind the Scenes'] as const;


