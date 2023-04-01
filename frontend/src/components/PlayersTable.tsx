import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";



const PlayersTable = (props: any) => {
    const players = props.players;
    return (
        props.players.length === 0 ?
            <div>There are no players for this event</div>
            :
            <div className="ranking-table-container">
                <Table>
                    <TableHead className="ranking-table-head">
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Competition</TableCell>
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
                                    <Link href={player.compWebsite} underline="none" target="_blank">
                                        {player.competition}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
    );
}


export default PlayersTable;