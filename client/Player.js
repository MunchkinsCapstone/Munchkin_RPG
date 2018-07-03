const chalk = require('chalk')
const log = x => console.log(chalk.green(x))
const {Race, Class, Equipment} = require('./cards')

class Player {
  constructor(name, sex, game) {
    this.name = name
    this.sex = sex
    this.level = 1
    this.run = 0
    this.bonus = 0
    this.maxInventory = 5
    this.race = null //new Race('Human', 'no image', () => {}, () => {})
    this.class = null //new Class('Commoner', 'no image', () => {}, () => {})
    this.isActive = false
    this.equipment = {
      head: null, //new Equipment('Bare', 'no image', 'head', () => {}, () => {}),
      torso: null, //new Equipment('Bare', 'no image', 'torso', () => {}, () => {}),
      feet: null, //new Equipment('Bare', 'no image', 'feet', () => {}, () => {}),
      misc: [],
      hands: [],
      numHands: 0
    }
    this.halfBreed = true
    this.super = false
    this.allEquips = []
    this.hand = []
    this.checkRequirements = this.checkRequirements.bind(this)
    this.equip = this.equip.bind(this)
    this.unequip = this.unequip.bind(this)
    this.levelUp = this.levelUp.bind(this)
    this.die = this.die.bind(this)
    // this.game = game
    this.inBattle = false
    this.hireling = null
    this.lose = this.lose.bind(this)
    this.discard = this.discard.bind(this)
    this.assist = this.assist.bind(this)
  }

  get attack() {
    return this.level + this.bonus
  }

  draw(deck) {
    this.hand.push(deck.draw())
  }

  discard = cardIdx => {
    this.hand[cardIdx].discard()
    this.hand.splice(cardIdx, 1)
  }

  lose = card => {
    if (card) {
      if (this.hireling && card === this.hireling.card) {
        this.lose(this.hireling.equipment)
        this.hireling = null
      }
      if (this.allEquips.indexOf(card) > -1) {
        this.unequip(card)
      }
      this.discard(this.hand.indexOf(card))
    }
  }

  gift(cardIdx, recipient) {
    const card = this.hand[cardIdx]
    this.hand.splice(cardIdx, 1)
    recipient.hand.push(card)
  }

  checkRequirements() {
    let i = 0
    while (i < this.allEquips.length) {
      let item = this.allEquips[i]
      if (
        item.requirement &&
        !item.requirement(this) &&
        item !== this.hireling.equipment
      ) {
        this.unequip(item)
      } else i++
    }
  }

  equip(cardIdx) {
    const item = this.hand[cardIdx]
    if (item.name === 'Hireling') {
      this.hireling = {card: item, equipment: null}
      this.game.hireling = {player: this, card: item}
      this.allEquips.push(item)
      item.effect(this)
      this.hand.splice(cardIdx, 1)
    } else
      switch (item.type) {
        case 'Equipment':
          if (!item.requirement || item.requirement(this)) {
            if (item.bodyPart === 'hands') {
              if (this.equipment.numHands + item.numHands > 2) {
                while (this.equipment.hands.length) {
                  this.unequip(this.equipment.hands[0])
                }
              }
              this.equipment.hands.push(item)
              this.allEquips.push(item)
              this.equipment.numHands += item.numHands
            } else if (item.bodyPart === 'misc') {
              this.equipment.misc.push(item)
              this.allEquips.push(item)
            } else {
              if (this.equipment[item.bodyPart]) {
                this.unequip(this.equipment[item.bodyPart])
              }
              this.equipment[item.bodyPart] = item
              this.allEquips.push(item)
            }
            item.effect(this)
            this.hand.splice(cardIdx, 1)
          }
          break
        case 'Class':
          if (this.class) {
            this.unequip(this.class)
          }
          this.class = item
          this.allEquips.push(item)
          item.effect(this)
          this.hand.splice(cardIdx, 1)
          break
        case 'Race':
          if (this.race) {
            this.unequip(this.race)
          }
          this.race = item
          this.allEquips.push(item)
          item.effect(this)
          this.hand.splice(cardIdx, 1)
          break
        default:
          log('You cannot equip this item!')
      }
    this.checkRequirements()
  }

  unequip(item) {
    if (!item) return null
    switch (item.type) {
      case 'Equipment':
        const {bodyPart} = item
        if (bodyPart === 'hands' || bodyPart === 'misc') {
          this.equipment[bodyPart].splice(
            this.equipment[bodyPart].indexOf(item),
            1
          )
          this.equipment.numHands -= item.numHands
        } else {
          this.equipment[bodyPart] = null
        }
        this.allEquips.splice(this.allEquips.indexOf(item), 1)
        break
      case 'Class':
        this.allEquips.splice(this.allEquips.indexOf(item), 1)
        this.class = null
        break
      case 'Race':
        this.allEquips.splice(this.allEquips.indexOf(item), 1)
        this.race = null
        break
      default:
        log('You cannot equip this item!')
    }
    if (this.hireling && item === this.hireling.equipment)
      this.hireling.equipment = null
    this.hand.push(item)
    item.remove(this)
    this.checkRequirements()
  }

  equipToHireling = card => {
    if (card.type === 'Equipment') {
      this.hireling.equipment = card
      card.effect(this)
      const cardIdx = this.hand.indexOf(card)
      this.hand.splice(cardIdx, 1)
      this.allEquips.push(card)
    }
  }

  cast(cardIdx, target) {
    const card = this.hand[cardIdx]
    if (
      card.type === 'Spell' ||
      card.type === 'Curse' ||
      card.type === 'Boost' ||
      card.type === 'Buff'
    ) {
      card.effect(target)
      card.discard()
      this.hand.splice(cardIdx, 1)
    } else log('You cannot cast this item as a spell!')
  }

  assist = () => {
    this.game.battle.players.push(this)
    this.inBattle = true
  }
  levelUp() {
    this.level++
    log(this.name + ' went up one level!')
    if (this.level === 10) this.game.endGame(this.name)
  }

  levelDown = () => {
    if (this.level > 1) this.level--
    log(this.name + ' lost a level!')
  }

  die() {
    while (this.allEquips.length) {
      this.unequip(this.allEquips[0])
    }
    const players = this.game.playerOrder
    let i = players.indexOf(this)
    while (this.hand.length) {
      i = (i + 1) % players.length
      let player = players[i]
      if (player !== this) player.hand.push(this.hand.pop())
    }
    this.level = 1
  }
}

module.exports = Player
