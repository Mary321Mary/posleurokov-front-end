import reducer from 'redux/reducer/index';


export function createStore(reducer, initialState) {
    let state = initialState;
    let callbacks = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(callbacks => callbacks());
    }
    const subscribe = callbacks => {
        callbacks.push(callbacks)
        return () => callbacks.filter(cb => cb !== callbacks)
    }

    dispatch({})

    return { getState, dispatch, subscribe };
}
const initialState = { count: '' };

export const store = createStore(reducer, initialState)


// class Store {
//     constructor(updateState, state) {
//         this._updateState = updateState;
//         this._state = state;
//         this._callbacks = []
//     }
//     update(action) {
//         this._state = this._updateState(this._state, action);
//         this._callbacks.forEach(callbacks => callbacks());
//     }

//     subscribe(callbacks) {
//         this._callbacks.push(callbacks);
//         return () => this._callbacks = this.callbacks.filter(cb => cb !== callbacks);
//     }
// }


