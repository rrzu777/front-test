import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../post';
import classes from './blog.scss';

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            error: false
        }
    }

    async componentDidMount () {
            try {
                const postsResponse = await axios.get('/posts');
                const latestPosts = postsResponse.data.slice(0, 10);
                const { data: { body, email, name, id } } = await axios.get('/comments/' + latestPosts[0].id);
                const updatedPosts = latestPosts.map(post => 
                    post.id === id ? { ...post, body, email, name } : post);
                this.setState({ posts: updatedPosts });
            } catch(error) {
                console.log(error)
                this.setState({ error: true });
            }
    }

    render () {
        const { posts, error } = this.state;
        let allPosts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!error) {
            allPosts = posts.map(post =>
                <Post 
                    key={post.id}
                    body={post.body}
                    hasComment={post.email ? { email: post.email, name: post.name } : null }
                    title={post.title}
                />
            );
        }

        return (
            <div>
                <section className={classes.posts}>
                    <h1>Latest 10 Posts</h1>
                    {allPosts}
                </section>
            </div>
        );
    }
}

export default Blog;