import React from "react";
import './error.scss';
import errorPage from './pngwing.com.png';

export default class Error extends React.Component {

    componentDidMount(prevProps) {
        const {errorMessage} = this.props;
        this.setState({
            errorMessage,
        });
    }

    state = {
        showErrorMessage: false,
        errorMessage: ''
    }

    ShowErrorMessage = () => {
        this.setState({
            showErrorMessage: true,
        });
    }

    render() {
        const {errorMessage, showErrorMessage} = this.state;
        let message = '', classButton = 'error-btn', classMessage = 'none';
        if (errorMessage) {
            message = errorMessage.toString();
        }
        if(showErrorMessage) {
            classButton += ' none';
            classMessage = 'show';
        }

        return (
            <div className="error">
                <img src={errorPage}alt="" className="error-img"></img>
                <span>Something goes wrong<br></br>
                please reload the page or try later<br></br>
                <button className={classButton} onClick={this.ShowErrorMessage}>Show Details</button>
                <p className={classMessage}>{message}</p>
                </span>
            </div>
        )
    }
}