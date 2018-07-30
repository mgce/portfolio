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
            images: [],
            categories: [],
        }
    }
    componentDidMount(){

        axios.all(
        axios.get(url + "posts?status=publish&per_page=11")
        .then(response => {
            var posts = response.data;
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
        }),
        axios.get(url+"categories").then(response=> this.setState(prevState => ({
            categories : response.data
        })))
    ).then(axios.spread());
        
    }
    render(){
        const postList = this.state.posts.map(
            (post, index)=>{
                console.log(post);
                if(post!== undefined)
                    return <Post 
                    key={post.id} 
                    link={post.link}
                    img={post.image.guid.rendered} 
                    title={post.title.rendered}
                    postCategory={post.categories}
                    allCategoryList={this.state.categories}/>
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


const Post = ({img, link, title, postCategory, allCategoryList}) => {
    var selectCategoryForPost = function(){
        var temp = [];
        for(var i = 0; i < postCategory.length; i++){
            if(postCategory[i] === 1)
                continue;
            var category = allCategoryList.find(x=>x.id === postCategory[i])
            temp = [...temp, category.name];
        }
        return temp;
    }
    var categoryToDisplay = selectCategoryForPost()
    return(
        <li className="post-item">
        <a href={link}>
        <div className="post-title">
            <div className="title">
                {title}
                {categoryToDisplay.map((category, index) => <p key={index}>{category}</p>)}
            </div>
        </div>
        </a>
        <img src={img}></img>
    </li>
    )
    
}

ReactDOM.render(<Gallery/>, document.getElementById("gallery"));