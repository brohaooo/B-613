import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//??????
import { BrowserRouter } from "react-router-dom";


//i cannot include it, but it still works well without it
//import * as serviceWorker from "./serviceWorker";

//hook is here...
import { useState } from "react";




ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);




/*
function tick() {
  const element = (
    <div>
      <h1>现在是 {new Date().toLocaleTimeString()}.</h1>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('example')
  );
}
 
setInterval(tick, 1000);
*/


//自己乱写的，随便试试
function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
      <div>
      Current Cart Count: {count}
          <div>
          <button onClick={() => setCount(count - 1)}>Add to cart</button>
          <button onClick={() => setCount(count + 1)}>Remove from cart</button>
          </div>
      </div>
  );
}


ReactDOM.render(
  <BrowserRouter>
    <Counter />
  </BrowserRouter>,
  document.getElementById('example')
);




//???????????
//serviceWorker.unregister();




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
