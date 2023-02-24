import { Component } from 'react';

import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMesssage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'


import './charInfo.scss';



class CharInfo extends Component{

    state = {
        char: null,
        loading:false,
        error:false
    }

    
    marvelServices = new MarvelService();

    componentDidMount(){
        this.updateChar()
    }
    componentDidUpdate(prevProps){
            if(this.props.charId !== prevProps.charId){
                this.updateChar()
            }
    }

    updateChar =()=>{
        const {charId} = this.props;
        if(!charId){
            return
        }
        this.onLoading();
        this.marvelServices.getOneCharacters(charId)
        .then(this.onChangeChar)
        .catch(this.onError)

    
    }

    onChangeChar =(char)=>{
            this.setState({
                char,
                loading:false
            })
    }
    onLoading =()=>{
        this.setState({
            loading:true
        })
    }
    onError =()=>{
        this.setState({
            loading:false,
            error:true
        })
    }

    render(){
        const {char,loading,error} = this.state

        const spinner = loading ? <Spinner/> : null; 
        const erorrMessage = error ? <ErrorMesssage/> : null;
        const skeleton = char || loading || error ? null : <Skeleton/>
        const content =  !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {spinner}
                {erorrMessage}
                {skeleton}
                {content}
            </div>
        )
    }
}
    const View =({char})=>{

        const {name, description, thumbnail,homepage,wiki,comics} = char;

        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }

        return(
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                        </div>
                    </div>
                </div>
                    <div className="char__descr">
                         {description}
                    </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                     {comics.length > 0 ? null : "not decsription, please enter anouther comics"}
               
                     {
                        comics.map((item,index)=>{
                            if(index > 9) return;
                            return(
                                <li key={index} className="char__comics-item">
                                    {item.name}
                                    {/* <a href={item.resourceURI}> comics</a> */}
                                </li>
                            )
                        })
                        
                        }
                    

                </ul>
            </>
        )
        
    }
 
    CharInfo.propTypes ={
        charId: PropTypes.number
    }


export default CharInfo;