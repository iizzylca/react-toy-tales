import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const renderToyObj = () => { 
    return props.toyObj.map(toy => <ToyCard updateLike={props.updateLike} deleteToy={props.deleteToy} key={toy.id} toyObj={toy} /> )
    
  }

  return(
    <div id="toy-collection">
      {renderToyObj()}
    </div>
  );
}

export default ToyContainer;
