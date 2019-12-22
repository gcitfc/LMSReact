"use strict"

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorAction';
import BookActions from '../actions/bookActions';
import BookStore from '../stores/bookStore';

export class CreateBook extends React.Component {

    constructor(props) {
        super(props);

        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            book_id : 0,
            title : '',
            author_id : 0,
            editType : this.props.editType
        }
    }

    componentDidMount(){
        if(this.props.editType == 1) {
            this.setState({
                book_id : this.props.location.state.book_id,
                title : this.props.location.state.title
            })
        }
        AuthorActions.readAuthors();
    }
    
    createInput(options) {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    Title:
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                </div>
                <div>
                    Author:
                    <Select
                        onChange={this.handleAuthorChange}
                        options={options}
                    />
                </div>              
                <div><input type="submit" value="Submit" /></div>
            </form>
        );
    }

    createUpdate(options, book) {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    Title:
                    <input type="text" defaultValue={book.title} onChange={this.handleTitleChange} />
                </div>
                <div>
                    Author:
                    <Select
                        onChange={this.handleAuthorChange}
                        options={options}
                    />
                </div>              
                <div><input type="submit" value="Submit" /></div>
            </form>
        );
    }

    handleTitleChange(input) {
        this.setState({ title : input.target.value });
    }

    handleAuthorChange(selectedOption) {
        this.setState({ author_id : selectedOption.value });
        //console.log(`Option selected:`, selectedOption);
    }

    handleSubmit(event) {
        if(this.state.editType == 0) {
            BookActions.createBook({
                book_id : this.state.book_id,
                title: this.state.title,
                author_id: this.state.author_id
            });
        }
        else if (this.state.editType == 1) {
            BookActions.updateBook({
                book_id : this.state.book_id,
                title: this.state.title,
                author_id: this.state.author_id
            });
        }
        
        event.preventDefault();
      }

    render() {
        let content = '';
        const options = [];

        if(this.props.author.readState.pending | this.props.book.createState.pending | this.props.book.updateState.pending ){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }

        if(this.props.author.readState.success){
            let list = this.props.author.authorList;
            let len = list.length;
            for (let i = 0; i < len; i++) {
                options.push({
                    value : list[i].author_id,
                    label : list[i].author_name
                });
            }
            if(this.props.editType == 0) {
                content = this.createInput(options);
            }
            else if (this.props.editType == 1) {
                content = this.createUpdate(options, {
                    book_id : this.props.location.state.book_id,
                    title : this.props.location.state.title
                });
            }
        }

        if(this.props.book.createState.success | this.props.book.createState.failure ) {
            content = this.props.book.info;
            BookStore.resetCreateState();
        }

        if( this.props.book.updateState.success | this.props.book.updateState.failure) {
            content = this.props.book.info;
            BookStore.resetUpdateState();
        }

        if(this.props.author.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading authors!
                </div>
            )
        }
        
        return (
            <div className='d-flex justify-content-center'>
                {content}
            </div>
        )
    }

}

CreateBook.propTypes = {
    author: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    editType: PropTypes.number.isRequired
};