import React from 'react';
import './allPhotos.scss';
import Error from '../error/error';
import {Link} from 'react-router-dom';


export default class AllPhotos extends React.Component {

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
            errorMessage: 'componentDidCatch-AllPhotos',
        });
        console.error('componentDidCatch-AllPhotos')
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
        const {data} = this.props;
        this.setState({
            item: data,
        });
    }
    createAllItem = (item) => {
        if (!item) {return}
        return item.map(elem=>{

            return (
                <Link to={`/all/${elem.id}`}>
                    <View obj={elem} key={elem.id}/>
                </Link>
            )
        });

    }

    render() {
        const {item, error, errorMessage} = this.state;
        let content = this.createAllItem(item);

        if (error === true){
            content = <Error errorMessage={errorMessage}/>
        }

        return (
            <>
                <div className="wrapper__hero-small-img">
                    {content}
                </div>
            </>
        )
    }
}

const View = ({obj}) => {
    let { images:{md}} = obj;

    return (
        <img src={md} alt="hero img" className="hero-small-img"></img>
    )
}
