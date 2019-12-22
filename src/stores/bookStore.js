import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _bookStore = {
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
    }
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }


    getAllBooks(){
        return _bookStore.book;
    }

    resetReadState(){
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetCreateState(){
        _bookStore.book.createState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetUpdateState(){
        _bookStore.book.updateState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetRemoveState(){
        _bookStore.book.removeState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books_successful':
            BookStore.resetReadState();
            _bookStore.book.bookList = action.data;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;
        case 'create_book_successful':
            BookStore.resetCreateState();
            _bookStore.book.info = action.data;
            _bookStore.book.createState.success = true;
            BookStore.emitChange();
            break;
        case 'create_book_failure':
            BookStore.resetCreateState();
            _bookStore.book.info = action.data;
            _bookStore.book.createState.failure = true;
            BookStore.emitChange();
            break;
        case 'create_book_started':
            BookStore.resetCreateState();
            _bookStore.book.createState.pending = true;
            BookStore.emitChange();
            break;
        case 'update_book_successful':
            BookStore.resetUpdateState();
            _bookStore.book.info = action.data;
            _bookStore.book.updateState.success = true;
            BookStore.emitChange();
            break;
        case 'update_book_failure':
            BookStore.resetUpdateState();
            _bookStore.book.info = action.data;
            _bookStore.book.updateState.failure = true;
            BookStore.emitChange();
            break;
        case 'update_book_started':
            BookStore.resetUpdateState();
            _bookStore.book.updateState.pending = true;
            BookStore.emitChange();
            break;
        case 'remove_book_successful':
            BookStore.resetRemoveState();
            _bookStore.book.info = action.data;
            _bookStore.book.removeState.success = true;
            BookStore.emitChange();
            break;
        case 'remove_book_failure':
            BookStore.resetRemoveState();
            _bookStore.book.info = action.data;
            _bookStore.book.removeState.failure = true;
            BookStore.emitChange();
            break;
        case 'remove_book_started':
            BookStore.resetRemoveState();
            _bookStore.book.removeState.pending = true;
            BookStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookStore;