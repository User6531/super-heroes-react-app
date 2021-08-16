import React from 'react';
import './heroList.scss';
import Service from '../../services/services';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class HeroList extends React.Component {

    service = new Service();
    state = {
        heroList: null,
        error: false,
        errorMessage: null
    }

    componentDidMount() {
        this.service.getAllHeroes()
            .then(heroes=>{
                this.setState({
                    heroList: heroes,
                })
            })
    }

    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-HeroList',
        });
        console.error('componentDidCatch-HeroList')
    }

    updateHeroList = (arr) => {
        const list = arr.map(hero => {
            return (
                <li 
                    key={hero.slug}
                    onClick={ () => this.props.changeHero(hero.id)}
                    className="list-group-item">{hero.name}
                </li>
            )
        });
        return list;

    }

    render() {
        const {heroList, error, errorMessage} = this.state;
        let items;
        if (heroList == null) {
            items = <Spinner />
        } else {
            items = this.updateHeroList(heroList)
        }

        if (error === true){
            items = <Error errorMessage={errorMessage}/>
        }

        return (
            <div className="hero-list">
                    <ul className="list-group">
                        {items}
                    </ul>
            </div>
        )
    }
}