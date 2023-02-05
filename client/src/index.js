import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UserContextProvider } from "./Contexts/UserContext";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import axios from "./api"

let user = null

axios({
  method: 'get',
  url: '/users/check-session'
}).then(response => {
    console.log(response)
    user = response.data
}).catch(function (error) {
  console.log(error);
}).then( () => {


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider user={user}>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
