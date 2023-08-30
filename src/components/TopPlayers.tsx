import { SyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EventSelect from "./EventSelect";
import PlayersTable from "./PlayersTable";
import events from "../logic/events";
import regions from "../logic/regions";
import { getThisWeekendTopPlayers } from "../logic/players";
import { EventId } from "@wca/helpers";
import { Event, Region, TopPlayer } from "../logic/interfaces";

const TopPlayers = () => {
  const [players, setPlayers] = useState<TopPlayer[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>(events[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<Region>({
    id: "WR",
    name: "World",
    continentId: "_Multiple Continents",
    iso2: "WR",
  });

  useEffect(() => {
    getTopPlayers(selectedEvent.id, region.iso2);
  }, []);

  const getTopPlayers = async (
    eventId: EventId,
    regionId = "WR",
    continentId?: string,
  ) => {
    setIsLoading(true);
    try {
      let response;
      if (regionId === "WR") {
        response = await getThisWeekendTopPlayers(eventId);
      } else {
        if (continentId && regionId === "CR") {
          response = await getThisWeekendTopPlayers(eventId, continentId, true);
        } else {
          response = await getThisWeekendTopPlayers(eventId, regionId);
        }
      }
      setPlayers(response);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleEventChange = async (newEvent: Event) => {
    setSelectedEvent(newEvent);
    await getTopPlayers(newEvent.id, region.iso2);
  };

  const handleRegionChange = async (
    event: SyntheticEvent,
    newValue: Region | null,
  ) => {
    if (newValue) {
      setRegion(newValue);
      if (newValue.continentId === "Continent") {
        await getTopPlayers(selectedEvent.id, "CR", newValue.iso2);
      } else {
        await getTopPlayers(selectedEvent.id, newValue.iso2);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ marginBottom: "0.2em" }}>
        Top players for this weekend
      </Typography>
      <Box
        sx={{
          minWidth: 120,
          maxWidth: 200,
          display: "flex !important",
          flexDirection: "column !important",
          justifyContent: "center !important",
          alignItems: "center !important",
          margin: "auto",
        }}
      >
        <Autocomplete
          id="regionSelect"
          options={regions}
          getOptionLabel={(option) => option.name}
          value={region}
          onChange={handleRegionChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Region"
              variant="outlined"
              sx={{ width: 180 }}
            />
          )}
        />
      </Box>
      <EventSelect
        selectedEvent={selectedEvent}
        eventChange={handleEventChange}
      />
      <div>
        <Paper>
          {isLoading ? (
            <div>
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : players.length === 0 ? (
            <div>There are no top players for this event</div>
          ) : (
            <PlayersTable
              players={players}
              region={region}
              event={selectedEvent.id}
            />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default TopPlayers;
