/**
 * Kyrgyz Memory Game - Cultural Data
 * 
 * This file contains dummy data for MVP testing.
 * In production, these images and facts would be dynamically loaded from:
 * - Images: DALL-E / Stable Diffusion API
 * - Facts: OpenAI GPT API
 */

export interface KyrgyzItem {
  id: string;
  name: string;
  nameKyrgyz: string;
  category: 'instrument' | 'costume' | 'ornament' | 'animal' | 'landmark';
  emoji: string; // Fallback for AI-generated images
  color: string; // Background color for card
  fact: string;
  imageUrl: string; // AI-generated image or static image path
  aiGeneratedFact?: string; // Will be populated by GPT in production
}

// Cultural data featuring Kyrgyz symbols with generated images
export const kyrgyzItems: KyrgyzItem[] = [
  {
    id: 'komuz',
    name: 'Komuz',
    nameKyrgyz: 'Комуз',
    category: 'instrument',
    emoji: '🎸',
    color: '#E8B86D',
    imageUrl: 'https://i.postimg.cc/ZYWRXYb7/image.png',
    fact: 'The komuz is a three-stringed fretless lute, considered the national instrument of Kyrgyzstan. It is traditionally carved from a single piece of apricot or juniper wood.',
  },
  {
    id: 'yurt',
    name: 'Yurt',
    nameKyrgyz: 'Боз үй',
    category: 'landmark',
    emoji: '🏕️',
    color: '#F5E6D3',
    imageUrl: '/images/yurt.jpg',
    fact: 'The yurt (boz üy) is a portable round tent covered with felt. It has been used by nomadic Kyrgyz people for thousands of years and symbolizes the universe in Kyrgyz cosmology.',
  },
  {
    id: 'kalpak',
    name: 'Kalpak',
    nameKyrgyz: 'Калпак',
    category: 'costume',
    emoji: '👒',
    color: '#F8F4EF',
    imageUrl: 'https://i.postimg.cc/g2kSYP2r/image.png',
    fact: 'The kalpak is a traditional white felt hat worn by Kyrgyz men. Its four sides represent the four elements, and the tassel on top symbolizes family prosperity.',
  },
  {
    id: 'eagle',
    name: 'Golden Eagle',
    nameKyrgyz: 'Бүркүт',
    category: 'animal',
    emoji: '🦅',
    color: '#8B7355',
    imageUrl: '/images/eagle.jpg',
    fact: 'Eagle hunting (berkutchi) is an ancient Kyrgyz tradition. Hunters train golden eagles for up to 20 years to hunt foxes and rabbits in the Tian Shan mountains.',
  },
  {
    id: 'shyrdak',
    name: 'Shyrdak',
    nameKyrgyz: 'Шырдак',
    category: 'ornament',
    emoji: '🎨',
    color: '#C54B3C',
    imageUrl: 'https://i.postimg.cc/Nf4tJYnL/image.png',
    fact: 'Shyrdak is a traditional felt rug made using an appliqué technique. Each pattern has meaning - ram\'s horns represent prosperity, while waves symbolize life\'s journey.',
  },
  {
    id: 'horse',
    name: 'Kyrgyz Horse',
    nameKyrgyz: 'Кыргыз аты',
    category: 'animal',
    emoji: '🐴',
    color: '#D4A373',
    imageUrl: '/images/horse.jpg',
    fact: 'The Kyrgyz horse breed is known for its endurance and sure-footedness in mountains. Horses are deeply respected in Kyrgyz culture - there\'s a saying: "A Kyrgyz is born in the saddle."',
  },
  {
    id: 'tunduk',
    name: 'Tunduk',
    nameKyrgyz: 'Түндүк',
    category: 'ornament',
    emoji: '☀️',
    color: '#DAA520',
    imageUrl: '/images/tunduk.jpg',
    fact: 'The tunduk is the crown of the yurt, appearing on Kyrgyzstan\'s flag. Its 40 rays represent the 40 Kyrgyz tribes united by the epic hero Manas.',
  },
  {
    id: 'chiy',
    name: 'Chiy Mat',
    nameKyrgyz: 'Чий',
    category: 'ornament',
    emoji: '🌾',
    color: '#BDB76B',
    imageUrl: 'https://i.postimg.cc/cJGkGJGF/image.png',
    fact: 'Chiy mats are woven from steppe grass and decorated with colorful wool. They insulate yurts and display intricate geometric patterns passed down through generations.',
  },
  {
    id: 'kurak',
    name: 'Kurak',
    nameKyrgyz: 'Курак',
    category: 'ornament',
    emoji: '🧵',
    color: '#6B8E23',
    imageUrl: 'https://i.postimg.cc/K8BPSqnr/image.png',
    fact: 'Kurak is Kyrgyz patchwork art using triangular fabric pieces. Traditionally made from leftover fabric, each creation tells a story of resourcefulness and creativity.',
  },
  {
    id: 'beldemchi',
    name: 'Beldemchi',
    nameKyrgyz: 'Белдемчи',
    category: 'costume',
    emoji: '👗',
    color: '#8B0000',
    imageUrl: 'https://i.postimg.cc/tJvFqBZj/image.png',
    fact: 'Beldemchi is a traditional women\'s skirt worn over trousers, richly embroidered with silver thread. The patterns often indicate the wearer\'s clan and marital status.',
  },
  {
    id: 'kiyiz',
    name: 'Ala-Kiyiz',
    nameKyrgyz: 'Ала-кийиз',
    category: 'ornament',
    emoji: '🖼️',
    color: '#4A5568',
    imageUrl: '/images/shyrdak.jpg',
    fact: 'Ala-kiyiz is pressed felt art created by rolling colored wool onto wet felt. UNESCO recognized Kyrgyz felt-making as Intangible Cultural Heritage in 2012.',
  },
  {
    id: 'temir_komuz',
    name: 'Temir Komuz',
    nameKyrgyz: 'Темир комуз',
    category: 'instrument',
    emoji: '🎵',
    color: '#708090',
    imageUrl: '/images/komuz.jpg',
    fact: 'The temir komuz (jaw harp) is an ancient instrument made of metal or bamboo. Players use their breath and mouth as a resonating chamber to create haunting melodies.',
  },
  {
    id: 'snow_leopard',
    name: 'Snow Leopard',
    nameKyrgyz: 'Илбирс',
    category: 'animal',
    emoji: '🐆',
    color: '#B8C4CE',
    imageUrl: '/images/snow-leopard.jpg',
    fact: 'Kyrgyzstan is home to about 300-400 snow leopards - the "ghost of the mountains." They\'re an important symbol of the country\'s wild mountain heritage.',
  },
  {
    id: 'issyk_kul',
    name: 'Issyk-Kul Lake',
    nameKyrgyz: 'Ысык-Көл',
    category: 'landmark',
    emoji: '🏔️',
    color: '#4682B4',
    imageUrl: '/images/issyk-kul.jpg',
    fact: 'Issyk-Kul is the world\'s second-largest alpine lake that never freezes. Its name means "warm lake" in Kyrgyz, and legends say a city lies beneath its waters.',
  },
  {
    id: 'manas',
    name: 'Epic of Manas',
    nameKyrgyz: 'Манас',
    category: 'landmark',
    emoji: '📜',
    color: '#CD853F',
    imageUrl: '/images/manas.jpg',
    fact: 'The Epic of Manas is the world\'s longest poem, 20 times longer than the Iliad. It tells of the hero Manas who united the Kyrgyz people and has been recited for over 1,000 years.',
  },
  {
    id: 'beshbarmak',
    name: 'Beshbarmak',
    nameKyrgyz: 'Бешбармак',
    category: 'landmark',
    emoji: '🍖',
    color: '#DEB887',
    imageUrl: 'https://i.postimg.cc/wTzx4144/image.png',
    fact: 'Beshbarmak means "five fingers" - this national dish of boiled meat and noodles is traditionally eaten with hands. Serving it to guests is a sign of deep respect.',
  },
];

/**
 * AI INTEGRATION PLACEHOLDER
 * 
 * In production, you would call these functions:
 * 
 * async function generateCardImage(item: KyrgyzItem): Promise<string> {
 *   const response = await openai.images.generate({
 *     model: "dall-e-3",
 *     prompt: `Traditional Kyrgyz ${item.name}, ${item.category}, authentic cultural art style, 
 *              vibrant colors, detailed craftsmanship, suitable for memory card game`,
 *     size: "256x256",
 *   });
 *   return response.data[0].url;
 * }
 * 
 * async function generateFact(item: KyrgyzItem): Promise<string> {
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{
 *       role: "user",
 *       content: `Write a fascinating 2-sentence educational fact about the Kyrgyz ${item.name} 
 *                 (${item.nameKyrgyz}) for teenagers. Make it engaging and memorable.`
 *     }],
 *   });
 *   return response.choices[0].message.content;
 * }
 */

export function getRandomItems(count: number): KyrgyzItem[] {
  const shuffled = [...kyrgyzItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function createGameDeck(pairCount: number): (KyrgyzItem & { uniqueId: string })[] {
  const items = getRandomItems(pairCount);
  // Create pairs
  const deck = items.flatMap((item, index) => [
    { ...item, uniqueId: `${item.id}-a-${index}` },
    { ...item, uniqueId: `${item.id}-b-${index}` },
  ]);
  // Shuffle deck
  return deck.sort(() => Math.random() - 0.5);
}
