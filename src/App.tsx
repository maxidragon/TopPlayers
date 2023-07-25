import Grid from '@mui/material/Grid';
import Navbar from './components/Navbar';
import TopPlayers from './components/TopPlayers';
import {CssBaseline} from "@mui/material";
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <CssBaseline/>
            <Navbar/>
            <Grid item xs={12} md={8} style={{padding: 16}}>
                <TopPlayers/>
            </Grid>
            <Footer />
        </div>
    );
}

export default App;
