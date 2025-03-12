import { Origin } from './history';

export interface OriginTitle {
  title: string;
  show?: boolean;
}

export type OriginTitleMap = Record<Origin, OriginTitle>;
