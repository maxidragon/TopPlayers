import {Icon, IconButton, LinearProgress, Paper, Tooltip, Typography} from "@mui/material";
import React from "react";
import EventSelect from "./EventSelect";

export default class TopPlayers extends React.Component {
    render() {
        return (
 <div style={{ textAlign: 'center' }}>
        <Typography variant="h5">
         Top players for this weekend
        </Typography>
        <EventSelect />
        <div>
          <Paper>
           Top players will be displayed here
          </Paper>
        </div>
      </div>
        );
    }
}
