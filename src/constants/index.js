export const dynamicRangeData = [
  { label: 'Auto', value: 'Auto' },
  { label: 'DR100', value: 'DR100' },
  { label: 'DR200', value: 'DR200' },
  { label: 'DR400', value: 'DR400' },
];

export const ccData = [
  { label: 'Off', value: 'Off' },
  { label: 'Weak', value: 'Weak' },
  { label: 'Strong', value: 'Strong' },
];

export const grainEffectData = [
  { label: 'Off', value: 'Off' },
  { label: 'Weak', value: 'Weak' },
  { label: 'Weak, Small', value: 'Weak, Small' },
  { label: 'Weak, Large', value: 'Weak, Large' },
  { label: 'Strong', value: 'Strong' },
  { label: 'Strong, Small', value: 'Strong, Small' },
  { label: 'Strong, Large', value: 'Strong, Large' },
];

export const colorData = [
  { label: '0', value: '0' },
  { label: '-9', value: '-9' },
  { label: '-8', value: '-8' },
  { label: '-7', value: '-7' },
  { label: '-6', value: '-6' },
  { label: '-5', value: '-5' },
  { label: '-4', value: '-4' },
  { label: '-3', value: '-3' },
  { label: '-2', value: '-2' },
  { label: '-1', value: '-1' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
];

export const sensorData = [
  { label: 'Bayer', value: 'Bayer' },
  { label: 'X-Trans I', value: 'X-Trans I' },
  { label: 'X-Trans II', value: 'X-Trans II' },
  { label: 'X-Trans III', value: 'X-Trans III' },
  { label: 'X-Trans IV', value: 'X-Trans IV' },
  { label: 'X-Trans IV(2)', value: 'X-Trans IV(2)' },
  { label: 'X-Trans V', value: 'X-Trans V' },
];

export const wbData = [
  { label: 'Auto', value: 'Auto' },
  { label: 'Color Temperature', value: 'Color Temperature' },
  { label: 'Daylight', value: 'Daylight' },
  { label: 'Shade', value: 'Shade' },
  { label: 'Fluorescent Light-1', value: 'Fluorescent Light-1' },
  { label: 'Fluorescent Light-2', value: 'Fluorescent Light-2' },
  { label: 'Fluorescent Light-3', value: 'Fluorescent Light-3' },
  { label: 'Incadescent', value: 'Incadescent' },
  { label: 'Underwater', value: 'Underwater' },
];

export const filmSimulationData = [
  { label: 'PROVIA/Standard', value: 'PROVIA/Standard' },
  { label: 'ASTIA/Soft', value: 'ASTIA/Soft' },
  { label: 'Velvia/Vivid', value: 'Velvia/Vivid' },
  { label: 'CLASSIC CHROME', value: 'CLASSIC CHROME' },
  { label: 'PRO Neg. Std', value: 'PRO Neg. Std' },
  { label: 'PRO Neg. Hi', value: 'PRO Neg. Hi' },
  { label: 'CLASSIC Neg.', value: 'CLASSIC Neg.' },
  { label: 'ETERNA', value: 'ETERNA' },
  { label: 'MONOCHROME', value: 'MONOCHROME' },
  { label: 'ACROS', value: 'ACROS' },
  { label: 'SEPIA', value: 'SEPIA' },
  { label: 'ACROS + Ye Filter', value: 'ACROS + Ye Filter' },
  { label: 'ACROS + G Filter', value: 'ACROS + G Filter' },
  { label: 'ACROS + R Filter', value: 'ACROS + R Filter' },
  { label: 'MONOCHROME + Y', value: 'MONOCHROME +Y' },
  { label: 'MONOCHROME + G', value: 'MONOCHROME + G' },
  { label: 'MONOCHROME + R', value: 'MONOCHROME + R' },
];

export const filmElements = [
  'title',
  'film simulation',
  'dynamic range',
  'grain effect',
  'color chrome effect',
  'color chrome fx blue',
  'white balance',
  'red',
  'blue',
  'highlight',
  'shadow',
  'color',
  'sharpness',
  'noise reduction',
  'clarity',
  'iso',
  'exposure compensation',
];

export const destinationData = [
  {
    title: 'Kodak Portra 160',
    image: require('../../assets/films/portra160/1.webp'),
    specs: {
      'film simulation': 'CLASSIC CHROME',
      'dynamic range': 'DR400',
      'grain effect': 'Weak, Small',
      'color chrome effect': 'Strong',
      'color chrome fx blue': 'Strong',
      'white balance': '4900K, +4 Red & -6 Blue',
      highlight: '-1',
      shadow: '-2',
      color: '0',
      sharpness: '-2',
      nr: '-4',
      clarity: '-3',
      iso: 'Auto',
      'exposure compensation': '+1',
    },
    images: [
      require('../../assets/films/portra160/1.webp'),
      require('../../assets/films/portra160/2.webp'),
      require('../../assets/films/portra160/3.webp'),
    ],
  },
  {
    title: 'Kodak Ektar 100',
    image: require('../../assets/films/ektar100/1.webp'),
    specs: {
      'film simulation': 'CLASSIC CHROME',
      'dynamic range': 'DR400',
      'grain effect': 'Weak, Small',
      'color chrome effect': 'Strong',
      'color chrome fx blue': 'Strong',
      'white balance': '4900K, +4 Red & -6 Blue',
      highlight: '-1',
      shadow: '-2',
      color: '0',
      sharpness: '-2',
      nr: '-4',
      clarity: '-3',
      iso: 'Auto',
      'exposure compensation': '+1',
    },
    images: [
      require('../../assets/films/ektar100/1.webp'),
      require('../../assets/films/ektar100/2.webp'),
      require('../../assets/films/ektar100/3.webp'),
      require('../../assets/films/ektar100/4.webp'),
    ],
  },
];
