import React from 'react'

export const Door = props => {
  const {kick, loot, game, reactToDoor, endTurn} = props

  const kickOpen = () => {
    const door = document.getElementById('door')
    const doorText = document.getElementById('door-text')
    doorText.className = ''
    door.style.backgroundImage = 'url(./Door3.png)'
    setTimeout(() => {
      const card = game.knockKnock()
      const cardImg = document.createElement('img')
      cardImg.src = '/cardImages/' + card.imageUrl
      cardImg.className = 'door-card'
      door.appendChild(cardImg)
      setTimeout(() => {
        reactToDoor(card)
        door.removeChild(cardImg)
        doorText.className = 'hover-text'
      }, 3000)
    }, 1000)
  }

  let handleClick = kickOpen

  if (game.phase === 1)
    return (
      <div
        id="door"
        style={{
          display: 'flex',
          height: '60vh',
          width: '60vh',
          backgroundImage: 'url(./Door0.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() => {
          handleClick()
          handleClick = () => null
          setTimeout(() => {
            handleClick = kickOpen
          }, 2175)
        }}
      >
        <h2 id="door-text" className="hover-text">
          Kick Door
        </h2>
      </div>
    )
  else if (game.phase === 2)
    return (
      <div
        id="door"
        style={{
          display: 'flex',
          height: '60vh',
          width: '60vh',
          backgroundImage: 'url(./Door3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={loot}
      >
        <h2 id="door-text" className="hover-text">
          Loot the Room
        </h2>
      </div>
    )
  else if (game.phase === 3)
    return (
      <div
        id="door"
        style={{
          display: 'flex',
          height: '60vh',
          width: '60vh',
          backgroundImage: 'url(./Door3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={endTurn}
      >
        <h2 id="door-text" className="hover-text">
          End Turn
        </h2>
      </div>
    )
  else return null
}

export default Door
