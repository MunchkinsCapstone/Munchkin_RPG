import React from 'react';
import Card from './Card';

const Hand = props => {
  const { hand, name } = props;
  return (
    <div>
      <button
        type="button"
        className="btn btn-white"
        data-toggle="modal"
        data-target={`.${name}-modal`}
      >
        Hand
      </button>

      <div
        className={`modal fade bd-example-modal-lg ${name}-modal`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="container">
              {hand.map((card, index) => {
                return <Card key={`hand-${index}`} card={card} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hand;
