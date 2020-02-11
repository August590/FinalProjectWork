import React, { Component } from 'react';
import SearchBar from './searchbar/SearchBar';
import WishlistCard from './wishlist/WishlistCard';
import NewsCard from './newsInfo/NewsCard';
import SignUp from './../signup/SignUp';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Cors from 'cors';
import { logDOM } from '@testing-library/react';
import Logo from './../../Images/logo.png'
// const express = require('express')
// const cors = require('cors')
// const app = express()
 
// app.use(cors())
class Home extends Component {

    state={
        gameInfo:{
            id: 1,
            name: 'Grim Dawn'
        }
    }



    render() {

        let signedIn = (
                <SignUp {...this.props}/>
        )
        if(localStorage.getItem("loggedInUser")){
            signedIn = (
                <>
                    <h3 className="center ">Your Wishlist</h3>
                    <div className="wishList ">
                        <WishlistCard/>
                        
                    </div>
                </>
            )
        }
        return (
            <div>
                <div className="titleText">
                    <img src={Logo} width="100px"/>
                    <h1>Game Voucher</h1>
                </div>
                <SearchBar/>
                {signedIn}
            </div>
        );
    }
}

export default Home;