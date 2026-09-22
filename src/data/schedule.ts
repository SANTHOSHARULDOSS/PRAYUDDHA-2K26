export interface ScheduleItem {
  time: string;
  programme: string;
  isBreak?: boolean;
  isEnd?: boolean;
}

export const schedule: ScheduleItem[] = [
  { time: '8:00 AM – 8:45 AM', programme: 'Assembly – All 3 Years (I, II & III)' },
  { time: '9:00 AM – 10:30 AM', programme: 'Inauguration Ceremony' },
  { time: '10:45 AM – 11:00 AM', programme: 'Banner Launch' },
  { time: '11:00 AM – 1:00 PM', programme: 'Technical & Non-Technical Events' },
  { time: '1:00 PM – 2:00 PM', programme: 'Lunch Break', isBreak: true },
  { time: '2:00 PM – 3:45 PM', programme: 'Technical & Non-Technical Events' },
  { time: '4:00 PM – 4:45 PM', programme: 'Prize Distribution & Events' },
  { time: '4:45 PM onwards', programme: 'End of PRAYUDDHA 2K26', isEnd: true },
];

export const inaugurationCeremony: string[] = [
  'Choir / Tamil Invocation',
  'Lamp Lighting',
  'Welcome Address',
  'Welcome Dance',
  'Chief Guest Address',
  'National Anthem',
  'Vote of Thanks',
];
