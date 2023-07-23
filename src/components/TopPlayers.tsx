import {
    Autocomplete,
    Box,
    CircularProgress,
    Paper, TextField,
    Typography
} from "@mui/material";
import EventSelect from "./EventSelect";
import PlayersTable from "./PlayersTable";
import events from "../logic/events";
import regions from "../logic/regions";
import { getThisWeekendTopPlayers } from "../logic/players";
import { EventId } from "@wca/helpers";
import { Component } from "react";
import { Event, Region, TopPlayer } from "../logic/interfaces";

interface State {
    isLoading: boolean;
    players: TopPlayer[];
    event: Event,
    region: Region;
}


export default class TopPlayers extends Component<{}, State> {
    constructor() {
        super({});
        this.state = {
            players: [],
            event: events[0],
            isLoading: true,
            region: {
                "id": "WR",
                "name": "World",
                "continentId": "_Multiple Continents",
                "iso2": "WR",
            },
        }
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
    }

    componentDidMount() {
        this.getTopPlayers(this.state.event.id);
    }

    async getTopPlayers(eventId: EventId, regionId: string = "WR", continentId?: string) {
        this.setState({isLoading: true});
        try {
            let response;
            if (regionId === "WR") {
                response = await getThisWeekendTopPlayers(eventId);
            } else {
                if (continentId) {
                    response = await getThisWeekendTopPlayers(eventId, continentId, true);

                } else {
                    response = await getThisWeekendTopPlayers(eventId, regionId);
                }
            }
            this.setState({players: response, isLoading: false});
        } catch (e) {
            this.setState({isLoading: false});
        }
    }

    async handleEventChange(selectedEvent: Event) {
        this.setState({event: selectedEvent});
        await this.getTopPlayers(selectedEvent.id, this.state.region.iso2);
    }

    async handleRegionChange(event: any, newValue: Region | null) {
        if (newValue) {
            this.setState({ region: newValue });
            if (newValue.continentId === "Continent") {
                //@ts-ignore
                await this.getTopPlayers(this.state.event.id, null, newValue.iso2);
            } else {
                await this.getTopPlayers(this.state.event.id, newValue.iso2);
            }
        }
    }


    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Typography variant="h5" sx={{marginBottom: '0.2em'}}>
                    Top players for this weekend
                </Typography>
                <Box sx={{
                    minWidth: 120,
                    maxWidth: 200,
                    display: 'flex !important',
                    flexDirection: 'column !important',
                    justifyContent: 'center !important',
                    alignItems: 'center !important',
                    margin: 'auto',
                }}>
                    <Autocomplete
                        id="regionSelect"
                        options={regions}
                        getOptionLabel={(option) => option.name}
                        value={this.state.region}
                        onChange={this.handleRegionChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Region" variant="outlined" sx={{width: 180}}/>
                        )}
                    />
                </Box>
                <EventSelect selectedEvent={this.state.event} eventChange={this.handleEventChange}/>
                <div>
                    <Paper>
                        {this.state.isLoading ? <div><Box sx={{textAlign: 'center'}}>
                                <CircularProgress/>
                            </Box></div> :
                            this.state.players.length === 0 ? <div>There are no top players for this event</div> :
                                <PlayersTable players={this.state.players} region={this.state.region}
                                              event={this.state.event.id}/>}
                    </Paper>
                </div>
            </div>
        );
    }
}
