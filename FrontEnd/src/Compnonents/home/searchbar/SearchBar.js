import React, { Component } from 'react';
import Axios from 'axios';
import Suggestions from './suggestions/Suggestions';

//const { API_KEY } = '29E2F9718C66A7C0545E3C6882ABE0EA';
//const { API } = '';
const appid = require("appid");
class SearchBar extends Component {
    state = {
        query: '',
        items: [],
        allItems: []
    }

    getInfo = () =>{
        Axios({
            url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '9228051aa3584afc60ae39330497be33'
            },
            data: `fields *;  where name ~ "${this.state.query}"* & parent_game = null; limit 7;`
            
        })
        .then(response => {
            

            console.log(response.data);
            this.setState({
                items: response.data
            })
            //console.log(this.state.items[0].name);
        })
        // Axios.get(`https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=29E2F9718C66A7C0545E3C6882ABE0EA`)
        // .then(({data}) => {
        //     const filteredList = this.state.allItems
        //         .filter((elem, index) => {
        //             console.log(elem.name.indexOf(this.state.query), this.state.query);
        //             return elem.name.indexOf(this.state.query, 0) != -1;
        //         })
        //         .filter((elem, index) => {
        //             return index <= 7;
        //         })
        //     // Axios.post('http://localhost:8080/dataSifter', data.applist.apps, this.state.query)
        //     this.setState({
        //         items:filteredList
        //     })
            
        // });
        // const filteredList = this.state.allItems
        // .filter((elem, index) => {
        //     console.log(elem.name.indexOf(this.state.query), this.state.query);
        //     return elem.name.indexOf(this.state.query, 0) != -1;
        // })
        // .filter((elem, index) => {
        //     return index <= 7;
        // })
        //     // Axios.post('http://localhost:8080/dataSifter', data.applist.apps, this.state.query)
        // this.setState({
        //     items:filteredList
        // })
    }
    // componentDidMount(){
    //     this.testRun();
    // }
    // async testRun(){
    //     let dota = await appid("Valley Run");
    //     console.log(dota.appid);
    // }
    // return new Promise((resolve, reject) => {
    //     request(options).then(data => {
    //       data = JSON.parse(data);
    //       resolve(data.applist.apps.filter(a => a.name === name)[0]);
    //     }).catch(e => reject(e));
    //   })
    // sendInfo = (dataToSend) => {
    //     Axios.post('http://localhost:8080/dataSifter', dataToSend)
    //     .then(response =>{
    //         this.setState({
    //             items: response
    //         })
    //     })
    // }
    // Axios.post('http://localhost:8080/submitUserInfoDetails', this.state.user)
    // .then(response =>{
    //     localStorage.setItem("loggedInUser", response.data.email);
    //     this.props.history.push('/account');
    // }).catch(error =>{
        
    //     //console.log("this is happening");
    // })
    handleInputChange = (e) =>{
        console.log('beginning of handle input', e.target.value);
        this.setState ({
            query: e.target.value
        }, () => {
            if(this.state.query && this.state.query.length >= 3){
                if(this.state.query.length % 2 === 0){
                    this.getInfo()
                }
            }
            else if (!this.state.query){
                console.log('if check at handle input');
                this.setState({
                    items: []
                })
            }
        });
    }

    render() {
        return (
            <div className="w3-container">
  
                <form className="searchBar">
                    <input type="text" placeholder="Game Name" onChange={this.handleInputChange} name="search" className="searchBarInput"/>
                    {/* <button type="submit" className="searchBarInput" onClick={this.getInfo}><i className="fa fa-search"></i></button> */}
                   
                    <Suggestions items={this.state.items}/>
                </form>
            </div>
        );
    }
}

export default SearchBar;