"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {Link} from 'react-router-dom';
import BookStore from '../stores/bookStore';

export class BookList extends React.Component{

    createBookRow(book){
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author_name} </td>
                <td> 
                    <button type="button" className="btn btn-outline-primary">
                    <Link to= {{
                        pathname : "/updateBook",
                        state : {
                            title : book.title,
                            book_id : book.book_id
                        }
                    }}  replace>E</Link>
                    </button> </td>
                <td> <button type="button" onClick={this.removeHandler.bind(this, book.book_id)} className="btn btn-outline-danger">D</button> </td>
            </tr>
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    removeHandler(book_id) {
        BookActions.removeBook(book_id)
    }

    render() {
        console.log(this.props.book.removeState.started)
        console.log(this.props.book.removeState.success)
        console.log('/')
        
        let content = '';

        const createButton = (
            <button type="button" className="btn btn-success">
                <Link to="/newBook" replace>New Book</Link>
                </button>
        );

        if(this.props.book.readState.pending | this.props.book.removeState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }


        if(this.props.book.removeState.success){
            content = this.props.book.info
            BookStore.resetRemoveState();
        }
        else if(this.props.book.readState.success){
            content = 
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.book.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
                <div>
                    <h1>Books {createButton}</h1>
                    {content}
                </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



