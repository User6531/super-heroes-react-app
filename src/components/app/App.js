import React from 'react';
import Header from '../header/header';
import "./app.scss"; 
import RandomItem from '../randomItem/randomItem';
import ItemList from '../itemList/itemList';
import Viewer from '../viewer/viewer';
import Footer from '../footer/footer';
import Error from '../error/error';
import Service from '../../services/services';
import Search from '../search/search';
import AllItem from '../allItem/allItem';
import AllPhotos from '../AllPhotos/allPhotos';

export default class App extends React.Component {
  service = new Service();

  componentDidMount() {
    this.service.getAllHeroes()
      .then(res=>{
        this.setState({
          allItemData: res,
        });
      })
      .catch(res=>{
        this.setState({
          error: true,
          errorMessage: res,
        });
      });
  }

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

  onChange = (value) => {
    this.setState({
      searchValue: value,
    })
  }


  onSearch = (value, data) => {
    if (value.length < 1) {
        return data
    }
    const res = data.filter(item => {
      console.log(item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    });

    return res
  }

  render() {
    const {showRandomItem, itemId, error, errorMessage, searchValue, allItemData} = this.state;

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

    const search = <Search 
                      onChange={(value)=>this.onChange(value)}
                   />;

    const allItem = <AllItem 
                      data = {this.onSearch(searchValue, allItemData)}
                      searchValue={searchValue}
                    />

    const allPhotos = <AllPhotos 
                      data = {allItemData}
                    />

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



              {/* {search}
              {allItem} */}


              {/* {allPhotos} */}


          </div>
          <Footer />
      </div>
    )
  }
}

// (function() {

// })();