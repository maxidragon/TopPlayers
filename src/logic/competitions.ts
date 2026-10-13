import {
  Competition,
  CompetitionInfo,
  Competitor,
  Wcif,
  WcifPerson,
} from "./interfaces";
import { wcaApiFetch } from "./request";

export const getCompetitionsFromPeriod = async (start: string, end: string) => {
  const params = new URLSearchParams({
    start,
    end,
    per_page: "100",
  });
  const response = await wcaApiFetch(`/competitions?${params}`);
  const competitions: Competition[] = [];
  response.forEach((competition: CompetitionInfo) => {
    competitions.push({
      id: competition.id,
      name: competition.name,
      startDate: competition.start_date,
      endDate: competition.end_date,
      events: competition.event_ids,
    });
  });
  return competitions;
};

// Pinned to major version 2: the unversioned endpoints serve WCIF v1, which
// is deprecated, and /wcif/latest will move to future major versions.
const wcifPath = (competitionId: string) =>
  `/competitions/${competitionId}/wcif/version/2`;

export const getCompetitionInfo = async (id: string): Promise<Wcif> => {
  return wcaApiFetch(wcifPath(id));
};

export const getCompetitorsId = async (competitionId: string) => {
  const response = await getCompetitionInfo(competitionId);
  const competitors: Competitor[] = [];
  response.persons.forEach((competitor: WcifPerson) => {
    if (
      competitor.wcaId &&
      competitor.registration &&
      competitor.registration.eventIds &&
      "eventIds" in competitor.registration
    ) {
      competitors.push({
        id: competitor.wcaId,
        events: competitor.registration.eventIds,
      });
    }
  });
  return competitors;
};
