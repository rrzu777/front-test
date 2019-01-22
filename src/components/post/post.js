import React from 'react';

import classes from './post.scss';

const Post = ({ title, hasComment, body }) => (
    <article className={classes.post}>
        <h1>{title}</h1>
        {   hasComment && hasComment.email ?
                <div className="comment">
                    <strong>Coments:</strong>
                    <div>{hasComment.name}</div>
                    <div>{body}</div>
                    <div>{hasComment.email}</div>
                </div> :
            null
        }
    </article>
);

export default Post;