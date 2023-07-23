import {IconButton, Tooltip} from "@mui/material";
import "@cubing/icons";
import events from "../logic/events";

const EventSelect = (props: any) => {
    const {selectedEvent, eventChange} = props;
    return (
        <div>
            {events.map(event => (
                <Tooltip title={event.name} placement="top" key={event.id}>
                    <IconButton onClick={() => eventChange(event)}>
              <span
                  className={`cubing-icon ${event.icon}`}
                  style={{opacity: event.id === selectedEvent.id ? 1 : 0.3}}
              />
                    </IconButton>
                </Tooltip>
            ))}
        </div>
    );
}
export default EventSelect;