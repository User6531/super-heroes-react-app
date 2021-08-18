import React from 'react';
import Error from '../error/error';
import Service from '../../services/services';
import ItemList from '../itemList/itemList';
import Viewer from '../viewer/viewer';

export default class PageList extends React.Component {

    service = new Service();
    componentDidCatch() {
        console.error('componentDidCatch-pagePhotos');
        this.setState({
          error: true,
          errorMessage: 'componentDidCatch-pagePhotos',
        });
    }
    
    state = {
    itemId: null,
    error: false,
    errorMessage: null,
    allItemData: null,
    }

    updateViewer = (id) => {
        this.setState({
          itemId: id,
        })
    }
  
    render() {
    const {itemId, error, errorMessage} = this.state;

    if (error) {
        return <Error errorMessage={errorMessage}/>
      }


    const itemList = <ItemList 
                      updateViewer={(id)=> this.updateViewer(id)}
                      service = {this.service.getAllHeroes}
                     />;

    const itemViewer = <Viewer
                        itemId={itemId}
                        service = {this.service.getHero}
                       />;
        return(
            <>
                {itemList}
                {itemViewer}
            </>
        )
    }

}