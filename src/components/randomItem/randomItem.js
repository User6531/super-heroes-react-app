import React from 'react';
import './randomItem.scss';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class RandomItem extends React.Component {


    componentDidMount() {
        this.updateItem();
        this.timerUpdateRandomItem = setInterval(this.updateItem, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timerUpdateRandomItem);
    }
    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-RandomHero',
        });
        console.error('componentDidCatch-RandomHero')
    }

    state = {
        item: null,
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

    updateItem = () => {
        const id = Math.floor(Math.random()*731 + 1);

        this.props.service(id)
        .then(item=>{
            this.setState({
                item: item,
                loading: false,
                error: false,
            })
        })
        .catch(res=>this.error(res));
    }

    render() {

        const {item, loading, error, errorMessage} = this.state;
        let content = <View item={item} btn={this.updateItem} />;

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

const View = ({item, btn}) => {
    let {name, fullName, gender, race, born, publisher, alignment, img,} = item;

    if (fullName === null || fullName === "") {fullName = '-';}
    if (race === null || race === "null") {race = '-';}
    if (gender === null) {gender = '-';}
    if (born === null ) {born = '-';}
    if (publisher === null || publisher === "null" || publisher === "") {publisher = '-';}
    if (alignment === null) {alignment = '-';}

    return (
        <div className="wrapper-random-item">
            <div className="random-item">
                <h2 className="random-item__name">Random Hero: <span>{name}</span></h2>
                <ul className="random-item__group-list">
                    <li className="random-item__group-list__item">
                        <h6>Full Name</h6>
                        <span>{fullName}</span>
                    </li>
                    <li className="random-item__group-list__item">
                        <h6>Gender</h6>
                        <span>{gender}</span>
                    </li>
                    <li className="random-item__group-list__item">
                        <h6>Race</h6>
                        <span>{race}</span>
                    </li>
                    <li className="random-item__group-list__item">
                        <h6>Place Of Birth</h6>
                        <span>{born}</span>
                    </li>
                    <li className="random-item__group-list__item">
                        <h6>Publisher</h6>
                        <span>{publisher}</span>
                    </li>
                    <li className="random-item__group-list__item">
                        <h6>Alignment</h6>
                        <span>{alignment}</span>
                    </li>
                </ul>
                <button
                    className="random-item__btn"
                    onClick={btn}
                >Change hero</button>
            </div>
            <img src={img} alt="item img" className="random-item__img"></img>
        </div>
    )
}