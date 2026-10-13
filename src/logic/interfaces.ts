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

// Subset of WCIF v2 read by this app. @wca/helpers still describes WCIF v1,
// where PersonalBest.value was called PersonalBest.best.
// Spec: https://github.com/thewca/wcif/blob/latest/specification.md
export interface WcifPersonalBest {
  eventId: EventId;
  value: number;
  type: "single" | "average";
  worldRanking: number;
  continentalRanking: number;
  nationalRanking: number;
}

export interface WcifPerson {
  name: string;
  wcaId: string | null;
  countryIso2: string;
  registration: { eventIds: EventId[] } | null;
  personalBests?: WcifPersonalBest[];
}

export interface WcifRound {
  id: string;
  linkedRounds: string[] | null;
}

export interface WcifEvent {
  id: EventId;
  rounds: WcifRound[];
}

export interface Wcif {
  formatVersion: string;
  id: string;
  name: string;
  events: WcifEvent[];
  persons: WcifPerson[];
}
