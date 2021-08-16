import React from "react";
import './error.scss';
import errorPage from './pngwing.com.png';

export default class Error extends React.Component {

    render() {
        const {errorMessage} = this.props;
        let message = '';
        if (errorMessage) {
            message = errorMessage.toString();
        }

        return (
            <div className="error">
                <img src={errorPage}alt="" className="error-img"></img>
                <span>Something goes wrong<br></br>
                please reload the page or try later<br></br>
                <p>{message}</p>
                </span>
            </div>
        )
    }
}