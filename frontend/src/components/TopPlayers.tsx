import React from "react";
import {
    Box,
    CircularProgress, FormControl, InputLabel, MenuItem,
    Paper, Select,
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
                "code": "WR",
                "name": "World"
            },
    }
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
    }

    componentDidMount() {
        this.getTopPlayers(this.state.event.id);
    }

    async getTopPlayers(eventId: string, regionId: string = "WR") {
        this.setState({isLoading: true});
        try {
            let response;
            switch (regionId) {
                case "WR":
                    response = await fetch(`http://localhost:5000/players/this/${eventId}`);
                    break;
                default:
                    response = await fetch(`http://localhost:5000/players/this/${eventId}/${regionId}`);
                    break;
            }
            const data = await response.json();
            this.setState({players: data, isLoading: false});

        } catch (e) {
            this.setState({isLoading: false});
        }
    }

    async handleEventChange(selectedEvent: any) {
        this.setState({event: selectedEvent});
        await this.getTopPlayers(selectedEvent.id, this.state.region.code);
    }

    async handleRegionChange(event: any) {
        const selectedRegion = regions.find(
            (country) => country.code === event.target.value
        );
        this.setState({region: selectedRegion});
        // @ts-ignore
        await this.getTopPlayers(this.state.event.id, selectedRegion.code);
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
                    <FormControl>
                        <InputLabel id="regionLabel">Region</InputLabel>
                        <Select
                            labelId="regionLabel"
                            id="regionSelect"
                            value={this.state.region.code}
                            label="regionLabel"
                            onChange={this.handleRegionChange}
                        >
                            {regions.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <EventSelect selectedEvent={this.state.event} eventChange={this.handleEventChange}/>
                <div>
                    <Paper>
                        {this.state.isLoading ? <div><Box sx={{textAlign: 'center'}}>
                                <CircularProgress/>
                            </Box></div> :
                            this.state.players.length === 0 ? <div>There are no top players for this event</div> :
                                <PlayersTable players={this.state.players}/>}
                    </Paper>
                </div>
            </div>
        );
    }
}
