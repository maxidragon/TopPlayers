import { wcaApiFetch } from "./request";

export const getCompetitionsFromPeriod = async (start: string, end: string) => {
  const params = new URLSearchParams({
    start,
    end,
    per_page: "100",
  });
  const response = await wcaApiFetch(`/competitions?${params}`);
  const competitions: any = [];
  response.map((competition: any) => {
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
    `/competitions/${competitionId}/wcif/public`
  );
  const competitors: any = [];
  response.persons.forEach((competitor: any) => {
    if (
      competitor.wcaId &&
      competitor.registration &&
      competitor.registration.eventIds &&
      competitor.registration.hasOwnProperty("eventIds")
    ) {
      competitors.push({
        id: competitor.wcaId,
        events: competitor.registration.eventIds,
      });
    }
  });
  return competitors;
};
