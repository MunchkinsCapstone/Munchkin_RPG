import React from 'react'
import Card from './Card'

const Hand = props => {
  const {hand, player, discard, equip, cast, lookForTrouble} = props
  return (
    <div>
      <button
        type="button"
        className="btn btn-white"
        data-toggle="modal"
        data-target={`.${player.name}-modal`}
      >
        Hand
      </button>

      <div
        className={`modal fade bd-example-modal-lg ${player.name}-modal`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="container">
              {hand.length ? (
                hand.map((card, index) => {
                  return (
                    <Card
                      key={`hand-${index}`}
                      card={card}
                      discard={discard}
                      toggleEquip={equip}
                      cardIdx={index}
                      player={player}
                      cast={cast}
                      lookForTrouble={lookForTrouble}
                    />
                  )
                })
              ) : (
                <div style={{backgroundColor: 'white'}}>
                  <h1>You have no cards in your hand!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hand
