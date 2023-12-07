const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });


// Reducer
const initialState = { count: 0 };

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      if(state.count != initialState )
      return { count: state.count + 1 };
    case DECREMENT:
      if(state.count <= 0 )
      {
       return initialState;
      }
      else
      {
      return { count: state.count - 1 };
      }
    default:
      return state;
  }
}