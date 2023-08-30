import { Person } from "@wca/helpers";
import { Competition, CompetitionInfo, Competitor } from "./interfaces";
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

export const getCompetitionInfo = async (id: string) => {
  const response = await wcaApiFetch(`/competitions/${id}/wcif/public`);
  return response;
};

export const getCompetitorsId = async (competitionId: string) => {
  const response = await wcaApiFetch(
    `/competitions/${competitionId}/wcif/public`,
  );
  const competitors: Competitor[] = [];
  response.persons.forEach((competitor: Person) => {
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
