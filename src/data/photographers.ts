export interface Photographer {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  projectsCompleted: number;
  experience: number;
  responseRate: number;
  responseTime: string;
  availableForBookings: boolean;
  verified: boolean;
  languages: string[];
  equipment: string;
  image: string;
  about: string;
  specialties: string[];
  hourlyRate: string;
  availability: string;
  description: string;
  portfolioItems: {
    id: number;
    category: string;
    image: string;
  }[];
  clientReviews: {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export const photographers: Photographer[] = [
  {
    id: '1',
    name: 'Lily Emily',
    location: 'New York City, USA',
    rating: 4.9,
    reviews: 127,
    projectsCompleted: 234,
    experience: 8,
    responseRate: 99,
    responseTime: '2h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'Vietnamese'],
    equipment: 'Canon R5, Professional Lighting Setup',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Award-winning photographer specializing in weddings and portraits. With over 8 years of experience, I create timeless images that tell your unique story through a modern lens. Based in New York City, I work with both natural and studio lighting.',
    specialties: ['Wedding Photography', 'Portrait Photography', 'Fashion Photography'],
    hourlyRate: '$5/hour',
    availability: 'Available Now',
    description: 'Award-winning photographer specializing in weddings and portraits. Based in New York City.',
    portfolioItems: [
      { id: 1, category: 'wedding', image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'portrait', image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'fashion', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'wedding', image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 5, category: 'portrait', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 6, category: 'fashion', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'John Doe',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing photographer! Captured our wedding day perfectly. Very professional and easy to work with.',
      },
      {
        id: 2,
        name: 'Jane Smith',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Incredible portrait session! Lily made us feel comfortable and the results were stunning.',
      },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 96,
    projectsCompleted: 189,
    experience: 6,
    responseRate: 95,
    responseTime: '3h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'Chinese'],
    equipment: 'Sony A7R IV, Professional Studio Equipment',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Creative commercial photographer with 6+ years of experience. I specialize in commercial and event photography, bringing creativity and professionalism to every project. Available nationwide for assignments.',
    specialties: ['Commercial Photography', 'Event Photography', 'Product Photography'],
    hourlyRate: '$8/hour',
    availability: 'Available Tomorrow',
    description: 'Creative commercial photographer with 6+ years of experience. Available nationwide.',
    portfolioItems: [
      { id: 1, category: 'commercial', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'event', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'commercial', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'event', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 5, category: 'commercial', image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'Sarah Wilson',
        rating: 5,
        date: '1 week ago',
        comment: 'Michael did an excellent job with our corporate event. Professional and delivered high-quality photos.',
      },
      {
        id: 2,
        name: 'David Park',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great commercial photographer. Very creative and understood our brand vision perfectly.',
      },
    ],
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Los Angeles, CA',
    rating: 4.7,
    reviews: 84,
    projectsCompleted: 156,
    experience: 5,
    responseRate: 92,
    responseTime: '4h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'Spanish'],
    equipment: 'Nikon D850, Fashion Photography Equipment',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Fashion and portrait photographer based in Los Angeles. With 5 years of experience, I specialize in creating stunning fashion editorials and captivating portraits that showcase individual style and personality.',
    specialties: ['Portrait Photography', 'Fashion Photography', 'Editorial Photography'],
    hourlyRate: '$9/hour',
    availability: 'Available Next Week',
    description: 'Specializing in portrait and fashion photography. Based in Los Angeles.',
    portfolioItems: [
      { id: 1, category: 'fashion', image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'portrait', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'fashion', image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'portrait', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'Maria Garcia',
        rating: 5,
        date: '3 days ago',
        comment: 'Emma is incredibly talented! My fashion shoot turned out amazing. Highly recommend!',
      },
      {
        id: 2,
        name: 'Alex Johnson',
        rating: 4,
        date: '1 week ago',
        comment: 'Great portrait session. Emma has a great eye for detail and made me feel comfortable.',
      },
    ],
  },
  {
    id: '4',
    name: 'David Kim',
    location: 'Las Vegas, NV',
    rating: 4.9,
    reviews: 156,
    projectsCompleted: 278,
    experience: 10,
    responseRate: 98,
    responseTime: '1h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'Korean'],
    equipment: 'Canon 5D Mark IV, Wedding Photography Kit',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Experienced wedding and event photographer with 10 years in the industry. Based in Las Vegas, I capture the magic of your special moments with a blend of traditional and contemporary styles.',
    specialties: ['Wedding Photography', 'Event Photography', 'Couple Photography'],
    hourlyRate: '$7/hour',
    availability: 'Available Now',
    description: 'Experienced wedding and event photographer. Based in Las Vegas.',
    portfolioItems: [
      { id: 1, category: 'wedding', image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'event', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'wedding', image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'event', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'Jennifer Lee',
        rating: 5,
        date: '5 days ago',
        comment: 'David captured our wedding beautifully! Every moment was perfect. Thank you!',
      },
      {
        id: 2,
        name: 'Robert Chen',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing event photographer. Very professional and the photos exceeded our expectations.',
      },
    ],
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    location: 'Singapore',
    rating: 4.8,
    reviews: 112,
    projectsCompleted: 198,
    experience: 7,
    responseRate: 96,
    responseTime: '2h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'Mandarin'],
    equipment: 'Fujifilm X-T4, Natural Light Equipment',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Family and portrait photographer with a passion for natural light photography. With 7 years of experience, I specialize in capturing authentic family moments and beautiful portraits in natural settings.',
    specialties: ['Portrait Photography', 'Family Photography', 'Children Photography'],
    hourlyRate: '$3/hour',
    availability: 'Available Tomorrow',
    description: 'Family and portrait photographer with a passion for natural light.',
    portfolioItems: [
      { id: 1, category: 'portrait', image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'family', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'portrait', image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'family', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'Amanda Wong',
        rating: 5,
        date: '1 week ago',
        comment: 'Lisa is wonderful with children! Our family photos turned out perfect.',
      },
      {
        id: 2,
        name: 'Michael Tan',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great portrait photographer. Very patient and professional.',
      },
    ],
  },
  {
    id: '6',
    name: 'James Wilson',
    location: 'Berlin, Germany',
    rating: 4.7,
    reviews: 92,
    projectsCompleted: 145,
    experience: 6,
    responseRate: 94,
    responseTime: '3h',
    availableForBookings: true,
    verified: true,
    languages: ['English', 'German'],
    equipment: 'Canon EOS R6, Product Photography Setup',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    about: 'Commercial and product photographer based in Berlin. With 6 years of experience, I help brands showcase their products through compelling visual storytelling and high-quality commercial photography.',
    specialties: ['Commercial Photography', 'Product Photography', 'Brand Photography'],
    hourlyRate: '$5/hour',
    availability: 'Available Next Week',
    description: 'Commercial and product photographer based in Berlin.',
    portfolioItems: [
      { id: 1, category: 'commercial', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 2, category: 'product', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 3, category: 'commercial', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
      { id: 4, category: 'product', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    ],
    clientReviews: [
      {
        id: 1,
        name: 'Klaus Mueller',
        rating: 5,
        date: '4 days ago',
        comment: 'James did excellent work for our product catalog. Very professional and creative.',
      },
      {
        id: 2,
        name: 'Anna Schmidt',
        rating: 4,
        date: '1 week ago',
        comment: 'Great commercial photographer. Understood our brand perfectly.',
      },
    ],
  },
];

export const getPhotographerById = (id: string): Photographer | undefined => {
  return photographers.find(photographer => photographer.id === id);
};

export const getAllPhotographers = (): Photographer[] => {
  return photographers;
};