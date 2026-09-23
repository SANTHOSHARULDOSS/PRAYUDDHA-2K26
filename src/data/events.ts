export type EventStatus = 'Open' | 'Coming Soon' | 'Closed' | 'Full';
export type EventCategory = 'Technical' | 'Non-Technical';

export interface SymposiumEvent {
  id: string;
  name: string;
  category: EventCategory;
  tagline?: string;
  description: string;
  concept?: string;
  rules: string[];
  roundsDetails?: string[];
  evaluationCriteria?: string[];
  winnerCriteria?: string;
  skillsTested?: string[];
  teamSize: string;
  fee: string;
  duration: string;
  rounds: string;
  eligibility: string;
  prizes: string;
  firstPrize?: string;
  secondPrize?: string;
  image: string;
  registrationLink: string;
  status: EventStatus;
}

export const events: SymposiumEvent[] = [
  /* ================= TECHNICAL EVENTS ================= */
  {
    id: 'pixel2alchemy',
    name: 'PIXEL2ALCHEMY',
    category: 'Technical',
    tagline: 'See it. Think it. Prompt it.',
    description:
      'Recreate a reference image as closely as possible using AI image generation through prompt engineering without internet searching.',
    concept:
      'Participants will be shown a reference image on the screen. Their challenge is to recreate an image that is as close as possible to the reference using AI image generation through prompt engineering.',
    rules: [
      'Internet browsing / searching will NOT be allowed.',
      'Participants must carefully observe the reference image and craft their prompt by identifying key elements: Subject, Background, Lighting, Colours, Composition, Camera angle, and Visual style.',
      'Participants will use the provided AI image-generation platform to generate their final output.',
    ],
    winnerCriteria:
      'The participant whose AI-generated image most closely matches the original reference image will be declared the winner.',
    skillsTested: ['Prompt Engineering', 'Observation', 'AI Knowledge', 'Creativity'],
    teamSize: 'Individual or Team (1–2 members)',
    fee: 'TBA',
    duration: '30–45 Mins',
    rounds: 'Single Challenge Round',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
    firstPrize: '₹1,000',
    secondPrize: '₹500',
    image: 'wand',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'websprint',
    name: 'WEBSPRINT',
    category: 'Technical',
    tagline: '40 Minutes. One Idea. Ship It.',
    description:
      'Design, build, and publish a complete responsive website within 40 minutes using any AI-powered web builder based on a given theme.',
    concept:
      'Participants will be given 40 minutes to design, build and publish a complete website. At the beginning of the event, themes will be provided (e.g. E-Commerce, Portfolio, Tourism, Ticket Booking). Participants can choose/receive a theme and use any AI-powered website builder. Before the timer ends, participants must successfully publish their website and submit the live URL.',
    rules: [
      'Theme will be assigned/selected at the start of the 40-minute sprint.',
      'Participants may use any AI-powered website builder or coding environment.',
      'The website must be published live and the URL submitted before the timer expires.',
    ],
    evaluationCriteria: [
      'UI/UX Design & Aesthetic Appeal',
      'Creativity & Originality',
      'Theme Relevance & Alignment',
      'Features & Functional Completeness',
      'Mobile & Desktop Responsiveness',
      'Overall User Experience',
    ],
    winnerCriteria:
      'The participant/team with the strongest overall website implementation will be selected based on the judging criteria.',
    skillsTested: ['AI Tools', 'Web Development', 'UI/UX', 'Creativity', 'Rapid Prototyping'],
    teamSize: 'Individual or Team (1–2 members)',
    fee: 'TBA',
    duration: '40 Minutes',
    rounds: 'Single Sprint Round',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
    firstPrize: '₹1,000',
    secondPrize: '₹500',
    image: 'layout',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'trace-x',
    name: 'TRACE-X',
    category: 'Technical',
    tagline: 'Spin. Pick. Code. Conquer.',
    description:
      'A two-round code-output prediction challenge testing mental execution and code analysis across C, C++, Python, and HTML.',
    concept:
      'TRACE-X is a code-output prediction challenge designed to test how well participants can read, understand and mentally execute code without running it.',
    roundsDetails: [
      'Round 1 — Aptitude Gate: All participants first attend a common aptitude round consisting of 10 questions. Qualifying participants advance to Round 2.',
      'Round 2 — Code Output Prediction: Code snippets in C, C++, Python, and HTML with four possible outputs. Participants analyze code, trace execution, and select the correct output without running the program. Difficulty ranges from basic syntax to tricky code-tracing questions.',
    ],
    rules: [
      'Round 1 consists of 10 aptitude questions; top scorers advance to Round 2.',
      'No program execution or compilers allowed; execution must be traced mentally.',
      'For team participation, members can discuss logic before locking their final answer.',
    ],
    winnerCriteria:
      'The participant/team with the highest number of correct answers wins. In case of a tie, completion time or a tie-breaker question will be used.',
    skillsTested: ['Code Tracing', 'Logical Thinking', 'Programming Fundamentals', 'Debugging Mindset'],
    teamSize: 'Individual or Team (1–2 members)',
    fee: 'TBA',
    duration: '1 Hour Total',
    rounds: '2 Rounds (Aptitude Gate + Code Tracing)',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
    firstPrize: '₹1,000',
    secondPrize: '₹500',
    image: 'terminal',
    registrationLink: 'TBA',
    status: 'Open',
  },
  {
    id: 'idea-squash',
    name: 'IDEA SQUASH',
    category: 'Technical',
    tagline: 'Paper Presentation',
    description:
      'A national-level paper presentation platform to showcase novel ideas, research findings, and technical innovations.',
    concept:
      'Idea Squash is the flagship paper presentation event at PRAYUDDHA 2K26, inviting innovative engineering concepts and technical papers.',
    rules: ['Detailed rules and guidelines will be announced soon.'],
    skillsTested: ['Paper Presentation', 'Research', 'Technical Communication', 'Innovation'],
    teamSize: 'Team (1–3 members)',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'Paper Submission & Presentation',
    eligibility: 'Open to all college students',
    prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
    firstPrize: '₹1,000',
    secondPrize: '₹500',
    image: 'presentation',
    registrationLink: 'TBA',
    status: 'Open',
  },

  /* ================= NON-TECHNICAL EVENTS ================= */
  {
    id: 'mind-vault',
    name: 'Mind Vault',
    category: 'Non-Technical',
    description:
      'A quiz competition that tests your knowledge across technology, science, current affairs, and logical reasoning. Rapid-fire rounds, buzzer battles, and a final showdown for the sharpest minds.',
    rules: ['Rules will be updated soon.'],
    teamSize: '2 members per team',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: 'Prizes / Gifts — To Be Announced',
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
    rules: ['Rules will be updated soon.'],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: 'Prizes / Gifts — To Be Announced',
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
    rules: ['Rules will be updated soon.'],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: 'Prizes / Gifts — To Be Announced',
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
    rules: ['Rules will be updated soon.'],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: 'Prizes / Gifts — To Be Announced',
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
    rules: ['Rules will be updated soon.'],
    teamSize: 'TBA',
    fee: 'TBA',
    duration: 'TBA',
    rounds: 'TBA',
    eligibility: 'Open to all college students',
    prizes: 'Prizes / Gifts — To Be Announced',
    image: 'gamepad',
    registrationLink: 'TBA',
    status: 'Open',
  },
];

