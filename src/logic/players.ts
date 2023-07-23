import { EventId, Event, Person } from "@wca/helpers";
import { getCompetitionsFromPeriod, getCompetitionInfo } from "./competitions";
import { TopPlayer } from "./interfaces";
import regions from "./regions";
import { getWeekendPeriod } from "./utils";

export const getThisWeekendTopPlayers = async (
  cube: EventId,
  country?: string,
  continent?: string
) => {
  const period = getWeekendPeriod();
  const competitions = await getCompetitionsFromPeriod(
    period.start,
    period.end
  );

  const topPlayers: TopPlayer[] = [];

  for (const competition of competitions) {
    if (competition.events.includes(cube)) {
      const competitionInfo = await getCompetitionInfo(competition.id);
      let compEvent: Event | null = null;
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const startDate = new Date(competition.startDate);
      const endDate = new Date(competition.endDate);
      const compDaysArray = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        compDaysArray.push(weekday[d.getDay()]);
      }
      const compDays = compDaysArray.join(", ");
      competitionInfo.events.forEach((event: any) => {
        if (event.id === cube) {
          compEvent = event;
        }
      });
      if (compEvent && competitionInfo.persons) {
        const competitors = competitionInfo.persons;
        const competitionTopPlayers: TopPlayer[] = [];
        competitors.map(async (competitor: Person) => {
          if (competitor.registration && competitor.registration.eventIds) {
            if (competitor.registration.eventIds.includes(cube)) {
              const personalRecords = competitor.personalBests;
              let checkedResult: any = null;
              if (personalRecords === undefined) {
                return;
              }
              personalRecords.forEach((record) => {
                if (record.eventId === cube) {
                  const bldEvents = ["333bf", "444bf", "555bf", "333mbf"];
                  if (bldEvents.includes(cube)) {
                    if (record.type === "single") {
                      checkedResult = record;
                    }
                  } else {
                    if (record.type === "average") {
                      checkedResult = record;
                    }
                  }
                }
              });
              if (checkedResult !== null && compEvent) {
                let playerCountry = "";
                let playerContinent = "";
                regions.forEach((region) => {
                  if (region.iso2 === competitor.countryIso2) {
                    playerCountry = region.name;
                    playerContinent = region.continentId;
                  }
                });
                if (country) {
                  if (checkedResult.nationalRanking <= 15) {
                    if (competitor.countryIso2 === country) {
                      competitionTopPlayers.push({
                        name: competitor.name,
                        worldRank: checkedResult.worldRanking,
                        countryRank: checkedResult.nationalRanking,
                        continentRank: checkedResult.continentalRanking,
                        prResult: checkedResult.best,
                        format: checkedResult.type,
                        country: playerCountry,
                        id: competitor.wcaId as string,
                        profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                        competition: competitionInfo.name,
                        compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                        rounds: compEvent.rounds.length as number,
                        compDays: compDays,
                      });
                    }
                  }
                } else if (continent) {
                  if (checkedResult.continentalRanking <= 25) {
                    if (playerContinent === continent) {
                      competitionTopPlayers.push({
                        name: competitor.name,
                        worldRank: checkedResult.worldRanking,
                        countryRank: checkedResult.nationalRanking,
                        continentRank: checkedResult.continentalRanking,
                        prResult: checkedResult.best,
                        format: checkedResult.type,
                        country: playerCountry,
                        id: competitor.wcaId as string,
                        profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                        competition: competitionInfo.name,
                        compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                        rounds: compEvent.rounds.length,
                        compDays: compDays,
                      });
                    }
                  }
                } else {
                  if (checkedResult.worldRanking <= 25) {
                    competitionTopPlayers.push({
                      name: competitor.name,
                      worldRank: checkedResult.worldRanking,
                      countryRank: checkedResult.nationalRanking,
                      continentRank: checkedResult.continentalRanking,
                      prResult: checkedResult.best,
                      format: checkedResult.type,
                      country: playerCountry,
                      id: competitor.wcaId as string,
                      profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                      competition: competitionInfo.name,
                      compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                      rounds: compEvent.rounds.length,
                      compDays: compDays,
                    });
                  }
                }
              }
            }
          }
        });
        topPlayers.push(...competitionTopPlayers);
      }
    }
  }

  topPlayers.sort((a, b) => a.worldRank - b.worldRank);

  return topPlayers;
};
