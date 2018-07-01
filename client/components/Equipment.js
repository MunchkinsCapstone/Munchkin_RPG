import React from 'react'
import Card from './Card'

const Equipment = props => {
  const {player, discard, unequip} = props
  return (
    <div>
      <button
        type="button"
        className="btn btn-white"
        data-toggle="modal"
        data-target={`.${player.name}-equipment`}
      >
        Equipment
      </button>

      <div
        className={`modal fade bd-example-modal-lg ${player.name}-equipment`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="container">
              {player.allEquips.length ? (
                player.allEquips.map((card, index) => {
                  return (
                    <Card
                      key={`gear-${index}`}
                      card={card}
                      discard={discard}
                      toggleEquip={unequip}
                      cardIdx={null}
                      equipped={true}
                      player={player}
                    />
                  )
                })
              ) : (
                <div style={{backgroundColor: 'white'}}>
                  <h1>You have nothing equipped!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipment
