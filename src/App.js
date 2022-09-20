import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import PokeListContainer from './components/pokeListContainer/PokeListContainer';
import NotFound from './components/notFound/NotFound'
import PokeDetail from './components/pokeDetail/PokeDetail'
import Header from './components/header/Header';
function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
    <Routes>
      <Route exact path='/'element={<PokeListContainer/>}/>
      <Route path='/detail'element={<PokeDetail/>}/>
      <Route path='*'element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
