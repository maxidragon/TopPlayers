import { EventId } from "@wca/helpers";

export interface TopPlayer {
  name: string;
  worldRank: number;
  countryRank: number;
  continentRank: number;
  prResult: string;
  format: string;
  country: string;
  id: string;
  compId: string;
  profile: string;
  competition: string;
  compWebsite: string;
  rounds: number;
  compDays: string;
}

export interface Region {
  id: string;
  name: string;
  continentId: string;
  iso2: string;
}

export interface Event {
  id: EventId;
  name: string;
  icon: string;
}

export interface Competition {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  events: EventId[];
}

export interface Competitor {
  id: string;
  events: EventId[];
}

export interface CompetitionInfo {
  id: string;
  name: string;
  event_ids: EventId[];
  start_date: string;
  end_date: string;
}
