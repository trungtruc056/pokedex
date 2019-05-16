import React, {Component} from 'react';
import PokemonCell from './pokemon-cell/pokemonCell';
import '../../styles/pokemonList.scss'
import {
    Container,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Col,
    Input
} from 'reactstrap';
import PokemonAPI from './pokemonAPI';

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            currentPage: 0,
            searchString: ''
        };
        this.pageSize = 60;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        PokemonAPI.getAll().then((res) => {
            this.setState({
                pokemonList: res.data.results
            })
        });
    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    handleChange(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    // sortNameAlphabetically(a, b) {
    //     const nameA = a.name.toUpperCase();
    //     const nameB = b.name.toUpperCase();
    //
    //     let comparison = 0;
    //     if (nameA > nameB) {
    //         comparison = 1;
    //     } else if (nameA < nameB) {
    //         comparison = -1;
    //     }
    //     return comparison;
    // }

    render() {
        const {currentPage} = this.state;
        let {pokemonList} = this.state;
        // pokemonList.sort(this.sortNameAlphabetically);
        let search = this.state.searchString.trim().toLowerCase();
        if (search.length > 0) {
            pokemonList = pokemonList.filter(cell => cell.name.toLowerCase().match(search));
        }
        this.pagesCount = Math.ceil(pokemonList.length / this.pageSize);

        return (
            <div className="pokemon-list">
                <Container>
                    <Row>
                        <Col lg="12" className="mb-4">
                            <Input
                                type="text"
                                value={this.state.searchString}
                                onChange={this.handleChange}
                                placeholder="Search Name Pokemon"
                            />
                        </Col>
                        {/*<Col lg={{size: 2, offset: 10}} className="mb-4">*/}
                        {/*    <Input type="select"*/}
                        {/*           name="select"*/}
                        {/*           id="exampleSelect">*/}
                        {/*        <option>A to Z</option>*/}
                        {/*        <option>Z to A</option>*/}
                        {/*    </Input>*/}
                        {/*</Col>*/}
                        <React.Fragment>
                            {pokemonList
                                // .sort()
                                .slice(
                                    currentPage * this.pageSize,
                                    (currentPage + 1) * this.pageSize
                                )
                                .map((cell, index) => (
                                    <PokemonCell key={index} item={cell}/>
                                ))
                            }
                            <Col md="12">
                                <div className="pagination-wrapper d-flex justify-content-center">
                                    <Pagination aria-label="Page navigation example">
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage - 1)}
                                                previous
                                                href="#"
                                            />
                                        </PaginationItem>
                                        {[...Array(this.pagesCount)].map((page, i) =>
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </Col>
                        </React.Fragment>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default PokemonList;