import React from 'react'

export const Door = props => {
  const {kick, loot, game, reactToDoor} = props

  const kickOpen = () => {
    const door = document.getElementById('door')
    door.src = '/Door1.png'
    setTimeout(() => {
      door.src = '/Door2.png'
    }, 25)
    setTimeout(() => {
      door.src = '/Door3.png'
    }, 50)
    setTimeout(() => {
      const card = game.knockKnock()
      const cardImg = document.createElement('img')
      cardImg.src = '/cardImages/' + card.imageUrl
      cardImg.className = 'door-card'
      //   document.getElementById('door-container').appendChild(cardImg)
      door.style.opacity = 0.5
      setTimeout(() => {
        reactToDoor(card)
      }, 2000)
    }, 100)
  }

  if (game.phase === 1)
    return (
      <div id="door-container">
        <img
          id="door"
          className="closed"
          src="/Door0.png"
          style={{height: '60vh'}}
          onClick={kickOpen}
        />
      </div>
    )
  else if (game.phase === 2)
    return (
      <div>
        <img
          id="door"
          className="open3"
          src="/Door3.png"
          style={{height: '60vh'}}
          onClick={loot}
        />
      </div>
    )
  else if (game.phase === 3)
    return (
      <div>
        <img
          id="door"
          className="open3"
          src="/Door3.png"
          style={{height: '60vh'}}
        />
      </div>
    )
  else return null
}

export default Door
