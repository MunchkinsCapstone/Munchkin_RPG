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
    // this.props.discard(this.props.cardIdx);
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  discardCard = () => {
    const {player, discard, cardIdx} = this.props
    discard(player, cardIdx)
    this.handleClose()
  }

  render() {
    const {anchorEl} = this.state
    const imageUrl = '/cardImages/' + this.props.card.imageUrl
    const {discard, cardIdx, player} = this.props

    return (
      <div className="card" style={{width: '25%'}}>
        <img
          className="card-img-top card-view"
          src={imageUrl}
          alt="Card"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Use</MenuItem>
          {/* <MenuItem onClick={this.handleClose}>Trade</MenuItem> */}
          <MenuItem onClick={this.discardCard}>Discard</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default Card
