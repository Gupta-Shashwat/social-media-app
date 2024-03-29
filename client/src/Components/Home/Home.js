import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination.js';
import useStyles from './styles.js';
import { getPosts, getPostsBySearch } from '../../actions/posts.js';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const onAdd = (tag) => {
        setTags([...tags, tag])
    }

    const onDelete = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    }

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsBySearch({ search: search.trim(), tags: tags.join(',') }));
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container alignItems='stretch' justifyContent="space-between" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyDown={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={onAdd}
                                onDelete={onDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} >
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;