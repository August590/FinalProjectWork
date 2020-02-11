import React, { Component } from 'react';
import Axios from 'axios';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
class GameInfoBlock extends Component {

    state = {
        gameInfo: this.props.gameInfo,
        image: "",
        wishList: {
            id: 0,
            name: ""

        },
        user: []
    }
    componentDidMount(){
        Axios({
            url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '9228051aa3584afc60ae39330497be33'
            },
            data: `fields image_id; where id = ${this.state.gameInfo.cover};`
            
        })
        .then(response => {
            
            console.log(this.state.gameInfo);
            console.log(response.data);
            console.log(response.data[0].image_id);
            this.setState({
                image: `https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[0].image_id}.jpg`
            })
            
        })
        console.log(localStorage.getItem("loggedInUser"));
        const email = localStorage.getItem("loggedInUser");
        const params = {
             email: email
        }
        console.log({params})
    
        Axios.get("http://localhost:8080/getID", {params})
        .then(response => {
            
            this.setState({
                user: response.data
            })
            
            const tempState = {...this.state.wishList}
            console.log(tempState['id']);
            console.log(tempState['name']);
            tempState['id'] = this.state.user.id;
            tempState['name'] = this.state.gameInfo.name;
            console.log(tempState['id']);
            console.log(tempState['name']);
            console.log(this.state.wishList);
            this.setState({
                wishList: tempState
            })
            console.log(this.state.wishList);
        })
        .catch((error ) => {
            console.log("this shit aint working");
        })
    }

    submitHandler = (event) => {
        Axios.post("http://localhost:8080/submitWishList", this.state.wishList)
        .then(response=>{
            console.log("hello world 1.0");
            window.location.reload(false);
            this.props.history.push('/home');
        })

    }
    render() {
        let wishListLink = "";
        if(this.state.user != null){
            wishListLink = <Link type="button" to= "/home" onClick={this.submitHandler}>Add to Wishlist</Link>
        }
        return (
            <div className="">
                <br/>
                <br/>
                {/* <div className="gameImg">
                    <img src={this.state.image}   width="30%"></img>
                    </div> */}
                    
                <div className="game-info container">
                    <img src={this.state.image} className="gameImg"/> 
                    <h1>{this.state.gameInfo.name}</h1>
                    {/* <img>Game Image</img> */}
                    <NumberFormat value={this.state.gameInfo.rating} displayType={'text'} decimalScale={2} renderText={value => <div className="Rating">Rating: {value}</div>} />
                    {/* <h3>Rating: {this.state.gameInfo.rating}</h3> */}
                    <br/>
                    <p>{this.state.gameInfo.summary}</p>
                    {/* <img>Link Icon</img> */}
                    {wishListLink}
                </div>
            </div>
        );
    }
}

export default GameInfoBlock;