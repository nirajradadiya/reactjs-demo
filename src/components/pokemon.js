import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Pokemon = ({ pokemon }) => (

  // <li className="pokemons__item">
  //   <button
  //     type="button"
  //     className="pokemons__sprite"
  //     style={{
  //       backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`})`
  //     }}
  //   />
  //   <p className="pokemons__name">{pokemon.name}</p>
  // </li>
  <MuiThemeProvider>
      <TableRow>
        <TableRowColumn><img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.id+".png"} /></TableRowColumn>
        <TableRowColumn>{pokemon.name}</TableRowColumn>
      </TableRow>
  </MuiThemeProvider>
)

export default Pokemon
