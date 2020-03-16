import React,{useState,useContext} from 'react';
import ReactSearchBox from 'react-search-box'

import CollectionItem from '../../components/collection-item/collection-item';

import CollectionsContext from '../../contexts/collections/collections.context';

import './collection.scss';

const CollectionPage = ({match}) =>{
   
  const [searchField,setSearchField] = useState({searchfield:''});
  const {searchfield} = searchField;

  const collections = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
  const {title,items} = collection; 

  const filteredItems = items.filter(item =>{
    return item.name.toLowerCase().includes(searchfield.toLowerCase())});
  
  const onChangeSearch = (event) =>{
    setSearchField({searchfield: event})
  }
    return(
      <div className='collection-page'>
      <h2 className='title'>{title}</h2>
        <div className='search'>
        <ReactSearchBox
            inputBoxFontSize={10}
            placeholder={`search ${title}`}
            onChange={onChangeSearch}   
            />
        </div>
        <div className='items'>
          {
          filteredItems.map(item => <CollectionItem key={item.id} item={item} />)
          }
      </div>
    </div>
    )
  }

export default CollectionPage;

/*
first way to use context Api
render(){
  const {match} = this.props;
  
  return(
    <CollectionsContext.Consumer>
    {
      collections =>{//we receive collections from CollectionsContext.Consumer
          const collection = collections[match.params.collectionId];
          const { title, items } = collection;
          const filteredItems = items.filter(item =>{
            return item.name.toLowerCase().includes(this.state.searchfield.toLowerCase())});
          
          return(
            <div className='collection-page'>
            <h2 className='title'>{title}</h2>
              <div className='search'>
              <ReactSearchBox
                  inputBoxFontSize={10}
                  placeholder={`search ${title}`}
                  onChange={this.onChangeSearch}   
                  />
              </div>
              <div className='items'>
                {
                filteredItems.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
          </div>
          )
       }
     }
      </CollectionsContext.Consumer>
    )
  }
};*/