import { CelestialBody } from './types';

// Note: Distances and sizes are not to scale for visual clarity, 
// but relative orbital periods are approximations of reality.

export const SOLAR_SYSTEM_DATA: CelestialBody[] = [
  {
    id: 'sun',
    name: '太阳',
    type: 'star',
    color: '#fbbf24', // Fallback
    radius: 40,
    orbitRadius: 0,
    period: 0,
    description: '太阳系中心的恒星。它是一个近乎完美的热等离子体球体，通过核心的核聚变反应加热至白热化。',
    mass: '1.989 × 10^30 kg',
    realRadius: '696,340 km',
    rotationPeriod: '27 天',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/512px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    moons: []
  },
  {
    id: 'mercury',
    name: '水星',
    type: 'planet',
    color: '#94a3b8',
    radius: 6,
    orbitRadius: 70,
    period: 0.24,
    description: '太阳系中最小的行星，也是最接近太阳的行星。',
    mass: '3.285 × 10^23 kg',
    realRadius: '2,439 km',
    rotationPeriod: '58.6 天',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07_centered.jpg/512px-Mercury_in_color_-_Prockter07_centered.jpg'
  },
  {
    id: 'venus',
    name: '金星',
    type: 'planet',
    color: '#fde047',
    radius: 10,
    orbitRadius: 100,
    period: 0.61,
    description: '距离太阳第二近的行星。在四颗类地行星中，它拥有最浓密的大气层。',
    mass: '4.867 × 10^24 kg',
    realRadius: '6,051 km',
    rotationPeriod: '243 天',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/512px-Venus-real_color.jpg'
  },
  {
    id: 'earth',
    name: '地球',
    type: 'planet',
    color: '#3b82f6',
    radius: 10,
    orbitRadius: 140,
    period: 1,
    description: '距离太阳第三近的行星，也是目前已知唯一孕育生命的天体。',
    mass: '5.972 × 10^24 kg',
    realRadius: '6,371 km',
    rotationPeriod: '23.9 小时',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/512px-The_Earth_seen_from_Apollo_17.jpg',
    moons: [
      {
        id: 'moon',
        name: '月球',
        type: 'moon',
        color: '#e2e8f0',
        radius: 3,
        orbitRadius: 18,
        period: 0.074,
        description: '地球唯一的天然卫星。',
        mass: '7.34 × 10^22 kg',
        realRadius: '1,737 km',
        rotationPeriod: '27.3 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/512px-FullMoon2010.jpg'
      }
    ]
  },
  {
    id: 'mars',
    name: '火星',
    type: 'planet',
    color: '#ef4444',
    radius: 8,
    orbitRadius: 190,
    period: 1.88,
    description: '距离太阳第四近的行星，太阳系中第二小的行星。',
    mass: '6.39 × 10^23 kg',
    realRadius: '3,389 km',
    rotationPeriod: '24.6 小时',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/512px-OSIRIS_Mars_true_color.jpg'
  },
  {
    id: 'jupiter',
    name: '木星',
    type: 'planet',
    color: '#d97706',
    radius: 28,
    orbitRadius: 280,
    period: 11.86,
    description: '距离太阳第五近的行星，也是太阳系中最大的行星。',
    mass: '1.898 × 10^27 kg',
    realRadius: '69,911 km',
    rotationPeriod: '9.9 小时',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/512px-Jupiter.jpg',
    moons: [
      {
        id: 'io',
        name: '木卫一 (Io)',
        type: 'moon',
        color: '#facc15',
        radius: 2.5,
        orbitRadius: 34,
        period: 0.0048,
        description: '木星四颗伽利略卫星中最内层的一颗。',
        mass: '8.93 × 10^22 kg',
        realRadius: '1,821 km',
        rotationPeriod: '1.77 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/512px-Io_highest_resolution_true_color.jpg'
      },
      {
        id: 'europa',
        name: '木卫二 (Europa)',
        type: 'moon',
        color: '#fef08a',
        radius: 2.2,
        orbitRadius: 39,
        period: 0.0097,
        description: '木星四颗伽利略卫星中最小的一颗。',
        mass: '4.80 × 10^22 kg',
        realRadius: '1,560 km',
        rotationPeriod: '3.55 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/512px-Europa-moon.jpg'
      },
      {
        id: 'ganymede',
        name: '木卫三 (Ganymede)',
        type: 'moon',
        color: '#a8a29e',
        radius: 3.5,
        orbitRadius: 46,
        period: 0.019,
        description: '太阳系中最大、质量最重的卫星。',
        mass: '1.48 × 10^23 kg',
        realRadius: '2,634 km',
        rotationPeriod: '7.15 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Ganymede_-_Voyager_2_-_Color_Mosaic.jpg/800px-Ganymede_-_Voyager_2_-_Color_Mosaic.jpg'
      },
      {
        id: 'callisto',
        name: '木卫四 (Callisto)',
        type: 'moon',
        color: '#78716c',
        radius: 3.2,
        orbitRadius: 54,
        period: 0.045,
        description: '木星第二大卫星，也是太阳系第三大卫星。',
        mass: '1.07 × 10^23 kg',
        realRadius: '2,410 km',
        rotationPeriod: '16.7 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Callisto_-_Galileo_Global_Mosaic.jpg/800px-Callisto_-_Galileo_Global_Mosaic.jpg'
      }
    ]
  },
  {
    id: 'saturn',
    name: '土星',
    type: 'planet',
    color: '#f59e0b',
    radius: 24, 
    orbitRadius: 390,
    period: 29.45,
    description: '距离太阳第六近的行星，太阳系第二大行星，以其行星环系统闻名。',
    mass: '5.683 × 10^26 kg',
    realRadius: '58,232 km',
    rotationPeriod: '10.7 小时',
    // Switched to a highly reliable, ring-less, cylindrical map from NASA.
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Cylindrical_Map_of_Saturn.jpg/800px-Cylindrical_Map_of_Saturn.jpg',
    rings: {
      innerRadius: 26, 
      outerRadius: 42,
      color: '#c2a176', 
      opacity: 0.8
    },
    moons: [
      {
        id: 'titan',
        name: '土卫六 (Titan)',
        type: 'moon',
        color: '#fbbf24',
        radius: 3.5,
        orbitRadius: 60,
        period: 0.044,
        description: '土星最大的卫星，也是太阳系第二大天然卫星。',
        mass: '1.345 × 10^23 kg',
        realRadius: '2,574 km',
        rotationPeriod: '15.9 天',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Titan_in_true_color.jpg/512px-Titan_in_true_color.jpg'
      }
    ]
  },
  {
    id: 'uranus',
    name: '天王星',
    type: 'planet',
    color: '#22d3ee',
    radius: 16,
    orbitRadius: 490,
    period: 84,
    description: '距离太阳第七近的行星。在太阳系中，它的体积排名第三，质量排名第四。',
    mass: '8.681 × 10^25 kg',
    realRadius: '25,362 km',
    rotationPeriod: '17.2 小时',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/512px-Uranus2.jpg'
  },
  {
    id: 'neptune',
    name: '海王星',
    type: 'planet',
    color: '#3b82f6',
    radius: 16,
    orbitRadius: 590,
    period: 164.8,
    description: '距离太阳最远的已知行星。',
    mass: '1.024 × 10^26 kg',
    realRadius: '24,622 km',
    rotationPeriod: '16.1 小时',
    textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/512px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'
  }
];