import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import classes from "./PlayersTable.module.css";
import { resultToString } from "../logic/results";

const PlayersTable = (props: any) => {
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
                            <TableCell>Competition days</TableCell>
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
                                <TableCell>{player.compDays}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    );
};


export default PlayersTable;