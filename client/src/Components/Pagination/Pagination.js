import React from 'react'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles.js';

const Page = () => {

    const classes = useStyles();

    return (
        <div>
            <Pagination
                classes={{ ul: classes.ul }}
                count={5}
                page={1}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
                )}
            />
        </div>
    )
}

export default Page;
