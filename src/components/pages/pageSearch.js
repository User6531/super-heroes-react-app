import React from 'react';
import Search from '../search/search';
import Error from '../error/error';
import AllItem from '../allItem/allItem';
import Service from '../../services/services';

export default class PageSearch extends React.Component {

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
        console.error('componentDidCatch-PageSearch');
        this.setState({
          error: true,
          errorMessage: 'componentDidCatch-PageSearch',
        });
    }

    state = {
        error: false,
        errorMessage: null,
        searchValue: '',
        allItemData: null,
    }

    onSearch = (value, data) => {
        if (value.length < 1) {
            return data
        }
        const res = data.filter(item => {
          return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        });
    
        return res
    }

    onChange = (value) => {
        this.setState({
          searchValue: value,
        })
    }

    render() {
        const {error, errorMessage, searchValue, allItemData} = this.state;

        if (error) {
            return <Error errorMessage={errorMessage}/>
        }

        const search = <Search 
                            onChange={(value)=>this.onChange(value)}
                        />;

        const allItem = <AllItem 
                            data = {this.onSearch(searchValue, allItemData)}
                            searchValue={searchValue}
                        />

        return (
            <> 
                {search}
                {allItem}
            </>
        )
    }
}