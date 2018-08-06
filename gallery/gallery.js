'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import '../scss/styles.scss';
import axios from 'axios';

const url = "http://paulinaszmid.pl/wp-json/wp/v2/";

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            visiblePosts: [],
            images: [],
            categories: [],
            selectedCategory: ''
        }
        this.filterPostsByCategory = this.filterPostsByCategory.bind(this);
    }
    filterPostsByCategory(categoryId){
        const selectedCategory = this.state.categories.find(x=>x.id === categoryId);
        this.setState(prevState => ({
            selectedCategory: selectedCategory.name.toLowerCase()
        }))
        let posts = this.state.posts.filter(x=>x.categories.includes(categoryId))
        if(posts === undefined)
            posts = [];
        this.setState(prevState => ({
            visiblePosts: posts
        }))
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
            ).then(
                posts=> {this.setState(prevState => ({
                    posts: posts,
                    visiblePosts: posts
            })
            )
        }
        ).catch((error)=> console.log(error))
        }),
        axios.get(url+"categories").then(response=> this.setState(prevState => ({
            categories : response.data,
            selectedCategory : response.data[0].name
        })))
    ).then(axios.spread());
        
    }
    render(){
        const postList = this.state.visiblePosts.map(
            (post, index)=>{
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
            <div>
                <Dropdown 
                list={this.state.categories} 
                selectedCategory = {this.state.selectedCategory}
                filterPostsByCategory={this.filterPostsByCategory}/>
                <div className="post">
                    
                    <ul>
                        {postList}
                    </ul>
                </div>
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

class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }
    toggleList(){
        var arrow = document.getElementById('dropdown-arrow');
        if(arrow.className === "rotated")
            arrow.className = "";
        else
            arrow.className += "rotated";

        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    render(){
        const{list, selectedCategory} = this.props;
        const{listOpen} = this.state;
        return(
            <div className="dd-wrapper">
                <div className="dd-header">
                    <h1>
                        <div className="yellow-background">Show</div> me 
                    </h1>
                <div className="dd-arrow"  onClick={()=> this.toggleList()}>
                    <img id="dropdown-arrow" src="./img/dropdown-arrow.svg"/>
                </div>
                <div className="dd-selectedItem">{selectedCategory}</div>
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map(item => (
                        <li className="dd-list-item" key={item.id} onClick={() => this.props.filterPostsByCategory(item.id)} >{item.name}</li>
                    ))}
                </ul>}
            </div>
        )
    }
}

// const Dropdown = (props) => (
//     <div>
//         <h1>
//             <div class="yellow-background">Show</div> me .......
//         </h1>
//     </div>
// )

ReactDOM.render(<Gallery/>, document.getElementById("gallery"));