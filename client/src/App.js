import { Container } from "@material-ui/core";
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home.js';
import Auth from './Components/Auth/Auth.js';



const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth='lg'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/auth' component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter >
    )
}

export default App;