import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMesssage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{
    constructor(props){
        super(props)
    }

    state ={
       char:{},
       loading: true,
       error:false

    }
    marvelServices = new MarvelService();
    
    componentDidMount(){
        this.updateChar();
    }

    componentWillUnmount(){
    }
    
   

    onChangeChar=(char)=>{
        this.setState({
            char,
            loading:false
        })
    }
    onError =()=>{
        this.setState({
            loading:false,
            error:true
        })
    }

    onLoading =()=>{
        this.setState({
            loading:true
        })
    }
    updateChar=()=>{
        const id = Math.floor(Math.random() *(1011400 -1011000)+1011000);
        this.onLoading();
        this.marvelServices.getOneCharacters(id)
        .then(this.onChangeChar)
        .catch(this.onError)
    }

    handelClickRequest=()=>{
        this.updateChar();
    }

 
    render(){
        const {char,loading,error} = this.state
        
        const errorMessage = error ? <ErrorMesssage /> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error)? <View char={char}/> : null;
        return (
            <div className="randomchar">
                    {/* {loading ?  <Spinner/> : <View char={char}/>} */}
                    {errorMessage}
                    {spiner}
                    {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.handelClickRequest} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View =({char})=>{
    const {name,description,thumbnail,homepage,wiki}= char;
    
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    

    return(
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                           {description === ''? 'not found description' : description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}
export default RandomChar;