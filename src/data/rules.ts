export interface RuleCategory {
  category: string;
  icon: string;
  rules: string[];
}

export const ruleCategories: RuleCategory[] = [
  {
    category: 'General Rules',
    icon: 'info',
    rules: [
      'PRAYUDDHA 2K26 is a technical and non-technical symposium organized by the Departments of Information Technology and AI&ML.',
      'Participants must follow the instructions given by the event coordinators and organizing team.',
      'Participants are expected to maintain discipline and proper conduct throughout the event.',
      'Participants must carry their valid college ID card.',
      'Participants must report to the venue on time.',
      'The decision of the respective event coordinators and judges will be considered final.',
    ],
  },

  {
    category: 'Registration Rules',
    icon: 'user-plus',
    rules: [
      'Participants must complete the registration process before participating in an event.',
      'Participants must provide correct and valid details during registration.',
      'Participants should select the correct event while registering.',
      'Participants must follow the team-size requirements specified for their respective event.',
      'Registration-related instructions will be provided by the organizing team.',
    ],
  },

  {
    category: 'Event Rules',
    icon: 'list-checks',
    rules: [
      'Each event will be conducted according to its respective event guidelines.',
      'Participants must follow the instructions given by the event coordinators.',
      'Participants must complete each round within the specified time.',
      'Any form of unfair practice or misconduct may lead to disqualification.',
      'Event-specific rules and detailed guidelines will be announced by the respective coordinators.',
    ],
  },

  {
    category: 'Payment Guidelines',
    icon: 'credit-card',
    rules: [
      'Payment details, if applicable, will be communicated through the official registration process.',
      'Participants must retain valid payment or transaction details when required.',
      'Do not share passwords, PINs, OTPs or other confidential banking credentials.',
      'Further payment instructions will be updated by the organizing team.',
    ],
  },

  {
    category: 'Reporting Time',
    icon: 'clock',
    rules: [
      'Participants must report by 8:45 AM.',
      'The inauguration ceremony begins at 9:00 AM.',
      'Latecomers may not be allowed to participate in their scheduled event.',
      'Participants should complete registration and reporting formalities before their event begins.',
    ],
  },

  {
    category: 'Dress Code',
    icon: 'shirt',
    rules: [
      'Formal or smart-casual attire is recommended.',
      'Participants must wear their college ID card.',
      'Participants are expected to maintain a neat and appropriate appearance throughout the event.',
    ],
  },

  {
    category: 'ID Card Requirements',
    icon: 'id-card',
    rules: [
      'A valid college ID card is mandatory for all participants.',
      'The ID card must be presented at the registration desk when requested.',
      'Participants may be required to show their ID card during event verification.',
    ],
  },

  {
    category: 'Cancellation Policy',
    icon: 'x-circle',
    rules: [
      'Cancellation and refund policies, if applicable, will be announced by the organizing team.',
      'Participants should contact the organizing team for cancellation-related queries.',
      'Any changes to registration status will be communicated through the official channels.',
    ],
  },

  {
    category: 'Contact Guidelines',
    icon: 'phone',
    rules: [
      'Contact the core committee or respective event coordinators for event-related queries.',
      'Use the official contact numbers provided in the Contact section.',
      'Participants should follow official PRAYUDDHA 2K26 communication channels for updates.',
      'Avoid relying on unofficial information regarding event timings, rules or registration.',
    ],
  },
];