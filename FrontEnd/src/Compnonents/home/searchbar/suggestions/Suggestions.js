import React from 'react';
import { Link } from 'react-router-dom';

const lengthLimit = 7;
let lengthChecker =0;
const Suggestions = (props) => {

    const options  = props.items.map(r =>(
        
        <li key={r.id}>
            <Link to={{pathname: "/game-Info",
            state: {
                gameName: r
            }
            }}>{r.name}</Link>
        </li>
    ));
    return <ul className="searchDeal">{options}</ul>
}

export default Suggestions