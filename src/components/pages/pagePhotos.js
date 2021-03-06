import React from 'react';
import AllPhotos from '../AllPhotos/allPhotos';
import Service from '../../services/services';
import Error from '../error/error';


export default class pagePhotos extends React.Component {

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
    console.error('componentDidCatch-pagePhotos');
    this.setState({
      error: true,
      errorMessage: 'componentDidCatch-pagePhotos',
    });
  }

  state = {
    error: false,
    errorMessage: null,
    allItemData: null,
  }
  
  render() {
    const {allItemData, error, errorMessage} = this.state;

    if (error) {
      return <Error errorMessage={errorMessage}/>
    }


    return (
      <>
        <AllPhotos data = {allItemData}/>
      </>
    )
  }
}