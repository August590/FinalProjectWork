import React, { Component } from 'react';
import GameInfoBlock from './gameInfoblock/GameInfoBlock';
import GamePriceLinks from './gamePriceLinks/GamePriceLinks';
import Axios from 'axios';
import Logo from './../../Images/logo.png'

const appid = require("appid");
class GameInfo extends Component {

    state = {
        steamItem: [],
        gogItem: [],
    }
    componentWillMount(){
        this.testRun();
        this.getGOGGame();
        //this.testRun();
    }
    async testRun(){
        console.log(`${this.props.location.state.gameName.name}`);
        
        let dota = await appid(`${this.props.location.state.gameName.name}`);
        console.log(dota);
        if(dota != null){
        
        //console.log(await appid(`${this.props.location.state.gameName.name}`))
        console.log(dota);
        console.log(dota.appid);
            let dotaID = dota.appid;
            Axios.get(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/?appids=${dota.appid}`)
            .then(response => {
                if(response.data[dotaID].data.price_overview != null){
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data[dotaID].data.price_overview.final);
                    console.log(response.data[dotaID].data.price_overview.final, response.data[dotaID].data.price_overview.initial);
                }
                // return response.data[dotaID].data; 
                    //gameDistributer="Steam"/>
                    this.setState({
                        steamItem: response.data[dotaID].data
                    })
                    console.log(this.state.steamItem);
            });
        }
        //this.getGOGGame();
    }

    async getGOGGame(){
        Axios.get(`https://cors-anywhere.herokuapp.com/http://embed.gog.com/games/ajax/filtered?mediaType=game&search=${this.props.location.state.gameName.name}`)
        .then(response => {
            console.log(response);
            // return this.props.location.state.gameName.name; 
            for(let i = 0; i < response.data.products.length; i++){
                if(response.data.products[i].title == this.props.location.state.gameName.name){
                    this.setState({
                        gogItem: response.data.products[i]
                    })
                }
            }
            // this.setState({
            //     gogItem: this.props.location.state.gameName.name
            // })
        });
    }
    render() {
        console.log(this.state.steamItem);
        console.log(this.state.gogItem);
        let steamStuff = "";
        let gogStuff = "";
        if(this.state.steamItem.length == 0){
            console.log("I am not Going Steam");
        }
        else{
            console.log("I am Going Steam");
            if(this.state.steamItem.price_overview != null){
            steamStuff = <GamePriceLinks webLink ={`https://store.steampowered.com/app/${this.state.steamItem.steam_appid}`} priceSymbol="" 
            gameRefName ={this.state.steamItem.name} gamePrice={this.state.steamItem.price_overview.final_formatted} gameDistributer="Steam"/>;
            }
            else{
                steamStuff = <GamePriceLinks webLink ={`https://store.steampowered.com/app/${this.state.steamItem.steam_appid}`} priceSymbol="" 
            gameRefName ={this.state.steamItem.name} gamePrice={"free"} gameDistributer="Steam"/>;
            }
           
        }
        if(this.state.gogItem.length == 0){
            console.log("I am not Going Gog");
        }
        else{
            console.log("I am Going Gog");
            gogStuff = <GamePriceLinks webLink ={`https://www.gog.com${this.state.gogItem.url}`}  
            priceSymbol={this.state.gogItem.price.symbol} gameRefName ={this.state.gogItem.title} gamePrice={this.state.gogItem.price.finalAmount} gameDistributer="GOG"/>;
        }

        // if(this.state.gogItem.price.finalAmount > (this.state.steamItem.price_overview.final/100)){
        //     const tempState = {...this.state.wishList}
        //     tempState[2] = this.state.gogItem.price.finalAmount;
        //     this.setState({
        //         wishList:tempState
        //     })
        // }
        // else{
        //    const  tempState = {...this.state.wishList}
        //     tempState[2] = (this.state.steamItem.price_overview.final/100);
        //     this.setState({
        //         wishList:tempState
        //     })
        // }
        return (
            <div >
                       {/* <div className="leftImage">
                        {leftImage}
                    </div>
                    <div className="rightImage">
                        {rightImage}
                    </div> */}
                <div >
                <div className="titleText">
                    <img src={Logo} width="100px"/>
                    <h1>Game Voucher</h1>
                </div>
                    <GameInfoBlock gameInfo={this.props.location.state.gameName}/>
                {/* <GamePriceLinks gameRefName={this.props.location.state.gameName.name}/> */}
                    
                    {/* <table className="tableOfSellers">
                        <tr>
                            <th>Seller</th>
                            <th>Price</th>
                            <th>Link</th>
                        </tr>
                            {steamStuff}
                            {gogStuff}
                    </table> */}
                    <div className="flex-container">
                        <div>{steamStuff}</div>
                        <div>{gogStuff}</div>

                    </div>
                </div>
    
            </div>
        );
    }
}

export default GameInfo;