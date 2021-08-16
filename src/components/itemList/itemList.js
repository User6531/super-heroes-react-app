import React from 'react';
import './itemList.scss';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class ItemList extends React.Component {

    state = {
        list: null,
        error: false,
        errorMessage: null
    }

    componentDidMount() {
        this.props.service()
            .then(items=>{
                this.setState({
                    list: items,
                })
            })
    }

    componentDidCatch() {
        this.setState({
            error: true,
            errorMessage: 'componentDidCatch-Itemlist',
        });
        console.error('componentDidCatch-Itemlist')
    }

    updateItemList = (arr) => {
        return arr.map(({id, name}) => {
            return (
                <li 
                    key={id}
                    onClick={ () => this.props.updateViewer(id)}
                    className="list-group-item">{name}
                </li>
            )
        });
    }

    render() {
        const {list, error, errorMessage} = this.state;
        let items;
        if (list == null) {
            items = <Spinner />
        } else {
            items = this.updateItemList(list)
        }

        if (error === true){
            items = <Error errorMessage={errorMessage}/>
        }

        return (
            <div className="list">
                    <ul className="list-group">
                        {items}
                    </ul>
            </div>
        )
    }
}