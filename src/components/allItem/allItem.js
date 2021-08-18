import React from 'react';
import './allItem.scss';
import Error from '../error/error';

export default class AllItem extends React.Component {

    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.data === prevProps.data) {return}
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
        const {data, searchValue} = this.props;
        this.setState({
            item: data,
            searchValue,
        });
    }
    createAllItem = (item) => {
        if (!item) {return}
        return item.map(elem=>{
            
            return (
                <View obj={elem} key={elem.id}/>
            )
        });

    }

    render() {
        const {item, error, errorMessage, searchValue} = this.state;
        let content = this.createAllItem(item);

        if (content && content.length < 1) {
            content = <NoResults />
        }   

        if (searchValue < 1) {
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

const View = ({obj}) => {
    let {name, biography:{fullName, placeOfBirth, publisher, alignment}, appearance:{gender, race}, images:{md}} = obj;

    if (fullName === null || fullName === "") {fullName = '-';}
    if (race === null || race === "null") {race = '-';}
    if (gender === null) {gender = '-';}
    if (placeOfBirth === null ) {placeOfBirth = '-';}
    if (publisher === null || publisher === "null" || publisher === "") {publisher = '-';}
    if (alignment === null) {alignment = '-';}

    return (
            <div className="wrapper-hero">
                <img src={md} alt="hero img" className="hero__img"></img>
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
                            <span>{placeOfBirth}</span>
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
            <span className="choose-item">🠕 Start typing name of hero 🠕</span>
    )
}

const NoResults = () => {
    return (
            <span className="choose-item">No results</span>
    )
}