import React, { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{


   // ПОДНЯТИЕ СОСТОЯНИЯ  : 1. создаем свойство в state
    state ={
        charSelected: null
    }
    ///////////
            listRef = React.createRef();

    // Создаем метод чтобі установить свойство через агргумент-(в данній момент id)
    onCharselected =(id)=>{
        this.setState({
            charSelected:id
        })
    }
    //////////

    
    

    
    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBaundary>
                        <RandomChar/>
                    </ErrorBaundary>
                  
                    <div className="char__content">
                    <ErrorBaundary>
                            <CharList listRef={this.listRef} charSelected={this.state.charSelected} onCharselected={this.onCharselected}/>
                    </ErrorBaundary>
                        
                    <ErrorBaundary>
                            <CharInfo charId ={this.state.charSelected}/>
                    </ErrorBaundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;