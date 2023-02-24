import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
// import MarvelService from './services/MarvelService';

// const marvelServices = new MarvelService();
// marvelServices.getAllCharacters().then(res=>res.data.results.forEach(item=>console.log(item.name)))
// marvelServices.getOneCharacters(1011097).then(console.log)


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

