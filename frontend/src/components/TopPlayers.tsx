import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import React from "react";
import EventSelect from "./EventSelect";
import PlayersTable from "./PlayersTable";
import events from "../events";

interface State {
    isLoading: boolean;
    players: any[];
    event: {
        id: string;
        name: string;
        icon: string;
    };
}

export default class TopPlayers extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            players: [],
            event: events[0],
            isLoading: true
        }
        this.handleEventChange = this.handleEventChange.bind(this);
    }

    componentDidMount() {
        this.getTopPlayers(this.state.event.id);
    }

    async getTopPlayers(eventId : string) {
        this.setState({isLoading: true});
        try {
            const response = await fetch(`http://localhost:5000/players/this/${eventId}`);
            const data = await response.json();
            this.setState({players: data, isLoading: false});
        } catch (e) {
            this.setState({isLoading: false});
        }
    }

    async handleEventChange(selectedEvent: any) {
        this.setState({event: selectedEvent});
        await this.getTopPlayers(selectedEvent.id);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Typography variant="h5">
                    Top players for this weekend
                </Typography>
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
