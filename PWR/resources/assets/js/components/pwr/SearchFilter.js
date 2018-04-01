import React, { Component, PropTypes } from 'react';
import Search from 'react-search';

export default class SearchFilter extends Component {
  
   constructor (props) {
    super(props)
    this.state = { repos: [] }
  }

   HiItems(items) {
    console.log(items)
  }
  
  getItemsAsync(searchValue, cb) {
    // let url = `https://api.github.com/search/repositories?q=${searchValue}&language=javascript`
    // fetch(url).then( (response) => {
    //   return response.json();
    // }).then((results) => {
    //   if(results.items != undefined){
    //     let items = results.items.map( (res, i) => { return { id: i, value: res.full_name } })
    //     this.setState({ repos: items })
    //     cb(searchValue)
    //   }
    // });

     $.ajax({
            type: "GET",
            url: 'get-drivers',
            data: { store_id: 1953 },
            success: function (data) {
               console.log(data);
               if(data.items != undefined){
                    let items = data.items.map( (res, i) => { return { id: i, value: res.driver } })
                    this.setState({ repos: items })
                    cb(searchValue)
                  }
            },
            error: function (data, textStatus, errorThrown) {
                console.log("Error",data);
            },

        });
  }

  render () {
    let items = [
      { id: 0, value: 'ruby' },
      { id: 1, value: 'javascript' },
      { id: 2, value: 'lua' },
      { id: 3, value: 'go' },
      { id: 4, value: 'julia' }
    ]
 
    return (
      <div>
        <Search items={items}
                placeholder='Pick your language'
                maxSelected={3}
                multiple={true}
                onItemsChanged={this.HiItems.bind(this)} />

                 <Search items={this.state.repos}
                multiple={true}
                getItemsAsync={this.getItemsAsync.bind(this)}
                 />
      </div>
    )
  }
}