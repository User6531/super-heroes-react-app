import React from 'react';
import './viewer.scss';
import Error from '../error/error';

export default class Viewer extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.itemId === prevProps.itemId) {return}
        this.updateItem();
    }

    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-Viewer',
        });
        console.error('componentDidCatch-Viewer')
    }

    state = {
        item: null,
        loading: false,
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
        const {itemId} = this.props;
        if (!itemId) {return}
        this.props.service(itemId)
            .then(item=>{
                this.setState({
                    item: item
                });
            })
            .catch(res=>this.error(res));
    }

    render() {
        const {item, error, errorMessage} = this.state;
        let content = <View item={item} />;

        if (!item) {
            content = <ChooseItem />
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

const View = ({item}) => {
    let {name, fullName, gender, race, born, publisher, alignment, img,} = item;

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

const ChooseItem = () => {
    return (
            <span className="choose-item">🠕 Please select a hero! 🠕</span>
    )
}