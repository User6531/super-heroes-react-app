import React from 'react';
import Error from '../error/error';
import './singleItem.scss';
import Service from '../../services/services';
import Spinner from '../spinner/spinner';
import {Link} from 'react-router-dom';



export default class SingleItem extends React.Component {

    service = new Service();
    componentDidMount() {
        this.service.getHero(this.props.id)
            .then(item=>{
                this.setState({
                    item: item,
                    loading: false,
                    error: false,
                })
            })
            .catch(res=>{
                this.setState({
                  error: true,
                  errorMessage: res,
                  loading: false,
                });
              });
    }

    componentDidCatch() {
        console.error('componentDidCatch-SingleItem');
        this.setState({
          error: true,
          errorMessage: 'componentDidCatch-SingleItem',
        });
      }

    state = {
        id: null,
        item: null,
        error: false,
        errorMessage: '',
        loading: true,
    }
    
    render() {
        const {item, error, errorMessage, loading} = this.state;

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <Error errorMessage={errorMessage}/>
          }
        
        return(
            <>
                <Link to={`/super-heroes-react-app/all/`}>
                    <button className="btn-back">🠔  Back</button>
                </Link>
                <View item={item}/>
            </>
        )
    }
}

const View = ({item}) => {

    const {
        name = '-',
        fullName = '-',
        gender = '-',
        race = '-',
        born = '-',
        publisher = '-',
        alignment = '-',
        img = '-',
        eyeColor = '-',
        hairColor = '-',
        height = '-',
        combat = '-',
        durability = '-',
        intelligence = '-',
        power = '-',
        speed = '-',
        strength = '-',
    } = item;

    


    return (
        <div className="wrapper-item">
        <img src={img} alt="item img" className="item__img"></img>
        <div className="item">
            <h2 className="item__name"><span>{name}</span></h2>
            <ul className="item__group-list">
                <li className="item__group-list__item">
                    <h6>Full Name</h6>
                    <span>{fullName}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Gender</h6>
                    <span>{gender}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Race</h6>
                    <span>{race}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Place Of Birth</h6>
                    <span>{born}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Publisher</h6>
                    <span>{publisher}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Alignment</h6>
                    <span>{alignment}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Eye Color</h6>
                    <span>{eyeColor}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Hair Color</h6>
                    <span>{hairColor}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Height</h6>
                    <span>{height}</span>
                </li>
                <h5 className="item__sub-titles">Powerstats</h5>
                <li className="item__group-list__item">
                    <h6>Combat</h6>
                    <span>{combat}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Durability</h6>
                    <span>{durability}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Intelligence</h6>
                    <span>{intelligence}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Power</h6>
                    <span>{power}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Speed</h6>
                    <span>{speed}</span>
                </li>
                <li className="item__group-list__item">
                    <h6>Strength</h6>
                    <span>{strength}</span>
                </li>
            </ul>
        </div>
    </div>
    )
}

