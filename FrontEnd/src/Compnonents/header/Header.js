import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class Header extends Component {


    state={
        user:{
            email: '',
            passsword: ''
        }
    }

    signOut = ()=>{
        localStorage.removeItem("loggedInUser");
        this.props.history.push("/home");
    }

    handleChange = (event)=>{
        const value = event.target.value;
        const name = event.target.name;
        const tempUser= {...this.state.user}
        tempUser[name] = value;
        this.setState
        (
            {
                user:tempUser
            }
        )
    }

    submitHandler = (event)=>{
        event.preventDefault();

        Axios.post('http://localhost:8080/loggingIn', this.state.user)
        .then(response=>{
            localStorage.setItem('loggedInUser', response.data.email);
            this.props.history.push('/home');
        })
        .catch((error) =>{
            console.log("something wrong");
            alert('Wrong email or password');
        })
    }


    render() {
        let signIn = (
            <form onSubmit={this.submitHandler} className="form-inline w3-right mt-2 mt-md-0">
                
                <input onChange={this.handleChange} value={this.state.email} name="email" className=" w3-hide-small w3-right w3-padding-large inputs" type="email" placeholder="Email" aria-label="Search" />
                <input onChange={this.handleChange} value={this.state.password} name="password" className="w3-hide-small w3-right w3-padding-large inputs" type="password" placeholder="Password" aria-label="Search" />
                <button className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-theme" type="submit">Sign In</button>
                {/* <button className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-small w3-hover-white" type="submit">Sign In</button> */}
            </form>
        )
        if(localStorage.getItem("loggedInUser")){
            signIn = (
                <div className="">

                    <button onClick={this.signOut} className="w3-bar-item w3-button w3-padding-large w3-theme w3-right" type="submit">Sign Out</button>
                </div>
                
            )
        }
        return (
            <div className="w3-top">
                <div className="w3-bar w3-theme-l1 w3-left-align w3-large header">
                    <Link  className="w3-bar-item w3-theme w3-button w3-padding-large" to="/home">Game Voucher</Link>
                    {signIn}
                </div>
            </div>
        );
    }
}

export default Header;