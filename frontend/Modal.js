import './Modal.css';
import React from 'react';
import PropTypes from 'prop-types';


export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.renderCSS = this.renderCSS.bind(this);
    }

    renderCSS() {
        return this.props.show ? 'modal display-block' : 'modal display-none';
    }

    render() {
        return (
            <div className={this.renderCSS()}>
                <section className='modal-main'>
                    {this.props.children}
                    <button onClick={this.props.handleClose}>close</button>
                </section>
            </div>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node,
};
