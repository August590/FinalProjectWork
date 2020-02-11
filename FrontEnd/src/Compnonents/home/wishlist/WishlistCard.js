import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const appid = require("appid");
class WishlistCard extends Component {
    state = {
        games: [],
        gameInfo: {
            name: "",
            bestPrice: "",
            seller: "",
            page: "",
            img: ""
        },
        steamGame: [],
        gogGame: [],
        user: [],
        gameComp:[]

    }
    getData(gameCall){
        return new Promise((resolve, reject) => {
            Axios.get(`${gameCall}`)
            .then((data) => {
                resolve(data)
                console.log(data);
                //this.setState({steamGame: data})
            })
        })
    }
    componentWillMount(){
        console.log(this.state.gameComp);
        const email = localStorage.getItem("loggedInUser");
        const params = {
             email: email
        }
        // this.getData(`https://cors-anywhere.herokuapp.com/http://embed.gog.com/games/ajax/filtered?mediaType=game&search=Grim Dawn`);
        // this.getData(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/?appids=219990`);
        console.log(email);
        console.log({params});
        Axios.get("http://localhost:8080/getID", {params})
        .then( response =>{
            if(response.data != null){
                console.log("changing state");
                this.setState({
                    user: response.data
                })
                console.log(this.state.user);
                
                const userID = this.state.user.id;
                console.log(userID);
                const userIDObj = {
                    userID: userID
                }
                
                console.log({userIDObj});
                Axios.get(`http://localhost:8080/userGames?userID=${userID}`)
                .then(response => {
                    this.setState({
                        games: response.data
                })
                //this.getGames();
                this.getApiID();
                })
            }
            
        })
        
    }
    async getGames(){
        for(let i = 0; i < this.state.games.length; i++){
            let dota = await appid(`${this.state.games[i].name}`);
            console.log(dota);
            //await this.getData(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/?appids=${dota.appid}`);
            // this.setState({steamGame: await this.getData(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/?appids=${dota.appid}`)})
            
            console.log(this.state.steamGame);
        }
    }
    async getApiID(){
        console.log(this.state.games.length);
        if(this.state.games.length != 0){
            for(let i = 0; i < this.state.games.length; i++){
                console.log(this.state.games.length, "inside of for statement");
                
                console.log(this.state.gameInfo);
                let dota = await appid(`${this.state.games[i].name}`);
                console.log(dota);
                //
                this.setState({steamGame: await this.getData(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/?appids=${dota.appid}`)})
                this.setState({gogGame: await this.getData(`https://cors-anywhere.herokuapp.com/http://embed.gog.com/games/ajax/filtered?mediaType=game&search=${this.state.games[i].name}`)})
                console.log(this.state.steamGame);
                for(let j = 0; j < this.state.gogGame.data.products.length; j++){
                    console.log(this.state.gogGame.data.products[j]);
                    if(this.state.gogGame.data.products[j].title == this.state.games[i].name){
                        this.setState({gogGame: this.state.gogGame.data.products[j]})
                        console.log(this.state.gogGame);
                        break;
                        
                    }
                }

                if(this.state.steamGame.data[dota.appid].data.price_overview.final/100 <= this.state.gogGame.price.finalAmount){
                const tempState = {...this.state.gameInfo}
                tempState["bestPrice"] = this.state.steamGame.data[dota.appid].data.price_overview.final/100;
                tempState["seller"] = "Steam";
                tempState["page"] = `https://store.steampowered.com/app/${this.state.steamGame.data[dota.appid].data.steam_appid}`
                tempState["name"] = this.state.steamGame.data[dota.appid].data.name;
                tempState["img"] = this.state.steamGame.data[dota.appid].data.header_image;
                this.setState({
                    gameInfo: tempState
                })
                //this.state.gameComp.push(this.state.gameInfo);
                }
                else{
                    const tempState = {...this.state.gameInfo}
                    tempState["bestPrice"] = this.state.gogGame.price.finalAmount;
                    tempState["seller"] = "Gog";
                    tempState["page"] = `https://www.gog.com${this.state.gogGame.url}`
                    tempState["name"] = this.state.gogGame.title;
                    tempState["img"] = this.state.steamGame.data[dota.appid].data.header_image;
                    this.setState({
                        gameInfo: tempState
                    })
                    console.log(this.state.gameInfo, "End of else price check statement");
                    //this.state.gameComp.push(this.state.gameInfo);
                }
                
                let temp = this.state.gameComp;
                temp.push(this.state.gameInfo);
                console.log(this.state.gameComp);
                this.setState({gameComp: temp});
                
            }
        }
        
    }
    render() {
        return (
            
            this.state.gameComp.map ((gameComp, index) => {
                console.log("in map :>> ",gameComp.name, index);
                return(
                    <div className="Card">
                        <h3>{gameComp.name}</h3>
                        <img src={gameComp.img}></img>
                        <h5>{gameComp.seller}</h5>
                        ${gameComp.bestPrice}
                        <br/>
                        <a href={gameComp.page} target="_blank" className="aCard">{gameComp.name}</a>
                    </div>
                )
            })

            
        );
    }
}

export default WishlistCard;