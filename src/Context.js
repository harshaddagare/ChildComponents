import React, { useReducer } from "react";

const initialState = {
  username: null,
  gender: null,
  age: null
};

const UPDATE_USER = "UPDATE_USER";
const SET_GENDER = "SET_GENDER";
const SET_AGE = "SET_AGE";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        username: action.username,
        gender: null,
        age: null
      };
    case SET_GENDER:
      return {
        username: state.username,
        gender: action.gender,
        age: null
      };
    case SET_AGE:
      return {
        username: state.username,
        gender: state.gender,
        age: action.age
      };
    default:
      return initialState;
  }
};
const MyContext = React.createContext(null);

function ContextProvider(props) {
  const [user, dispatch] = React.useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ user, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
}

export { ContextProvider, MyContext };
