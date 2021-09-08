import { CountryCode } from '../constants/countries';

export interface BasePlayer {
  name: string;
  country: CountryCode;
  winnings: number;
  imageUrl?: string;
}

export interface Player extends BasePlayer {
  id: string;
  imageUrl: string;
}

export type PlayerRecord = Record<string, Player>;
