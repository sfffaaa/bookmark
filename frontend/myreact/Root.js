import React from 'react';
import Modal from './Modal';
import URLAddForm from './URLAddForm';
import RefrestBtn from './RefreshBtn';
import MyBookmarkList from './BookmarkList';
import { store } from '../myredux/store/store';
import { listBookmark } from '../myredux/actions/bookmarks';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        store.dispatch(listBookmark());
    }

    showModal() {
        this.setState({ show: true });
        store.dispatch(listBookmark());
    }

    hideModal() {
        this.setState({ show: false });
        store.dispatch(listBookmark());
    }

    render() {
        return (
            <main>
                <div style={{ textAlign: 'center' }}>
                    <h1>Hello World</h1>
                </div>
                <URLAddForm/>
                <RefrestBtn/>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                </Modal>
                <button type='button' onClick={this.showModal}>Open</button>
                <MyBookmarkList/>
            </main>
        );
    }
}
