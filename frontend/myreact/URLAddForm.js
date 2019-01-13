import React from 'react';
import { createBookmark } from '../myredux/actions/bookmarks';
import { store } from '../myredux/store/store';

// [TODO] Disable the submit button if there is no input

export default class URLAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        store.dispatch(createBookmark(this.state.value));
        this.setState({ value: '' });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    My bookmark URL:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
