'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fullName: "",
            email: "",
            textArea: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState)
    }
    render(){
        return(
        <div>
            <form className="contact-form">
                <ul>
                    <li>
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                        name="fullName" 
                        type="text" 
                        tabIndex="1"
                        value={this.state.fullName}
                        onChange={this.handleChange}/>
                    </li>
                    <li>
                        <label htmlFor="email">Email address</label>
                        <input 
                        name="email" 
                        type="text" 
                        tabIndex="2"
                        value={this.state.email}
                        onChange={this.handleChange}/>
                    </li>
                    <li>
                        <label htmlFor="textArea">Message</label>
                        <textarea 
                        name="textArea" 
                        tabIndex="3"
                        value={this.state.textArea}
                        onChange={this.handleChange}/>
                    </li>
                </ul>
            </form>
        </div>
    )
    }
}

ReactDOM.render(<ContactForm/>, document.getElementById("contactForm"));