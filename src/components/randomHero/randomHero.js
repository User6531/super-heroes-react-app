import React from 'react';
import './randomHero.scss';
import Service from '../../services/services';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class RandomHero extends React.Component {


    componentDidMount() {
        this.updateHero();
        this.timerUpdateRandomHero = setInterval(this.updateHero, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timerUpdateRandomHero);
    }
    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-RandomHero',
        });
        console.error('componentDidCatch-RandomHero')
    }

    service = new Service();
    state = {
        id: Math.floor(Math.random()*731 + 1),
        name: null,
        fullName: null,
        gender: null,
        race: null, 
        born: null,
        publisher: null,
        alignment: null,
        img: null,
        loading: true,
        error: false,
        errorMessage: null,
    }

    error = (res) => {
        this.setState({
            error: true,
            errorMessage: res,
        });
        console.error(res)
    }

    updateHero = () => {
        const id = Math.floor(Math.random()*731 + 1);
        this.service.getHero(id)
        .then(hero=>{
            this.setState({
                name: hero.name,
                fullName: hero.biography['full-name'],
                gender: hero.appearance.gender,
                race: hero.appearance.race, 
                born: hero.biography['place-of-birth'],
                publisher: hero.biography.publisher,
                alignment: hero.biography.alignment,
                img: hero.image.url,
                loading: false,
                error: false,
            })
        })
        .catch(res=>this.error(res));
    }

    render() {

        const {loading, error, errorMessage} = this.state;
        let content = <View hero={this.state} btn={this.updateHero} />;

        if (loading === true){
            content = <Spinner />
        } 
        if (error === true){
            content = <Error errorMessage={errorMessage}/>
        }

        return (
            <>
                {content}
            </>
        )
    }
}

const View = ({hero, btn}) => {
    let {name, fullName, gender, race, born, publisher, alignment, img,} = hero;

    if (fullName === null || fullName === "") {fullName = '-';}
    if (race === null || race === "null") {race = '-';}
    if (gender === null) {gender = '-';}
    if (born === null ) {born = '-';}
    if (publisher === null || publisher === "null" || publisher === "") {publisher = '-';}
    if (alignment === null) {alignment = '-';}

    return (
        <div className="wrapper-random-hero">
            <div className="random-hero">
                <h2 className="random-hero__name">Random Hero: <span>{name}</span></h2>
                <ul className="random-hero__group-list">
                    <li className="random-hero__group-list__item">
                        <h6>Full Name</h6>
                        <span>{fullName}</span>
                    </li>
                    <li className="random-hero__group-list__item">
                        <h6>Gender</h6>
                        <span>{gender}</span>
                    </li>
                    <li className="random-hero__group-list__item">
                        <h6>Race</h6>
                        <span>{race}</span>
                    </li>
                    <li className="random-hero__group-list__item">
                        <h6>Place Of Birth</h6>
                        <span>{born}</span>
                    </li>
                    <li className="random-hero__group-list__item">
                        <h6>Publisher</h6>
                        <span>{publisher}</span>
                    </li>
                    <li className="random-hero__group-list__item">
                        <h6>Alignment</h6>
                        <span>{alignment}</span>
                    </li>
                </ul>
                <button
                    className="random-hero__btn"
                    onClick={btn}
                >Change hero</button>
            </div>
            <img src={img} alt="hero img" className="random-hero__img"></img>
        </div>
    )
}