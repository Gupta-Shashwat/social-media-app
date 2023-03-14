import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './styles.js';

const Navbar = () => {
    const classes = useStyles();
    const user = null;
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h5" align="center">Memories</Typography>
                <img src={memories} className={classes.image} alt='memories' height="60" style={{ alignSelf: 'center' }} />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" className={classes.userName} >{user.result.name}</Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" >Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;