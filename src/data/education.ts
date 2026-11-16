export interface Degree {
  degree: string;
  school: string;
  place: string;
  dates: string;
  note: string;
}

export const education: Degree[] = [
  {
    degree: 'MSc Computer Science (Negotiated Learning)',
    school: 'University College Dublin',
    place: 'Dublin, Ireland',
    dates: 'Sep 2026 – Sep 2027 (expected)',
    note: 'Coursework includes machine learning, text analytics, data mining and human-centred AI design.',
  },
  {
    degree: 'B.E. Computer Science and Engineering',
    school: 'Sri Krishna College of Engineering and Technology',
    place: 'India',
    dates: '2018 – 2022',
    note: 'CGPA 9.06 / 10.',
  },
];
