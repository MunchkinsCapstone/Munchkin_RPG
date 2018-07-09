const chalk = require('chalk')
const log = x => console.log(chalk.green(x))
const {Race, Class, Equipment} = require('./cards')

class Player {
  constructor(name, sex, game, id) {
    this.id = id
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
    this.game = game
    this.inBattle = false
    this.hireling = null
  }
}

module.exports = Player
