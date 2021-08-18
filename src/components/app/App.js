import React from 'react';
import Header from '../header/header';
import "./app.scss"; 
import RandomItem from '../randomItem/randomItem';
import ItemList from '../itemList/itemList';
import Viewer from '../viewer/viewer';
import Footer from '../footer/footer';
import Error from '../error/error';
import Service from '../../services/services';
import PageSearch from '../pages/pageSearch';
import PagePhotos from '../pages/pagePhotos';

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
    itemId: null,
    error: false,
    errorMessage: null,
    searchValue: '',
    allItemData: null,
  }

  toogleRandomItem = () => {
    this.setState(prevState=>({
      showRandomItem: !prevState.showRandomItem,
    }));

  }

  updateViewer = (id) => {
    this.setState({
      itemId: id,
    })
  }

  render() {
    const {showRandomItem, itemId, error, errorMessage} = this.state;

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
                            className="random-item-button"
                            onClick={this.toogleRandomItem}
                          >{randomItemBtnText}</button>;

    const itemList = <ItemList 
                      updateViewer={(id)=> this.updateViewer(id)}
                      service = {this.service.getAllHeroes}
                     />;

    const itemViewer = <Viewer
                        itemId={itemId}
                        service = {this.service.getHero}
                       />;

    const pageOne = <PageSearch />
    const pageTwo = <PagePhotos />

    return (
      <div className="page">
          <Header />
          <div className="main">

            <div className="random-item">
                {btnRandomItem}
                {randomItem}
            </div>
            <div className="selected-item">
              {itemList}
              {itemViewer}
            </div>
              
            {pageOne}
            {pageTwo}


          </div>
          <Footer />
      </div>
    )
  }
}