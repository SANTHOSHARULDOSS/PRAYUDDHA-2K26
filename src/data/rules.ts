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
      'Rules will be updated soon.',
    ],
  },
  {
    category: 'Registration Rules',
    icon: 'user-plus',
    rules: [
      'Rules will be updated soon.',
    ],
  },
  {
    category: 'Event Rules',
    icon: 'list-checks',
    rules: [
      'Rules will be updated soon.',
    ],
  },
  {
    category: 'Payment Guidelines',
    icon: 'credit-card',
    rules: [
      'Rules will be updated soon.',
    ],
  },
  {
    category: 'Reporting Time',
    icon: 'clock',
    rules: [
      'Participants must report by 8:00 AM.',
      'Latecomers may not be allowed to participate.',
    ],
  },
  {
    category: 'Dress Code',
    icon: 'shirt',
    rules: [
      'Formal or smart-casual attire is recommended.',
      'College ID card is mandatory.',
    ],
  },
  {
    category: 'ID Card Requirements',
    icon: 'id-card',
    rules: [
      'Valid college ID card is mandatory for all participants.',
      'ID card must be presented at the registration desk.',
    ],
  },
  {
    category: 'Cancellation Policy',
    icon: 'x-circle',
    rules: [
      'Rules will be updated soon.',
    ],
  },
  {
    category: 'Contact Guidelines',
    icon: 'phone',
    rules: [
      'Contact the core committee for any queries.',
      'Use the phone numbers provided in the Contact section.',
    ],
  },
];
