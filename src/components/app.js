"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {BookList} from '../components/BookList';
import {AuthorList} from '../components/AuthorList'
import {CreateBook} from '../components/CreateBook';
import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore.js';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            book:{
                bookList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                createState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                updateState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                removeState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                info: '',
                error: ''
            },
            author:{
                authorList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            },
            editType : -1
        }
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<BookList {...props} book={this.state.book} />)}/>
                    <Route path='/authors' render={(props) => (<AuthorList {...props} author={this.state.author} />)}/>
                    <Route path='/newBook' render={(props) => (<CreateBook {...props} editType={0} author={this.state.author} book={this.state.book} />)}/>
                    <Route path='/updateBook' render={(props) => (<CreateBook {...props} editType={1} author={this.state.author} book={this.state.book}/>)}/>
                    <Route path='/removeBook' render={(props) => (<CreateBook {...props} editType={2} author={this.state.author} book={this.state.book}/>)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    _onBookChange(){
        this.setState({book: BookStore.getAllBooks()});
    }
    _onAuthorChange(){
        this.setState({author: AuthorStore.getAllAuthors()});
    }
}