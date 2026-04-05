export interface MockUser {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  plants: { name: string; emoji: string }[];
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "Ana Paula",
    avatar: "👩‍🌾",
    bio: "Apaixonada por monsteras e tropicais 🌿",
    followers: 234,
    following: 89,
    isFollowing: false,
    plants: [
      { name: "Monstera", emoji: "🪴" },
      { name: "Filodendro", emoji: "🌿" },
      { name: "Antúrio", emoji: "🌺" },
    ],
  },
  {
    id: "u2",
    name: "Pedro Santos",
    avatar: "🧑‍🌾",
    bio: "Horta urbana na varanda 🍅🌱",
    followers: 512,
    following: 134,
    isFollowing: true,
    plants: [
      { name: "Tomate", emoji: "🍅" },
      { name: "Manjericão", emoji: "🌿" },
      { name: "Pimentão", emoji: "🫑" },
    ],
  },
  {
    id: "u3",
    name: "Camila Rocha",
    avatar: "👩",
    bio: "Orquídeas são minha terapia 🌸",
    followers: 876,
    following: 201,
    isFollowing: false,
    plants: [
      { name: "Orquídea", emoji: "🌸" },
      { name: "Lírio", emoji: "🌷" },
    ],
  },
  {
    id: "u4",
    name: "Lucas Mendes",
    avatar: "🧔",
    bio: "DIY e plantas penduradas 🪴",
    followers: 345,
    following: 156,
    isFollowing: true,
    plants: [
      { name: "Samambaia", emoji: "🌱" },
      { name: "Jibóia", emoji: "🍃" },
      { name: "Hera", emoji: "🌿" },
    ],
  },
  {
    id: "u5",
    name: "Fernanda Lima",
    avatar: "👩‍🦰",
    bio: "Colecionadora de suculentas 🌵",
    followers: 678,
    following: 98,
    isFollowing: false,
    plants: [
      { name: "Jade", emoji: "🪴" },
      { name: "Echeveria", emoji: "🌵" },
      { name: "Aloe", emoji: "🌿" },
      { name: "Sedum", emoji: "🌱" },
    ],
  },
];
