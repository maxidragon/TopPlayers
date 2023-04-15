import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import regions from "../regions";

const PlayersTable = (props: any) => {
    return (
        props.players.length === 0 ?
            <div>There are no players for this event</div>
            :
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Competition</TableCell>
                            {props.region.code === "WR" ?
                                <TableCell>WR</TableCell>
                                : <TableCell>NR</TableCell>}
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
                                {props.region.code === "WR" ?
                                    <TableCell>{player.worldRank}</TableCell>
                                    : <TableCell>{player.countryRank}</TableCell>}
                                <TableCell>{player.rounds}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    );
}


export default PlayersTable;