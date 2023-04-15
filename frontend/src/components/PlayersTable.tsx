import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import classes from "./PlayersTable.module.css";

const PlayersTable = (props: any) => {
    const resultToString = (result: any, eventId: string, format: string) => {
        if (eventId === '333fm') {
            switch (format) {
                case 'single':
                    return result;
                case 'average':
                    return (result / 100).toFixed(2);
                default:
                    throw new Error(`Wrong format ${format}`);
            }
        } else if (eventId === '333mbf') {
            const missed = result % 100
            result = Math.floor(result / 100);
            const timeSeconds = result % 100000;
            result = Math.floor(result / 100000);
            const difference = 99 - (result % 100)
            const solved = difference + missed
            const attempted = solved + missed
            const formattedTime = centisecondsToClockFormat(timeSeconds * 100).replace(/\.00$/, '');
            return `${solved}/${attempted} ${formattedTime}`;
        } else {
            return centisecondsToClockFormat(result);
        }
    };

    const centisecondsToClockFormat = (centiseconds: any) => {
        //@ts-ignore
        const date = new Date(null);
        date.setMilliseconds(centiseconds * 10);
        return date.toISOString().substr(11, 11).replace(/^[0:]*(?!\.)/g, '');
    };


    return (
        props.players.length === 0 ?
            <div>There are no players for this event</div>
            :
            <div className={classes.playersTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Competition</TableCell>
                            {props.region.iso2 === "WR"
                                ? <TableCell>WR</TableCell>
                                : props.region.continentId === "Continent"
                                    ? <TableCell>CR</TableCell>
                                    : <TableCell>NR</TableCell>
                            }
                            <TableCell>PR</TableCell>
                            <TableCell>Rounds</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.players.map((player: any) => (
                            <TableRow key={player.id}>
                                <TableCell>
                                    <Link href={player.profile} underline="none" target="_blank">
                                        {player.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {player.country}
                                </TableCell>
                                <TableCell>
                                    <Link href={player.compWebsite} underline="none" target="_blank">
                                        {player.competition}
                                    </Link>
                                </TableCell>
                                {props.region.iso2 === "WR"
                                    ? <TableCell>{player.worldRank}</TableCell>
                                    : props.region.continentId === "Continent"
                                        ? <TableCell>{player.continentRank}</TableCell>
                                        : <TableCell>{player.countryRank}</TableCell>
                                }
                                <TableCell>{resultToString(player.prResult, props.event, player.format)}</TableCell>
                                <TableCell>{player.rounds}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    );
}


export default PlayersTable;