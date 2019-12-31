import React, { useContext } from "react";
import ReactDOM from "react-dom";
// import { ContextProvider, MyContext } from "./Context";

import "./styles.css";

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

function App() {
  const [user, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className="App">
      <h3>Lift up/Pass down state</h3>
      <MyContext.Provider value={{ user, dispatch }}>
        <UserList />
        {user.username && <AddGenderToUser />}
        {user.gender && <AddAgeToUser />}
      </MyContext.Provider>{" "}
    </div>
  );
}

function UserList(e) {
  const { user, dispatch } = useContext(MyContext);
  return (
    <div>
      <ul>
        <li>
          <span>Vimalraj Selvam</span>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: UPDATE_USER, username: "Vimalraj" })
            }
          >
            Edit
          </button>
        </li>
        <li>
          <span>Bhuvaneswari Vimalraj</span>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: UPDATE_USER, username: "Vimalraj" })
            }
          >
            Edit
          </button>
        </li>
      </ul>
    </div>
  );
}

function AddGenderToUser() {
  const { user, dispatch } = useContext(MyContext);

  return (
    <div>
      <h2>Add gender to {user.username}</h2>
      <button
        type="button"
        onClick={() => dispatch({ type: SET_GENDER, gender: "??" })}
      >
        Add Age
      </button>
    </div>
  );
}

function AddAgeToUser({ username }) {
  const { user, dispatch } = useContext(MyContext);
  return (
    <div>
      <h2>Add age to {user.username}</h2>
      <button onClick={() => dispatch({ type: "SET_AGE", age: "??" })}>
        Submit
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
