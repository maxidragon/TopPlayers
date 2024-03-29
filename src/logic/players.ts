import { EventId, Event, Person, PersonalBest } from "@wca/helpers";
import { getCompetitionsFromPeriod, getCompetitionInfo } from "./competitions";
import { TopPlayer } from "./interfaces";
import regions from "./regions";
import { getWeekendPeriod } from "./utils";

export const getThisWeekendTopPlayers = async (
  cube: EventId,
  type: string = "average",
  region?: string,
  isContinent?: boolean,
) => {
  const period = getWeekendPeriod();
  const competitions = await getCompetitionsFromPeriod(
    period.start,
    period.end,
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
      competitionInfo.events.forEach((event: Event) => {
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
              let checkedResult: PersonalBest = {
                eventId: cube,
                best: 0,
                worldRanking: 999999999,
                continentalRanking: 999999999,
                nationalRanking: 999999999,
                type: "single",
              };
              if (personalRecords === undefined) {
                return;
              }
              personalRecords.forEach((record) => {
                if (record.eventId === cube) {
                  if (record.type === type) {
                    checkedResult = record;
                  }
                }
              });
              if (checkedResult !== undefined && compEvent) {
                let playerCountry = "";
                let playerContinent = "";
                regions.forEach((region) => {
                  if (region.iso2 === competitor.countryIso2) {
                    playerCountry = region.name;
                    playerContinent = region.continentId;
                  }
                });
                if (region && !isContinent) {
                  if (checkedResult.nationalRanking <= 15) {
                    if (competitor.countryIso2 === region) {
                      competitionTopPlayers.push({
                        name: competitor.name,
                        worldRank: checkedResult.worldRanking,
                        countryRank: checkedResult.nationalRanking,
                        continentRank: checkedResult.continentalRanking,
                        prResult: checkedResult.best.toString(),
                        format: checkedResult.type,
                        country: playerCountry,
                        compId: competitionInfo.id,
                        id: competitor.wcaId as string,
                        profile: `https://www.worldcubeassociation.org/persons/${competitor.wcaId}`,
                        competition: competitionInfo.name,
                        compWebsite: `https://worldcubeassociation.org/competitions/${competitionInfo.id}`,
                        rounds: compEvent.rounds.length as number,
                        compDays: compDays,
                      });
                    }
                  }
                } else if (region && isContinent) {
                  if (checkedResult.continentalRanking <= 25) {
                    if (playerContinent === region) {
                      competitionTopPlayers.push({
                        name: competitor.name,
                        worldRank: checkedResult.worldRanking,
                        countryRank: checkedResult.nationalRanking,
                        continentRank: checkedResult.continentalRanking,
                        prResult: checkedResult.best.toString(),
                        format: checkedResult.type,
                        country: playerCountry,
                        compId: competitionInfo.id,
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
                      prResult: checkedResult.best.toString(),
                      format: checkedResult.type,
                      country: playerCountry,
                      compId: competitionInfo.id,
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
