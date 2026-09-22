export interface GalleryItem {
  id: string;
  category: 'Inauguration' | 'Technical Events' | 'Non-Technical Events' | 'Prize Distribution' | 'Behind the Scenes';
  caption: string;
  query: string;
}

export const galleryItems: GalleryItem[] = [
  { id: 'g1', category: 'Inauguration', caption: 'Inauguration Ceremony', query: 'auditorium stage ceremony' },
  { id: 'g2', category: 'Inauguration', caption: 'Lamp Lighting', query: 'lamp lighting ceremony' },
  { id: 'g3', category: 'Inauguration', caption: 'Welcome Dance', query: 'classical dance performance stage' },
  { id: 'g4', category: 'Technical Events', caption: 'Technical Event', query: 'coding competition students computers' },
  { id: 'g5', category: 'Technical Events', caption: 'Paper Presentation', query: 'student presentation conference' },
  { id: 'g6', category: 'Technical Events', caption: 'Debugging Contest', query: 'programming competition' },
  { id: 'g7', category: 'Non-Technical Events', caption: 'Quiz Competition', query: 'quiz competition buzzer' },
  { id: 'g8', category: 'Non-Technical Events', caption: 'Treasure Hunt', query: 'treasure hunt game' },
  { id: 'g9', category: 'Non-Technical Events', caption: 'E-Sports Tournament', query: 'esports gaming tournament' },
  { id: 'g10', category: 'Prize Distribution', caption: 'Prize Distribution', query: 'award ceremony trophy' },
  { id: 'g11', category: 'Prize Distribution', caption: 'Winners on Stage', query: 'award winners stage celebration' },
  { id: 'g12', category: 'Behind the Scenes', caption: 'Organizing Team', query: 'team collaboration students' },
  { id: 'g13', category: 'Behind the Scenes', caption: 'Preparations', query: 'event preparation backstage' },
  { id: 'g14', category: 'Behind the Scenes', caption: 'Decoration', query: 'event decoration stage design' },
];

export const galleryFilters = ['All', 'Inauguration', 'Technical Events', 'Non-Technical Events', 'Prize Distribution', 'Behind the Scenes'] as const;
