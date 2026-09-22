export interface CommitteeMember {
  name: string;
  role: string;
  phone?: string;
  priority?: boolean;
}

export interface Team {
  name: string;
  members: string[];
  icon: string;
}

export const coreCommittee: CommitteeMember[] = [
  { name: 'S. Sindhuja', role: 'President', phone: '9884526924', priority: true },
  { name: 'A. Santhosh', role: 'Vice President', phone: '7603934990', priority: true },
  { name: 'A. Maryshalini', role: 'Secretary', phone: '9600599356' },
  { name: 'J. Pavithra', role: 'Joint Secretary', phone: '637985456' },
  { name: 'V. Sivasankar', role: 'Student Coordinator', phone: '8637616928' },
  { name: 'R. SriRagabharathi', role: 'Overall Coordinator', phone: '90431 67020' },
  { name: 'L. Lakshana', role: 'Overall Coordinator', phone: '93448 48321' },
  { name: 'K. Karthikeyan', role: 'Overall Coordinator', phone: '63859 02910' },
];

export const organizingTeams: Team[] = [];
