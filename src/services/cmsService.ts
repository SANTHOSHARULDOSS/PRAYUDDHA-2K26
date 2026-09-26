import type {
  CMSState,
  SiteConfigData,
  AnnouncementData,
  GalleryItemData,
  PosterData,
  BrochureData,
  EventItemData,
  TeamMemberData,
  ContactConfigData,
  TravelRouteData,
  ScheduleItemData,
  PrizesData,
  RuleCategoryData,
} from '@/types/cms';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const STORAGE_KEY = 'prayuddha_2k26_cms_state_v1';
export const CMS_EVENT_NAME = 'prayuddha_cms_update';

// INITIAL SEED DATA FOR PRAYUDDHA 2K26
export const INITIAL_CMS_STATE: CMSState = {
  siteConfig: {
    siteName: 'PRAYUDDHA 2K26',
    edition: '2K26',
    motto: 'Unleash. Innovate. Conquer.',
    slogan: 'IDEAS IGNITE IMPACTS',
    tagline: 'LET THE IDEAS BATTLE',
    symposiumIdentity: 'A SYMPOSIUM • BEYOND • BOUNDARIES',
    entryFeeNotice: 'ONE ENTRY FEE • FULL SYMPOSIUM ACCESS',
    eventDate: '09 October 2026',
    eventDateShort: 'October 9, 2026',
    eventDay: 'Friday',
    eventTime: '9:00 AM onwards',
    countdownDate: '2026-10-09T09:00:00+05:30',
    venue: 'Dr. A.P.J. Abdul Kalam Auditorium, B-Block',
    institution: 'University College of Engineering (BIT) Campus',
    university: 'Anna University',
    city: 'Tiruchirappalli',
    pincode: '620024',
    state: 'Tamil Nadu',
    address: 'University College of Engineering (BIT) Campus, Anna University, Tiruchirappalli – 620024, Tamil Nadu',
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
    registrationStatus: 'OPEN',
    registrationBtnText: 'Register Now',
    registrationFee: '₹299',
    upiPhone: '9751600742',
    qrCodeUrl: '/images/qr/registration-google-form-qr.png',
    googleMapsUrl: 'https://www.google.com/maps/place/Anna+University+RO+Tiruchirappalli/@10.6581513,78.7423525,17z',
    navLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Reach Us', href: '#reach-us' },
      { label: 'Events', href: '#events' },
      { label: 'Prizes', href: '#prizes' },
      { label: 'Rules', href: '#rules' },
      { label: 'Schedule', href: '#schedule' },
      { label: 'Team', href: '#team' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Brochure', href: '#brochure' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  announcements: [
    {
      id: 'ann-1',
      title: 'PRAYUDDHA 2K26 Registration is Now Live!',
      content: 'Register through the official Google Form. Single entry fee of ₹299 includes full symposium access and Veg/Non-Veg Biryani lunch!',
      type: 'urgent',
      priority: 1,
      isPublished: true,
      date: '2026-09-26',
    },
    {
      id: 'ann-2',
      title: 'Updated Event Rules & Guidelines Available',
      content: 'Check the Rules section for complete details regarding technical and non-technical competitions.',
      type: 'info',
      priority: 2,
      isPublished: true,
      date: '2026-09-25',
    },
  ],

  poster: {
    posterUrl: '/images/poster/prayuddha-2k26-official-poster.png',
    caption: 'PRAYUDDHA 2K26 Official Symposium Poster',
    isPublished: true,
    lastUpdated: new Date().toISOString(),
  },

  brochure: {
    page1Url: '/images/brochure/brochure-page-1.png',
    page2Url: '/images/brochure/brochure-page-2.png',
    title: 'PRAYUDDHA 2K26 Official 2-Page Brochure',
    isPublished: true,
    lastUpdated: new Date().toISOString(),
  },

  gallery: [
    {
      id: 'g1',
      title: 'Official PRAYUDDHA 2K26 Poster Launch',
      description: 'Moments from the grand symposium poster unveiling ceremony.',
      category: 'Inauguration',
      image: '/images/poster/prayuddha-2k26-official-poster.png',
      displayOrder: 1,
      date: '2026-09-20',
      isPublished: true,
    },
    {
      id: 'g2',
      title: 'Anna University BIT Campus Main Gate',
      description: 'Welcome view of Anna University UCE BIT Campus Tiruchirappalli.',
      category: 'Venue',
      image: '/images/venue/venue-entrance.png',
      displayOrder: 2,
      date: '2026-09-20',
      isPublished: true,
    },
    {
      id: 'g3',
      title: 'Campus Map & Block Navigation Guide',
      description: 'Location map showing B-Block Auditorium and C-Block Event Labs.',
      category: 'Venue',
      image: '/images/venue/campus-map.png',
      displayOrder: 3,
      date: '2026-09-20',
      isPublished: true,
    },
    {
      id: 'g4',
      title: 'Anna University Official Crest',
      description: 'University seal representing excellence in engineering and technology.',
      category: 'Inauguration',
      image: '/images/branding/anna-university-logo.png',
      displayOrder: 4,
      date: '2026-09-20',
      isPublished: true,
    },
    {
      id: 'g5',
      title: 'PRAYUDDHA Emblem',
      description: 'Official emblem symbolizing ideas, innovation, and impact.',
      category: 'Inauguration',
      image: '/images/branding/prayuddha-logo.png',
      displayOrder: 5,
      date: '2026-09-20',
      isPublished: true,
    },
    {
      id: 'g6',
      title: 'Official WhatsApp Community QR',
      description: 'Scan to join the official PRAYUDDHA 2K26 student WhatsApp group.',
      category: 'Behind the Scenes',
      image: '/images/qr/whatsapp-group-qr.png',
      displayOrder: 6,
      date: '2026-09-20',
      isPublished: true,
    },
  ],

  events: [
    /* Technical Events */
    {
      id: 'pixel2alchemy',
      name: 'PIXEL2ALCHEMY',
      category: 'Technical',
      tagline: 'See it. Think it. Prompt it.',
      description: 'Recreate a reference image as closely as possible using AI image generation through prompt engineering without internet searching.',
      concept: 'Participants will be shown a reference image on the screen. Their challenge is to recreate an image that is as close as possible to the reference using AI image generation through prompt engineering.',
      rules: [
        'Internet browsing / searching will NOT be allowed.',
        'Participants must carefully observe the reference image and craft their prompt by identifying key elements: Subject, Background, Lighting, Colours, Composition, Camera angle, and Visual style.',
        'Participants will use the provided AI image-generation platform to generate their final output.',
      ],
      winnerCriteria: 'The participant whose AI-generated image most closely matches the original reference image will be declared the winner.',
      skillsTested: ['Prompt Engineering', 'Observation', 'AI Knowledge', 'Creativity'],
      teamSize: 'Individual or Team (1–2 members)',
      fee: 'Single Entry Fee',
      duration: '30–45 Mins',
      rounds: 'Single Challenge Round',
      eligibility: 'Open to all college students',
      prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
      firstPrize: '₹1,000',
      secondPrize: '₹500',
      image: 'wand',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: 'websprint',
      name: 'WEBSPRINT',
      category: 'Technical',
      tagline: '40 Minutes. One Idea. Ship It.',
      description: 'Design, build, and publish a complete responsive website within 40 minutes using any AI-powered web builder based on a given theme.',
      concept: 'Participants will be given 40 minutes to design, build and publish a complete website. At the beginning of the event, themes will be provided (e.g. E-Commerce, Portfolio, Tourism, Ticket Booking). Before the timer ends, participants must publish their website and submit the live URL.',
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
      ],
      winnerCriteria: 'The participant/team with the strongest overall website implementation will be selected based on judging criteria.',
      skillsTested: ['AI Tools', 'Web Development', 'UI/UX', 'Creativity', 'Rapid Prototyping'],
      teamSize: 'Individual or Team (1–2 members)',
      fee: 'Single Entry Fee',
      duration: '40 Minutes',
      rounds: 'Single Sprint Round',
      eligibility: 'Open to all college students',
      prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
      firstPrize: '₹1,000',
      secondPrize: '₹500',
      image: 'layout',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: 'trace-x',
      name: 'TRACE-X',
      category: 'Technical',
      tagline: 'Spin. Pick. Code. Conquer.',
      description: 'A two-round code-output prediction challenge testing mental execution and code analysis across C, C++, Python, and HTML.',
      concept: 'TRACE-X is a code-output prediction challenge designed to test how well participants can read, understand and mentally execute code without running it.',
      roundsDetails: [
        'Round 1 — Aptitude Gate: All participants attend a common aptitude round consisting of 10 questions. Qualifying participants advance to Round 2.',
        'Round 2 — Code Output Prediction: Code snippets in C, C++, Python, and HTML. Participants trace execution and select correct outputs without compilers.',
      ],
      rules: [
        'Round 1 consists of 10 aptitude questions; top scorers advance to Round 2.',
        'No program execution or compilers allowed; execution must be traced mentally.',
        'For team participation, members can discuss logic before locking their final answer.',
      ],
      winnerCriteria: 'The participant/team with the highest number of correct answers wins.',
      skillsTested: ['Code Tracing', 'Logical Thinking', 'Programming Fundamentals', 'Debugging Mindset'],
      teamSize: 'Individual or Team (1–2 members)',
      fee: 'Single Entry Fee',
      duration: '1 Hour Total',
      rounds: '2 Rounds (Aptitude Gate + Code Tracing)',
      eligibility: 'Open to all college students',
      prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
      firstPrize: '₹1,000',
      secondPrize: '₹500',
      image: 'terminal',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: 'idea-squash',
      name: 'IDEA SQUASH',
      category: 'Technical',
      tagline: 'Paper Presentation',
      description: 'A national-level paper presentation platform to showcase novel ideas, research findings, and technical innovations.',
      concept: 'Idea Squash is the flagship paper presentation event at PRAYUDDHA 2K26, inviting innovative engineering concepts and technical papers.',
      rules: [
        'Papers must be presented within the allotted time (8-10 mins).',
        'PPT format required. Original engineering concepts and research work preferred.',
        'Judges decision will be final.',
      ],
      skillsTested: ['Paper Presentation', 'Research', 'Technical Communication', 'Innovation'],
      teamSize: 'Team (1–3 members)',
      fee: 'Single Entry Fee',
      duration: '10 Mins per team',
      rounds: 'Paper Submission & Presentation',
      eligibility: 'Open to all college students',
      prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
      firstPrize: '₹1,000',
      secondPrize: '₹500',
      image: 'presentation',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 4,
      isPublished: true,
    },

    /* Non-Technical Events */
    {
      id: 'mind-vault',
      name: 'Mind Vault',
      category: 'Non-Technical',
      description: 'A quiz competition that tests your knowledge across technology, science, current affairs, and logical reasoning. Rapid-fire rounds, buzzer battles, and a final showdown.',
      rules: ['Rapid-fire and buzzer rules will be explained at venue.', 'Mobile phone usage strictly prohibited during rounds.'],
      teamSize: '2 members per team',
      fee: 'Single Entry Fee',
      duration: '45 Mins',
      rounds: '2 Rounds',
      eligibility: 'Open to all college students',
      prizes: 'Exciting Cash Prizes & Certificates',
      firstPrize: 'Exciting Cash Prize / Trophy',
      secondPrize: 'Cash Prize / Gifts',
      image: 'brain',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: 'act-battle',
      name: 'Act Battle',
      category: 'Non-Technical',
      description: 'A stage performance competition where teams act out themes, scenarios, or social messages. Creativity, expression, and teamwork take center stage.',
      rules: ['Time limit: 5-7 minutes per act.', 'No offensive language or vulgar gestures allowed.'],
      teamSize: '2–5 members per team',
      fee: 'Single Entry Fee',
      duration: '1 Hour',
      rounds: 'Stage Performance Round',
      eligibility: 'Open to all college students',
      prizes: 'Prizes & Certificates',
      firstPrize: 'First Prize & Trophy',
      secondPrize: 'Second Prize & Gifts',
      image: 'drama',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: 'treasurer-hunt',
      name: 'Treasurer Hunt / Mission X',
      category: 'Non-Technical',
      description: 'A treasure hunt filled with clues, puzzles, and challenges across the campus. Race against time and rival teams to uncover the hidden treasure.',
      rules: ['Teams must stay together while solving clues.', 'Interfering with other teams will result in disqualification.'],
      teamSize: '2–4 members per team',
      fee: 'Single Entry Fee',
      duration: '1 Hour',
      rounds: 'Campus Hunt Round',
      eligibility: 'Open to all college students',
      prizes: 'Treasure Prize & Certificates',
      firstPrize: 'Grand Treasure Prize',
      secondPrize: 'Runner-up Gifts',
      image: 'compass',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: 'link-o-link',
      name: 'Link-O-Link',
      category: 'Non-Technical',
      description: 'A connection-based game where participants link clues, images, or concepts to find the common thread. Quick thinking and lateral logic win the day.',
      rules: ['Visual connection puzzles across multiple themes.', 'Buzzer round for quick answers.'],
      teamSize: '1–2 members per team',
      fee: 'Single Entry Fee',
      duration: '45 Mins',
      rounds: '2 Connection Rounds',
      eligibility: 'Open to all college students',
      prizes: 'Prizes & Gifts',
      firstPrize: 'First Place Prize',
      secondPrize: 'Second Place Prize',
      image: 'link',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 8,
      isPublished: true,
    },
    {
      id: 'e-sports-free-fire',
      name: 'E-Sports (Free Fire)',
      category: 'Non-Technical',
      description: 'A competitive Free Fire gaming tournament. Form your squad, strategize, and battle through elimination rounds to claim the championship.',
      rules: ['Squad match rules apply. Emulators prohibited.', 'Players must bring their own charged mobile devices.'],
      teamSize: '4 members per squad',
      fee: 'Single Entry Fee',
      duration: 'Custom Match Rounds',
      rounds: 'Qualifiers & Grand Finals',
      eligibility: 'Open to all college students',
      prizes: 'E-Sports Trophy & Cash Prize',
      firstPrize: 'Championship Trophy & Prize',
      secondPrize: 'Runner-up Award',
      image: 'gamepad',
      registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: 'Open',
      displayOrder: 9,
      isPublished: true,
    },
  ],

  team: [
    { id: 'tm-1', name: 'S. Sindhuja', role: 'President', phone: '9884526924', priority: true, displayOrder: 1 },
    { id: 'tm-2', name: 'A. Santhosh', role: 'Vice President', phone: '7603934990', priority: true, displayOrder: 2 },
    { id: 'tm-3', name: 'R. SriRagabharathi', role: 'Overall Coordinator', phone: '9043167020', priority: false, displayOrder: 3 },
    { id: 'tm-4', name: 'M. Lakshana', role: 'Overall Coordinator', phone: '9344848321', priority: false, displayOrder: 4 },
    { id: 'tm-5', name: 'H. Karthikeyan', role: 'Overall Coordinator', phone: '6385902910', priority: false, displayOrder: 5 },
    { id: 'tm-6', name: 'A. Maryshalini', role: 'Secretary', phone: '9600599356', priority: false, displayOrder: 6 },
    { id: 'tm-7', name: 'J. Pavithra', role: 'Joint Secretary', phone: '6379854556', priority: false, displayOrder: 7 },
    { id: 'tm-8', name: 'V. Sivasankar', role: 'Student Coordinator', phone: '8637616928', priority: false, displayOrder: 8 },
  ],

  contact: {
    email: 'prayuddha2k26@gmail.com',
    phone1: '9884526924',
    phone2: '7603934990',
    whatsappUrl: 'https://chat.whatsapp.com/EWYDbkcT7US2GPasizlxlT',
    instagramUrl: 'https://instagram.com/prayuddha2k26',
    address: 'University College of Engineering (BIT) Campus, Anna University, Tiruchirappalli – 620024',
  },

  travel: {
    venueName: 'Dr. A.P.J. Abdul Kalam Auditorium, B-Block',
    bBlockInfo: 'Inauguration Ceremony & Prize Distribution (Valedictory)',
    cBlockInfo: 'All Technical & Non-Technical Event Competitions',
    trichyRouteInfo: 'Board bus at Trichy Central Bus Stand or Chathiram Bus Stand on Pudukkottai/Keeranur route. Get down directly at Anna University / BIT Campus stop.',
    keeranurRouteInfo: 'Board bus at Keeranur Bus Stop taking Trichy direction / BIT Campus route. Get down directly at Anna University / BIT Campus stop.',
    fareEstimate: '₹15 – ₹30 depending on starting point',
    googleMapsUrl: 'https://www.google.com/maps/place/Anna+University+RO+Tiruchirappalli/@10.6581513,78.7423525,17z',
  },

  schedule: [
    { id: 'sch-1', time: '8:00 AM – 8:45 AM', programme: 'Assembly & On-Spot Verification', venue: 'Main Entrance & B-Block', displayOrder: 1 },
    { id: 'sch-2', time: '9:00 AM – 10:30 AM', programme: 'Grand Inauguration Ceremony', venue: 'Dr. A.P.J. Abdul Kalam Auditorium (B-Block)', displayOrder: 2 },
    { id: 'sch-3', time: '10:45 AM – 11:00 AM', programme: 'Banner Launch & Photo Session', venue: 'C-Block Lawn', displayOrder: 3 },
    { id: 'sch-4', time: '11:00 AM – 1:00 PM', programme: 'Technical & Non-Technical Events (Round 1)', venue: 'C-Block Event Labs & Halls', displayOrder: 4 },
    { id: 'sch-5', time: '1:00 PM – 2:00 PM', programme: 'Lunch Break (Veg & Non-Veg Biryani)', venue: 'Dining Area', isBreak: true, displayOrder: 5 },
    { id: 'sch-6', time: '2:00 PM – 3:45 PM', programme: 'Final Challenge Rounds & Finals', venue: 'C-Block Event Halls', displayOrder: 6 },
    { id: 'sch-7', time: '4:00 PM – 4:45 PM', programme: 'Prize Distribution & Valedictory Ceremony', venue: 'B-Block Auditorium', displayOrder: 7 },
    { id: 'sch-8', time: '4:45 PM onwards', programme: 'End of PRAYUDDHA 2K26', venue: 'BIT Campus', isEnd: true, displayOrder: 8 },
  ],

  prizes: {
    techFirst: '₹1,000 Cash Prize + Certificate & Trophy',
    techSecond: '₹500 Cash Prize + Certificate',
    nonTechFirst: 'Exciting Cash Prize / Trophy & Certificate',
    nonTechSecond: 'Runner-up Gift & Certificate',
    overallChampion: 'Overall Championship Trophy & Winner Medals',
  },

  rules: [
    {
      id: 'rule-gen',
      category: 'General Rules',
      icon: 'info',
      rules: [
        'PRAYUDDHA 2K26 is organized by the Department of IT & Department of AI & ML.',
        'Participants must follow the instructions given by the event coordinators.',
        'Participants are expected to maintain discipline throughout the symposium.',
        'Participants must carry their valid college ID card.',
        'Reporting time: 8:45 AM at BIT Campus.',
        'The decision of event coordinators and judges is final and binding.',
      ],
    },
    {
      id: 'rule-reg',
      category: 'Registration Rules',
      icon: 'user-plus',
      rules: [
        'Registration is completed via the official Google Form.',
        'Provide accurate contact numbers and email address.',
        'Single entry fee of ₹299 covers full symposium entry & Biryani lunch.',
        'Keep your payment transaction ID / screenshot ready.',
      ],
    },
    {
      id: 'rule-pay',
      category: 'Payment Guidelines',
      icon: 'credit-card',
      rules: [
        'Payment of ₹299 via Google Pay / PhonePe / UPI to 9751600742.',
        'Mention participant name in UPI transaction notes if possible.',
        'Retain transaction ID for verification at registration desk.',
      ],
    },
    {
      id: 'rule-dress',
      category: 'Dress Code & ID Cards',
      icon: 'shirt',
      rules: [
        'Formal or smart-casual attire recommended.',
        'College ID card mandatory for entry and verification.',
        'Maintain neat appearance.',
      ],
    },
  ],

  lastUpdated: Date.now(),
};

class CMSService {
  private state: CMSState;

  constructor() {
    this.state = this.loadFromStorage();
    // Also trigger asynchronous Supabase sync if available
    this.syncWithSupabase();
  }

  private loadFromStorage(): CMSState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Auto-fix stale image URLs stored in browser localStorage to use canonical paths
        if (parsed.poster && (parsed.poster.posterUrl.includes('prayuddha-poster') || !parsed.poster.posterUrl)) {
          parsed.poster.posterUrl = '/images/poster/prayuddha-2k26-official-poster.png';
        }
        if (parsed.brochure && (parsed.brochure.page1Url.includes('brochure-page1') || !parsed.brochure.page1Url)) {
          parsed.brochure.page1Url = '/images/brochure/brochure-page-1.png';
        }
        if (parsed.brochure && (parsed.brochure.page2Url.includes('brochure-page2') || !parsed.brochure.page2Url)) {
          parsed.brochure.page2Url = '/images/brochure/brochure-page-2.png';
        }
        if (parsed.siteConfig && (parsed.siteConfig.qrCodeUrl.includes('google-form-qr') || !parsed.siteConfig.qrCodeUrl)) {
          parsed.siteConfig.qrCodeUrl = '/images/qr/registration-google-form-qr.png';
        }
        if (parsed.gallery) {
          parsed.gallery = parsed.gallery.map((g: any) => {
            if (g.image === '/images/prayuddha-poster.png') g.image = '/images/poster/prayuddha-2k26-official-poster.png';
            if (g.image === '/images/campus-entrance.jpeg') g.image = '/images/venue/venue-entrance.png';
            if (g.image === '/images/campus-map.png') g.image = '/images/venue/campus-map.png';
            if (g.image === '/images/anna-university-logo.png') g.image = '/images/branding/anna-university-logo.png';
            if (g.image === '/images/prayuddha-logo.png') g.image = '/images/branding/prayuddha-logo.png';
            if (g.image === '/images/whatsapp-qr.jpg' || g.image === '/images/google-form-qr.png') g.image = '/images/qr/whatsapp-group-qr.png';
            return g;
          });
        }
        return { ...INITIAL_CMS_STATE, ...parsed };
      }
    } catch (err) {
      console.warn('Failed to parse CMS storage:', err);
    }
    return INITIAL_CMS_STATE;
  }

  private saveToStorage(newState: CMSState): void {
    this.state = { ...newState, lastUpdated: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
    this.notifyListeners();
  }

  private notifyListeners(): void {
    window.dispatchEvent(new CustomEvent(CMS_EVENT_NAME, { detail: this.state }));
  }

  public getState(): CMSState {
    return { ...this.state };
  }

  public resetToDefault(): void {
    this.saveToStorage(INITIAL_CMS_STATE);
  }

  // Sync state with Supabase tables if configured
  public async syncWithSupabase(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      // Fetch site config
      const { data: siteData } = await supabase.from('site_config').select('*').single();
      if (siteData) {
        this.state.siteConfig = {
          ...this.state.siteConfig,
          googleFormUrl: siteData.google_form_url || this.state.siteConfig.googleFormUrl,
          registrationStatus: siteData.registration_status || this.state.siteConfig.registrationStatus,
          registrationBtnText: siteData.registration_btn_text || this.state.siteConfig.registrationBtnText,
          registrationFee: siteData.registration_fee || this.state.siteConfig.registrationFee,
          upiPhone: siteData.upi_phone || this.state.siteConfig.upiPhone,
          qrCodeUrl: siteData.qr_code_url || this.state.siteConfig.qrCodeUrl,
          eventDate: siteData.event_date || this.state.siteConfig.eventDate,
          venue: siteData.venue || this.state.siteConfig.venue,
        };
      }

      // Fetch announcements
      const { data: annData } = await supabase.from('announcements').select('*').order('priority', { ascending: true });
      if (annData && annData.length > 0) {
        this.state.announcements = annData.map((a) => ({
          id: a.id,
          title: a.title,
          content: a.content,
          type: a.type,
          priority: a.priority,
          isPublished: a.is_published,
          date: a.created_at ? a.created_at.split('T')[0] : '2026-09-26',
        }));
      }

      // Fetch poster
      const { data: posterData } = await supabase.from('poster').select('*').single();
      if (posterData) {
        this.state.poster = {
          posterUrl: posterData.poster_url || this.state.poster.posterUrl,
          caption: posterData.caption || this.state.poster.caption,
          isPublished: posterData.is_published ?? true,
          lastUpdated: posterData.updated_at || new Date().toISOString(),
        };
      }

      // Fetch brochure
      const { data: brochureData } = await supabase.from('brochure').select('*').single();
      if (brochureData) {
        this.state.brochure = {
          page1Url: brochureData.page1_url || this.state.brochure.page1Url,
          page2Url: brochureData.page2_url || this.state.brochure.page2Url,
          title: brochureData.title || this.state.brochure.title,
          isPublished: brochureData.is_published ?? true,
          lastUpdated: brochureData.updated_at || new Date().toISOString(),
        };
      }

      // Fetch gallery
      const { data: galleryData } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
      if (galleryData && galleryData.length > 0) {
        this.state.gallery = galleryData.map((g) => ({
          id: g.id,
          title: g.title,
          description: g.description || '',
          category: g.category,
          image: g.image_url,
          displayOrder: g.display_order,
          date: g.date || '',
          isPublished: g.is_published ?? true,
        }));
      }

      // Fetch events
      const { data: eventsData } = await supabase.from('events').select('*').order('display_order', { ascending: true });
      if (eventsData && eventsData.length > 0) {
        this.state.events = eventsData.map((e) => ({
          id: e.id,
          name: e.name,
          category: e.category,
          tagline: e.tagline || '',
          description: e.description,
          concept: e.concept || '',
          rules: e.rules || [],
          roundsDetails: e.rounds_details || [],
          evaluationCriteria: e.evaluation_criteria || [],
          winnerCriteria: e.winner_criteria || '',
          skillsTested: e.skills_tested || [],
          teamSize: e.team_size,
          fee: e.fee,
          duration: e.duration,
          rounds: e.rounds,
          eligibility: e.eligibility,
          prizes: e.prizes,
          firstPrize: e.first_prize || '',
          secondPrize: e.second_prize || '',
          image: e.image || 'code',
          registrationLink: e.registration_link || '',
          status: e.status,
          displayOrder: e.display_order,
          isPublished: e.is_published ?? true,
        }));
      }

      // Fetch team
      const { data: teamData } = await supabase.from('team').select('*').order('display_order', { ascending: true });
      if (teamData && teamData.length > 0) {
        this.state.team = teamData.map((t) => ({
          id: t.id,
          name: t.name,
          initial: t.initial || '',
          role: t.role,
          phone: t.phone || '',
          photo: t.photo_url || '',
          priority: t.priority ?? false,
          displayOrder: t.display_order,
        }));
      }

      // Fetch contact config
      const { data: contactData } = await supabase.from('contact_config').select('*').single();
      if (contactData) {
        this.state.contact = {
          email: contactData.email || this.state.contact.email,
          phone1: contactData.phone1 || this.state.contact.phone1,
          phone2: contactData.phone2 || this.state.contact.phone2,
          whatsappUrl: contactData.whatsapp_url || this.state.contact.whatsappUrl,
          instagramUrl: contactData.instagram_handle || this.state.contact.instagramUrl,
          address: contactData.address || this.state.contact.address,
        };
      }

      // Fetch travel routes
      const { data: travelData } = await supabase.from('travel_routes').select('*').single();
      if (travelData) {
        this.state.travel = {
          venueName: travelData.venue_name || this.state.travel.venueName,
          bBlockInfo: travelData.b_block_info || this.state.travel.bBlockInfo,
          cBlockInfo: travelData.c_block_info || this.state.travel.cBlockInfo,
          trichyRouteInfo: travelData.trichy_route_info || this.state.travel.trichyRouteInfo,
          keeranurRouteInfo: travelData.keeranur_route_info || this.state.travel.keeranurRouteInfo,
          fareEstimate: travelData.fare_estimate || this.state.travel.fareEstimate,
          googleMapsUrl: travelData.google_maps_url || this.state.travel.googleMapsUrl,
        };
      }

      // Fetch schedule
      const { data: scheduleData } = await supabase.from('schedule').select('*').order('display_order', { ascending: true });
      if (scheduleData && scheduleData.length > 0) {
        this.state.schedule = scheduleData.map((s) => ({
          id: s.id,
          time: s.time_range,
          programme: s.programme,
          venue: s.venue || 'BIT Campus',
          isBreak: s.is_break ?? false,
          isEnd: s.is_end ?? false,
          displayOrder: s.display_order,
        }));
      }

      // Fetch prizes
      const { data: prizesData } = await supabase.from('prizes').select('*').single();
      if (prizesData) {
        this.state.prizes = {
          techFirst: prizesData.tech_first || this.state.prizes.techFirst,
          techSecond: prizesData.tech_second || this.state.prizes.techSecond,
          nonTechFirst: prizesData.non_tech_first || this.state.prizes.nonTechFirst,
          nonTechSecond: prizesData.non_tech_second || this.state.prizes.nonTechSecond,
          overallChampion: prizesData.overall_championship || this.state.prizes.overallChampion,
        };
      }

      // Save merged remote state locally
      this.saveToStorage(this.state);
    } catch (err) {
      console.warn('Supabase fetch error, using local cached data:', err);
    }
  }

  /* ================= CRUD HELPERS ================= */

  public updateSiteConfig(config: Partial<SiteConfigData>): void {
    const updated = { ...this.state.siteConfig, ...config };
    this.saveToStorage({ ...this.state, siteConfig: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('site_config').upsert({
        id: 'default',
        google_form_url: updated.googleFormUrl,
        registration_status: updated.registrationStatus,
        registration_btn_text: updated.registrationBtnText,
        registration_fee: updated.registrationFee,
        upi_phone: updated.upiPhone,
        qr_code_url: updated.qrCodeUrl,
        event_date: updated.eventDate,
        venue: updated.venue,
        updated_at: new Date().toISOString(),
      }).then();
    }
  }

  public saveAnnouncement(ann: AnnouncementData): void {
    const exists = this.state.announcements.some((a) => a.id === ann.id);
    const updatedAnnouncements = exists
      ? this.state.announcements.map((a) => (a.id === ann.id ? ann : a))
      : [ann, ...this.state.announcements];

    this.saveToStorage({ ...this.state, announcements: updatedAnnouncements });

    if (isSupabaseConfigured && supabase) {
      supabase.from('announcements').upsert({
        id: ann.id.includes('-') ? undefined : ann.id,
        title: ann.title,
        content: ann.content,
        type: ann.type,
        priority: ann.priority,
        is_published: ann.isPublished,
      }).then();
    }
  }

  public deleteAnnouncement(id: string): void {
    const updatedAnnouncements = this.state.announcements.filter((a) => a.id !== id);
    this.saveToStorage({ ...this.state, announcements: updatedAnnouncements });

    if (isSupabaseConfigured && supabase) {
      supabase.from('announcements').delete().eq('id', id).then();
    }
  }

  public saveGalleryPhoto(photo: GalleryItemData): void {
    const exists = this.state.gallery.some((g) => g.id === photo.id);
    const updatedGallery = exists
      ? this.state.gallery.map((g) => (g.id === photo.id ? photo : g))
      : [...this.state.gallery, photo];

    this.saveToStorage({ ...this.state, gallery: updatedGallery });

    if (isSupabaseConfigured && supabase) {
      supabase.from('gallery').upsert({
        title: photo.title,
        description: photo.description,
        category: photo.category,
        image_url: photo.image,
        display_order: photo.displayOrder,
        is_published: photo.isPublished,
        date: photo.date,
      }).then();
    }
  }

  public deleteGalleryPhoto(id: string): void {
    const updatedGallery = this.state.gallery.filter((g) => g.id !== id);
    this.saveToStorage({ ...this.state, gallery: updatedGallery });

    if (isSupabaseConfigured && supabase) {
      supabase.from('gallery').delete().eq('id', id).then();
    }
  }

  public savePoster(poster: Partial<PosterData>): void {
    const updated = { ...this.state.poster, ...poster, lastUpdated: new Date().toISOString() };
    this.saveToStorage({ ...this.state, poster: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('poster').upsert({
        id: 'default',
        poster_url: updated.posterUrl,
        caption: updated.caption,
        is_published: updated.isPublished,
        updated_at: updated.lastUpdated,
      }).then();
    }
  }

  public saveBrochure(brochure: Partial<BrochureData>): void {
    const updated = { ...this.state.brochure, ...brochure, lastUpdated: new Date().toISOString() };
    this.saveToStorage({ ...this.state, brochure: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('brochure').upsert({
        id: 'default',
        page1_url: updated.page1Url,
        page2_url: updated.page2Url,
        title: updated.title,
        is_published: updated.isPublished,
        updated_at: updated.lastUpdated,
      }).then();
    }
  }

  public saveEvent(event: EventItemData): void {
    const exists = this.state.events.some((e) => e.id === event.id);
    const updatedEvents = exists
      ? this.state.events.map((e) => (e.id === event.id ? event : e))
      : [...this.state.events, event];

    this.saveToStorage({ ...this.state, events: updatedEvents });

    if (isSupabaseConfigured && supabase) {
      supabase.from('events').upsert({
        id: event.id,
        name: event.name,
        category: event.category,
        tagline: event.tagline,
        description: event.description,
        concept: event.concept,
        rules: event.rules,
        rounds_details: event.roundsDetails,
        evaluation_criteria: event.evaluationCriteria,
        winner_criteria: event.winnerCriteria,
        skills_tested: event.skillsTested,
        team_size: event.teamSize,
        fee: event.fee,
        duration: event.duration,
        rounds: event.rounds,
        eligibility: event.eligibility,
        prizes: event.prizes,
        first_prize: event.firstPrize,
        second_prize: event.secondPrize,
        image: event.image,
        registration_link: event.registrationLink,
        status: event.status,
        display_order: event.displayOrder,
        is_published: event.isPublished,
      }).then();
    }
  }

  public deleteEvent(id: string): void {
    const updatedEvents = this.state.events.filter((e) => e.id !== id);
    this.saveToStorage({ ...this.state, events: updatedEvents });

    if (isSupabaseConfigured && supabase) {
      supabase.from('events').delete().eq('id', id).then();
    }
  }

  public saveTeamMember(member: TeamMemberData): void {
    const exists = this.state.team.some((m) => m.id === member.id);
    const updatedTeam = exists
      ? this.state.team.map((m) => (m.id === member.id ? member : m))
      : [...this.state.team, member];

    this.saveToStorage({ ...this.state, team: updatedTeam });

    if (isSupabaseConfigured && supabase) {
      supabase.from('team').upsert({
        name: member.name,
        initial: member.initial,
        role: member.role,
        phone: member.phone,
        photo_url: member.photo,
        priority: member.priority,
        display_order: member.displayOrder,
      }).then();
    }
  }

  public deleteTeamMember(id: string): void {
    const updatedTeam = this.state.team.filter((m) => m.id !== id);
    this.saveToStorage({ ...this.state, team: updatedTeam });

    if (isSupabaseConfigured && supabase) {
      supabase.from('team').delete().eq('id', id).then();
    }
  }

  public updateContactConfig(contact: Partial<ContactConfigData>): void {
    const updated = { ...this.state.contact, ...contact };
    this.saveToStorage({ ...this.state, contact: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('contact_config').upsert({
        id: 'default',
        email: updated.email,
        phone1: updated.phone1,
        phone2: updated.phone2,
        whatsapp_url: updated.whatsappUrl,
        instagram_handle: updated.instagramUrl,
        address: updated.address,
        updated_at: new Date().toISOString(),
      }).then();
    }
  }

  public updateTravelRoute(travel: Partial<TravelRouteData>): void {
    const updated = { ...this.state.travel, ...travel };
    this.saveToStorage({ ...this.state, travel: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('travel_routes').upsert({
        id: 'default',
        venue_name: updated.venueName,
        b_block_info: updated.bBlockInfo,
        c_block_info: updated.cBlockInfo,
        trichy_route_info: updated.trichyRouteInfo,
        keeranur_route_info: updated.keeranurRouteInfo,
        fare_estimate: updated.fareEstimate,
        google_maps_url: updated.googleMapsUrl,
        updated_at: new Date().toISOString(),
      }).then();
    }
  }

  public saveScheduleItem(item: ScheduleItemData): void {
    const exists = this.state.schedule.some((s) => s.id === item.id);
    const updatedSchedule = exists
      ? this.state.schedule.map((s) => (s.id === item.id ? item : s))
      : [...this.state.schedule, item];

    this.saveToStorage({ ...this.state, schedule: updatedSchedule });

    if (isSupabaseConfigured && supabase) {
      supabase.from('schedule').upsert({
        time_range: item.time,
        programme: item.programme,
        venue: item.venue,
        is_break: item.isBreak,
        is_end: item.isEnd,
        display_order: item.displayOrder,
      }).then();
    }
  }

  public deleteScheduleItem(id: string): void {
    const updatedSchedule = this.state.schedule.filter((s) => s.id !== id);
    this.saveToStorage({ ...this.state, schedule: updatedSchedule });

    if (isSupabaseConfigured && supabase) {
      supabase.from('schedule').delete().eq('id', id).then();
    }
  }

  public updatePrizes(prizes: Partial<PrizesData>): void {
    const updated = { ...this.state.prizes, ...prizes };
    this.saveToStorage({ ...this.state, prizes: updated });

    if (isSupabaseConfigured && supabase) {
      supabase.from('prizes').upsert({
        id: 'default',
        tech_first: updated.techFirst,
        tech_second: updated.techSecond,
        non_tech_first: updated.nonTechFirst,
        non_tech_second: updated.nonTechSecond,
        overall_championship: updated.overallChampion,
        updated_at: new Date().toISOString(),
      }).then();
    }
  }

  public saveRules(ruleCategory: RuleCategoryData): void {
    const exists = this.state.rules.some((r) => r.id === ruleCategory.id);
    const updatedRules = exists
      ? this.state.rules.map((r) => (r.id === ruleCategory.id ? ruleCategory : r))
      : [...this.state.rules, ruleCategory];

    this.saveToStorage({ ...this.state, rules: updatedRules });
  }
}

export const cmsService = new CMSService();
