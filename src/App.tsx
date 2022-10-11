import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Login} from "./views/login/Login";
import {Lista} from "./views/lista/Lista";
import store from "./Store";
import {Album} from "./views/album/Album";


function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/lista" element={<Lista/>}/>
                  <Route path="/album/:idUser" element={<Album/>}/>
              </Routes>
          </BrowserRouter>
      </Provider>

  );
}

export default App;
