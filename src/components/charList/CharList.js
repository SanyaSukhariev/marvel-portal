import { Component } from 'react';

import PropTypes from 'prop-types';
import ErrorMesssage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';



import './charList.scss';


class CharList extends Component {
   


    state ={
        charList :[],
        loading:true,
        error:false,
        offset:210,
        newItemLoading:false,
        charEnded:true
    }
   
    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
        .then(this.onChangeCharacters)
        .catch(this.onError)


        //////work with the keyboard
        const item = this.props.listRef.current.querySelectorAll('li');
        console.log(item)
        this.items = Array.from(item)

        if (this.items.length > 0) {
            this.items[0].focus();
          }


    
        //////
    }

      //////work with the keyboard

    handleKeyDown = (event, index) => {
        if (event.key === 'ArrowUp' && index > 0) {
          // Move focus to previous element
          this.items[index - 1].focus();
        } else if (event.key === 'ArrowDown' && index < this.items.length - 1) {
          // Move focus to the next element
          this.items[index + 1].focus();
        }
      }
        //////

    onRequest =(offset)=>{
        this.onCharListLoaded();
        this.marvelService.getAllCharacters(offset)
        .then(this.onChangeCharacters)
        .catch(this.onError)
    }
    
    onChangeCharacters =(newCharList)=>{
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
           this.setState(({offset,charList})=>({
            charList:[...charList,...newCharList],
            loading: false,
            offset: offset + 9,
            newItemLoading:false,
            charEnded: ended

           }))
    

    }
    onCharListLoaded =()=>{
        this.setState({
            newItemLoading:true
        })
    }
    onError =()=>{
        this.setState({
            loading:false,
            error:true
        })
    }

    
    render(){
        
        
        const {charList, loading, error,offset,newItemLoading,charEnded} = this.state
        const {charSelected} = this.props
        const items = charList.map((items,index)=>{
            let imgStyle = {'objectFit' : 'cover'};
                if (items.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
             }
                return(
                    <li key ={items.id}  onClick={()=>this.props.onCharselected(items.id)} 
                    className={charSelected === items.id ? "char__item_selected" : "char__item"}
                    //////keyboard
                    tabIndex={0}
                    onKeyDown={(event) => this.handleKeyDown(event, index)}>
                        <img src={items.thumbnail} alt={items.name} style={imgStyle}/>
                        <div className="char__name">{items.name}</div>
                    </li>
                )
        })

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMesssage/> : null;
        const content = !(loading || error) ? items : null;

        return (
           
            <div className="char__list">
                <ul ref={this.props.listRef} className="char__grid">
                {spinner}
                {errorMessage}
                {content}
                      
{/*              
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded? 'none' : 'block'}}
                    onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes ={
    onCharselected: PropTypes.func
}



export default CharList;