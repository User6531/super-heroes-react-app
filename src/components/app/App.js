import React from 'react';
import Header from '../header/header';
import "./app.scss"; 
import RandomItem from '../randomItem/randomItem';

import Footer from '../footer/footer';
import Error from '../error/error';
import Service from '../../services/services';
import PageSearch from '../pages/pageSearch';
import PagePhotos from '../pages/pagePhotos';
import PageList from '../pages/pageList';
import SingleItem from '../singleItem/singleItem';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends React.Component {
  service = new Service();

  componentDidCatch() {
    console.error('componentDidCatch-App');
    this.setState({
      error: true,
      errorMessage: 'componentDidCatch-App',
    });
  }

  state = {
    showRandomItem: false,
    error: false,
    errorMessage: null,
  }

  toogleRandomItem = () => {
    this.setState(prevState=>({
      showRandomItem: !prevState.showRandomItem,
    }));
  }

  render() {
    const {showRandomItem, error, errorMessage} = this.state;

    if (error) {
      return <Error errorMessage={errorMessage}/>
    }

    let randomItemBtnText, randomItem;
    if (showRandomItem === false) {
      randomItemBtnText = '▼ Open Random Hero'
      randomItem = null;
    } else {
      randomItemBtnText = '✖ Close Random Hero'
      randomItem = <RandomItem service={this.service.getHero}/>;
    }

    const btnRandomItem = <button 
                            className="random-item-wrapper-button"
                            onClick={this.toogleRandomItem}
                          >{randomItemBtnText}</button>;

    return (
        <Router>
        <div className="page">
            <Header />
            <div className="main">

              <div className="random-item-wrapper">
                  {btnRandomItem}
                  {randomItem}
              </div>

              <Route path='/' exact component={PageList} />
              <Route path='/search' exact component={PageSearch} />
              <Route path='/all' exact component={PagePhotos} />
              <Route path='/all/:id' exact render={
                ({match}) => {
                  const {id} = match.params;
                  return <SingleItem id={id}/>
                }
              } />

            </div>
            <Footer />
        </div>
      </Router>
    )
  }
}