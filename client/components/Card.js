import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  discard = () => {
    const {player, discard, cardIdx} = this.props
    discard(player, cardIdx)
    this.handleClose()
  }

  toggleEquip = () => {
    const {toggleEquip, player, cardIdx, card} = this.props
    toggleEquip(player, cardIdx, card)
    this.handleClose()
  }

  cast = () => {
    const {cast, player, cardIdx, card} = this.props
    if (card.type === 'Boost') {
      const target = player
      cast(player, cardIdx, target)
    }
  }

  render() {
    const {anchorEl} = this.state
    const {card, equipped} = this.props
    const imageUrl = '/cardImages/' + this.props.card.imageUrl

    return (
      <div className="card">
        <div className="card-view">
          <img
            className="card-img-top"
            src={imageUrl}
            alt="Card"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          />
          {!equipped && (
            <button
              type="button"
              className="btn-danger discard-button"
              onClick={this.discard}
            >
              discard
            </button>
          )}
          {(card.type === 'Equipment' ||
            card.type === 'Race' ||
            card.type === 'Class') && (
            <button
              type="button"
              className="btn-primary equip-button"
              onClick={this.toggleEquip}
            >
              {equipped ? 'unequip' : 'equip'}
            </button>
          )}
          {card.type === 'Boost' && (
            <button
              type="button"
              className="btn-success equip-button"
              onClick={this.cast}
            >
              use
            </button>
          )}
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.toggleEquip}>Use</MenuItem>
          <MenuItem onClick={this.discard}>Discard</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default Card
