export type Carrier = {
  id: string;
  name: string;
  logo: string; // remote logo URL
  amounts: number[];
};

// Real brand logos via Wikimedia or official CDNs where available
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const CARRIERS: Carrier[] = [
  {
    id: "ayyildiz",
    name: "AyYildiz",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/ayyildiz.png`,
    amounts: [10, 20, 30, 50, 100],
  },
  {
    id: "blau",
    name: "Blau",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/blau.png`,
    amounts: [10, 20, 30, 50, 100],
  },
  {
    id: "congstar",
    name: "congstar",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/congstar.png`,
    amounts: [15, 30, 50, 100],
  },
  {
    id: "eplus",
    name: "E-Plus",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/eplus.png`,
    amounts: [10, 20, 30, 50, 100],
  },
  {
    id: "o2",
    name: "O2",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/o2.png`,
    amounts: [10, 15, 20, 30, 50, 100],
  },
  {
    id: "ortel",
    name: "Ortel Mobile",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/ortel.png`,
    amounts: [10, 15, 20, 30, 50, 100],
  },
  {
    id: "otelo",
    name: "otelo",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/otelo.png`,
    amounts: [10, 20, 30, 50, 100],
  },
  {
    id: "telekom",
    name: "Telekom",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/telekom.png`,
    amounts: [10, 15, 20, 30, 50, 100],
  },
  {
    id: "vodafone",
    name: "Vodafone",
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/vodafone.png`,
    amounts: [10, 15, 20, 30, 50, 100],
  },
];

export const carrierById = (id: string) => CARRIERS.find(c => c.id === id);


