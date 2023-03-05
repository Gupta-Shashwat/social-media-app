import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import memories from './images/memories.png';
import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import useStyles from './styles.js';



const App = () => {
    const classes = useStyles();
    return (
        <Container maxwidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant="h5" align="center">Memories</Typography>
                <img src={memories} className={classes.image} alt='memories' height="60" style={{ alignSelf: 'center' }} />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container alignItems='stretch' justify="space-between" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;