import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GamePriceLinks extends Component {



    render() {
        console.log(this.props.gameRefName);
        return (
            <ul className="singleBlock">
                <li>{this.props.gameDistributer}</li>
                <li>{this.props.priceSymbol}{this.props.gamePrice}</li>
                <li><a href={this.props.webLink} target="_blank">{this.props.gameRefName}</a></li>
             </ul>
        );
    }
}

export default GamePriceLinks;

//const appid = require("appid");



// const PriceChoices = (props) =>{
//     <li key={r.id}>
//         <h3>{props.gameDistributer}</h3>
//         <Link>r.name</Link>
//     </li>
// }
//  export default GamePriceLinks;



// const Suggestions = (props) => {

//     const options  = props.items.map(r =>(
        
//         <li key={r.id}>
//             <Link to={{pathname: "/game-Info",
//             state: {
//                 gameName: r
//             }
//             }}>{r.name}</Link>
//         </li>
//     ));
//     return <ul>{options}</ul>
// }