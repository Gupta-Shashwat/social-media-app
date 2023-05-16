import { Container } from "@material-ui/core";
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home.js';
import Auth from './Components/Auth/Auth.js';
import PostDetails from "./Components/PostDetails/PostDetails.js";



const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxwidth='xl'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={() => <Redirect to="/posts" />} />
                    <Route exact path='/posts' component={Home} />
                    <Route exact path='/posts/search' component={Home} />
                    <Route exact path='/posts/:id' component={PostDetails} />
                    <Route exact path='/auth' component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </Container>
        </BrowserRouter >
    )
}

export default App;