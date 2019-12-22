import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(`http://localhost:8070/book`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },

    createBook: function(book) {
        Dispatcher.dispatch({
            actionType: 'create_book_started'
        });
        axios.post('http://localhost:8070/book', {
            title : book.title,
            author_id : book.author_id
        }).then(res =>  {
            Dispatcher.dispatch({
                actionType: 'create_book_successful',
                data: res.data
            });
        }).catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'create_books_failure'
            });
        })
    },

    updateBook: function(book) {
        console.log(book)
        Dispatcher.dispatch({
            actionType: 'update_book_started'
        });
        axios.put('http://localhost:8070/book', {
            book_id : book.book_id,
            title : book.title,
            author_id : book.author_id
        }).then(res =>  {
            Dispatcher.dispatch({
                actionType: 'update_book_successful',
                data: res.data
            });
        }).catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_books_failure'
            });
        })
    },

    removeBook: function(book_id) {
        Dispatcher.dispatch({
            actionType: 'remove_book_started'
        });
        axios.delete('http://localhost:8070/book/' + book_id).then(res =>  {
            Dispatcher.dispatch({
                actionType: 'remove_book_successful',
                data: res.data
            });
        }).catch( (error) => {
            Dispatcher.dispatch({
                actionType: 'remove_books_failure'
            });
        })
    }
}

module.exports = BooksActions;