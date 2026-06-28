/** Cities supported by the platform. Each scored independently (city-internal z-score). */
export interface City {
  key: string; // url slug
  name: string;
  adcode: string; // 高德 POI city filter
  boundaryAdcode: string; // DataV boundary geojson (直辖市用省级 adcode)
  blurb: string;
}

export const CITIES: City[] = [
  {
    key: 'shanghai',
    name: '上海',
    adcode: '310100',
    boundaryAdcode: '310000', // 直辖市：DataV 用省级 adcode
    blurb: '16 区 · 超大都市，中心高密、郊区广阔。',
  },
  {
    key: 'yinchuan',
    name: '银川',
    adcode: '640100',
    boundaryAdcode: '640100',
    blurb: '6 区县 · 宁夏首府，塞上江南。',
  },
];

export const DEFAULT_CITY = 'shanghai';

export function getCity(key: string): City | undefined {
  return CITIES.find((c) => c.key === key);
}
