import { Typography, Toolbar, AppBar } from "@mui/material";

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    Top players
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;