import React,{useContext} from 'react';

import MenuItem from '../menu-item/menu-item';

import DirectoryContext from '../../contexts/directory/directory.context';

import './directory.scss';

const Directory = () =>{
 const sections = useContext(DirectoryContext);

  return(
  <div className='directory-menu'>
    {sections.map(({id, ...otherSectionProps}) =>(
        <MenuItem key={id} {...otherSectionProps} />
        /*<MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />*/
    ))}
    </div>
  );
};

export default Directory;