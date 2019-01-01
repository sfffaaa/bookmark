import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { store } from './myredux/store/store';

window.store = store;

function showMe() {
    console.log(store.getState());
}

store.subscribe(showMe);

ReactDOM.render(
    <Root></Root>,
    document.getElementById('root'),
);
