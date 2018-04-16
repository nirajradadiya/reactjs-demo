import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pokemon from '../components/pokemon'
import Search from '../components/search'
import * as pageActions from '../action'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'

class Page extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    console.log('id',event.target.id);
    var x = document.querySelectorAll("li");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].className = "";
    }
    document.getElementById(event.target.id).className = "active";
  }

  componentDidMount() {
    this.props.pageActions.fetchPokemons();
  }

  handleSearch(e) {
    this.props.pageActions.filterPokemons(e.target.value)
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    let { displayedPokemons, isFetched } = this.props.page

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = displayedPokemons.slice(indexOfFirstTodo, indexOfLastTodo);

    let pokemons = currentTodos.map((pokemon, index) => {
      return <Pokemon pokemon={pokemon} key={index} />
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(displayedPokemons.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          class={number == 1 ? 'active' : ''}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <div className="search-box">
        <Search onChange={this.handleSearch.bind(this)} />
        </div>
          {
            isFetched
            ?
            <div className="loader"><MuiThemeProvider><CircularProgress /></MuiThemeProvider></div>
            :
            <MuiThemeProvider>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn><b>Avatar</b></TableHeaderColumn>
                <TableHeaderColumn><b>Pokemon Name</b></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
            {pokemons}
            </TableBody>
            </Table>
            </MuiThemeProvider>
          }
          <div id="page-numbers">
          <ul>
            {renderPageNumbers}
          </ul>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
