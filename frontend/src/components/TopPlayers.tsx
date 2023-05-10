import React from "react";
import {
    Autocomplete,
    Box,
    CircularProgress,
    Paper, TextField,
    Typography
} from "@mui/material";
import EventSelect from "./EventSelect";
import PlayersTable from "./PlayersTable";
import events from "../events";
import regions from "../regions";

interface State {
    isLoading: boolean;
    players: any[];
    event: {
        id: string;
        name: string;
        icon: string;
    };
    region: any;
}


export default class TopPlayers extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
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

    async getTopPlayers(eventId: string, regionId: string = "WR", continentId?: string) {
        this.setState({isLoading: true});
        try {
            let response;
            if (regionId === "WR") {
                response = await fetch(`http://localhost:5000/players/this/${eventId}`);
            } else {
                if (continentId) {
                    response = await fetch(`http://localhost:5000/players/this/${eventId}/continent/${continentId}`);
                } else {
                    response = await fetch(`http://localhost:5000/players/this/${eventId}/${regionId}`);
                }
            }
            const data = await response.json();
            this.setState({players: data, isLoading: false});

        } catch (e) {
            this.setState({isLoading: false});
        }
    }

    async handleEventChange(selectedEvent: any) {
        this.setState({event: selectedEvent});
        await this.getTopPlayers(selectedEvent.id, this.state.region.iso2);
    }

    async handleRegionChange(event: any, newValue: any) {
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
