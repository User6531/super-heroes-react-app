import React from 'react';
import './hero.scss';
import Service from '../../services/services';
import Error from '../error/error';

export default class Hero extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.heroId === prevProps.heroId) {return}
        this.updateHero();
    }

    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-Hero',
        });
        console.error('componentDidCatch-Hero')
    }

    service = new Service();
    state = {
        name: null,
        fullName: null,
        gender: null,
        race: null, 
        born: null,
        publisher: null,
        alignment: null,
        img: null,
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
        const {heroId} = this.props;
        if (!heroId) {return}
        this.service.getHero(heroId)
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
        const {name, error, errorMessage} = this.state;
        let content = <View hero={this.state} btn={this.updateHero} />;

        if (!name) {
            content = <ChooseHero />
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

const View = ({hero}) => {
    let {name, fullName, gender, race, born, publisher, alignment, img,} = hero;

    if (fullName === null || fullName === "") {fullName = '-';}
    if (race === null || race === "null") {race = '-';}
    if (gender === null) {gender = '-';}
    if (born === null ) {born = '-';}
    if (publisher === null || publisher === "null" || publisher === "") {publisher = '-';}
    if (alignment === null) {alignment = '-';}

    return (
        <div className="wrapper-hero">
            <img src={img} alt="hero img" className="hero__img"></img>
            <div className="hero">
                <h2 className="hero__name"><span>{name}</span></h2>
                <ul className="hero__group-list">
                    <li className="hero__group-list__item">
                        <h6>Full Name</h6>
                        <span>{fullName}</span>
                    </li>
                    <li className="hero__group-list__item">
                        <h6>Gender</h6>
                        <span>{gender}</span>
                    </li>
                    <li className="hero__group-list__item">
                        <h6>Race</h6>
                        <span>{race}</span>
                    </li>
                    <li className="hero__group-list__item">
                        <h6>Place Of Birth</h6>
                        <span>{born}</span>
                    </li>
                    <li className="hero__group-list__item">
                        <h6>Publisher</h6>
                        <span>{publisher}</span>
                    </li>
                    <li className="hero__group-list__item">
                        <h6>Alignment</h6>
                        <span>{alignment}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const ChooseHero = () => {
    return (
            <span className="choose-hero">🠕 Please select a hero! 🠕</span>
    )
}