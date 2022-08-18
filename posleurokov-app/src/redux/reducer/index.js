import React from 'react'
import ReactDom from 'react-dom'

import { createStore } from 'redux/stores';


function reducer(state = { count: '' }, action) {
    switch (action.type) {
        case 'Add': return { count: state.count + action.amount };
        default: return state;
    }
};


export default reducer;