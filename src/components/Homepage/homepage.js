import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PokemonList from "./pokemon-list/pokemonList";
import PokemonDetail from "./pokemon-list/pokemon-cell/pokemonDetail"

class HomePage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={PokemonList}/>
                <Route path='/pokemon/:name' component={PokemonDetail}/>
            </Switch>
        );
    }
}

export default HomePage;