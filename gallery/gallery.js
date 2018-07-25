'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../scss/styles.scss';
import axios from 'axios';

const url = "http://paulinaszmid.pl/wp-json/wp/v2/";

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            images: []
        }
    }
    componentDidMount(){
        axios.get(url + "posts")
        .then(response => {
            var posts = response.data;
            //this.setState({posts:response.data});
            return Promise.all(posts.map((post)=>{
                return axios.get(url + "media/" + post.featured_media)
                .then(response => {
                    post.image = response.data;
                    return post;
                })
            }) 
            ).then(posts=> this.setState(prevState => ({
                posts: posts
            })
            )).catch((error)=> console.log(error))
        });
        
    }
    render(){
        const postList = this.state.posts.map(
            (post, index)=>{
                console.log(post);
                if(post!== undefined)
                    return <Post 
                    key={post.id} 
                    img={post.image.guid.rendered} 
                    title={post.title.rendered}/>
            }
        )
        return (
            <div className="post">
                <ul>
                    {postList}
                </ul>
            </div>
        )
    }
}


const Post = ({img, title}) => (
    <li className="post-item">
        <div className="post-title">
            <div className="title">{title}</div>
            {/* <div className="yellow-stripe"></div> */}
        </div>
        <img src={img}></img>
    </li>
)

ReactDOM.render(<Gallery/>, document.getElementById("gallery"));