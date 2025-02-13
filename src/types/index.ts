export type Recipe = {
  id: string;
  film_simulation: string;
  sensor: string;
  dynamic_range: string;
  white_balance: string;
  color: number | null;
  highlight: number | null;
  shadow: number | null;
  sharpness: number | null;
  noise_reduction: number | null;
  clarity: number | null;
  grain_effect: string;
  color_chrome_fx: string;
  color_chrome_fx_blue?: string;
  iso: string;
  exposure_compensation?: number;
  red: string | number;
  blue: string | number;
  images: string[];
  title: string;
  temp: number;
  favorite: boolean;
  bw: boolean;
  db_id: string;
};

export type DetailScreenProps = {
  data: {
    item: Recipe;
    isImported: boolean;
    isDataToImport: boolean;
  };
};
