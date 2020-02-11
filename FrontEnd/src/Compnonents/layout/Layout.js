import React, { Component } from 'react';
import Header from './../header/Header';
import Signup from './../signup/SignUp';
import { Route, withRouter} from 'react-router-dom';
import Home from './../home/Home';
import Account from './../account/Account';
import GameInfo from './../gameinfo/GameInfo';

class Layout extends Component {



    render() {
        // const Status = 'Home' | 'Account' | 'Game';
        
        // switch(Status){
        //     case "Home":

        //         break;
        // }
        let routes = (
            <React.Fragment>
                <Route exact path = "/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/account" component={Account}/>
                <Route path="/game-info" component={GameInfo}/>
            </React.Fragment>
        );
        // if(localStorage.getItem("loggedInUser")){
        //     routes = (
        //         <React.Fragment>
        //             <Route path="/home" component={Home, SearchBar}/>      
        //             <Route exact path="/" component={Home, SearchBar}/>
        //         </React.Fragment>
        //     )
        // }
        return (
            <div>
                <Header {...this.props}/>
                {routes}
                
            </div>
        );
    }
}

export default withRouter(Layout);