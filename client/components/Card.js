import React from 'react';

const Card = props => {
  const imageUrl = '/cardImages/' + props.card.imageUrl;
  return (
    <div
      className="card"
      style={{ width: '25%' }}
      // data-toggle="modal"
      // data-target={`.${imageUrl}-modal`}
    >
      <img className="card-img-top card-view" src={imageUrl} alt="Card" />
      {/* <div
        className={`modal fade bd-example-modal-lg ${imageUrl}-modal`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <h1>HELLO!</h1>
      </div> */}
    </div>
  );
};

export default Card;
