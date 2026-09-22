export type EventStatus = 'Open' | 'Coming Soon' | 'Closed' | 'Full';
export type EventCategory = 'Technical' | 'Non-Technical';

export interface SymposiumEvent {
  id: string;
  name: string;
  category: EventCategory;
  description: string;
  rules: string[];
  teamSize: string;
  fee: string;
  duration: string;
  rounds: string;
  eligibility: string;
  prizes: string;
  image: string;
  registrationLink: string;
  status: EventStatus;
}

export const events: SymposiumEvent[] = [
  {
    id: 'mind-vault',
    name: 'Mind Vault',
    category: 'Non-Technical',
    description:
      'A quiz competition that tests your knowledge across technology, science, current affairs, and logical reasoning. Rapid-fire rounds, buzzer battles, and a final showdown for the sharpest minds.',
    rules: [
      'Rules will be updated soon.',
    ],
    teamSize: '2 members per team',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'brain',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'act-battle',
    name: 'Act Battle',
    category: 'Non-Technical',
    description:
      'A stage performance competition where teams act out themes, scenarios, or social messages. Creativity, expression, and teamwork take center stage.',
    rules: [
      'Rules will be updated soon.',
    ],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'drama',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'treasurer-hunt',
    name: 'Treasurer Hunt',
    category: 'Non-Technical',
    description:
      'A treasure hunt filled with clues, puzzles, and challenges across the campus. Race against time and rival teams to uncover the hidden treasure.',
    rules: [
      'Rules will be updated soon.',
    ],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'compass',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'link-o-link',
    name: 'Link-O-Link',
    category: 'Non-Technical',
    description:
      'A connection-based game where participants link clues, images, or concepts to find the common thread. Quick thinking and lateral logic win the day.',
    rules: [
      'Rules will be updated soon.',
    ],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'link',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'e-sports-free-fire',
    name: 'E-Sports (Free Fire)',
    category: 'Non-Technical',
    description:
      'A competitive Free Fire gaming tournament. Form your squad, strategize, and battle through elimination rounds to claim the championship.',
    rules: [
      'Rules will be updated soon.',
    ],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'gamepad',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'tech-coming-soon',
    name: 'Technical Events',
    category: 'Technical',
    description:
      'Technical event details are being finalized. Stay tuned for exciting competitions in coding, paper presentation, debugging, and more.',
    rules: ['Rules will be updated soon.'],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — TBA | 2nd Prize — TBA',
    image: 'code',
    registrationLink: 'TBA',
    status: 'Coming Soon' as EventStatus,
  },
];
