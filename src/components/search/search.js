import React from 'react';
import './search.scss';

export default class Search extends React.Component {

    onChangeValue = (e) => {
        const value = e.target.value;
        this.props.onChange(value);
    }

    render() {
        return(
            <input 
                type="text"
                placeholder="Enter here"
                className="search-input"
                onChange={this.onChangeValue}
            />
        )
    }
}