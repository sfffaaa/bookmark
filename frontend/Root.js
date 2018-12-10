import React from 'react';
import Modal from './Modal';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };

        //
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({ show: true });
    }

    hideModal() {
        this.setState({ show: false });
    }

    render() {
        return (
            <main>
                <div style={{ textAlign: 'center' }}>
                    <h1>Hello World</h1>
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                </Modal>
                <button type='button' onClick={this.showModal}>Open</button>
            </main>
        );
    }
}