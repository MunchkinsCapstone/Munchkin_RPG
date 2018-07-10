class Card {
  constructor(name, imageUrl) {
    this.name = name
    this.imageUrl = imageUrl
  }
}

class Monster extends Card {
  constructor(name, imageUrl, level, treasures, badStuff) {
    super(name, imageUrl)
    this.level = level
    this.treasures = treasures
    this.type = 'Monster'
    this.badStuff = badStuff
    this.deck = 'doors'
  }
}

class Item extends Card {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl)
    this.effect = effect
    this.remove = remove
  }
}

class Modifier extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Modifier'
    this.deck = 'doors'
  }
}

class Equipment extends Item {
  constructor(name, imageUrl, bodyPart, effect, remove, numHands, requirement) {
    super(name, imageUrl, effect, remove)
    this.bodyPart = bodyPart
    this.type = 'Equipment'
    this.deck = 'treasures'
    this.numHands = numHands || 0
    this.requirement = requirement
  }
}

class Spell extends Item {
  constructor(name, imageUrl, effect) {
    super(name, imageUrl, effect, null)
    this.type = 'Spell'
    this.deck = 'treasures'
  }
}

class Buff extends Item {
  constructor(name, imageUrl, bonus, effect) {
    super(name, imageUrl)
    this.type = 'Buff'
    this.deck = 'treasures'
    this.effect = effect || (buffsArray => buffsArray.push(this))
    this.bonus = bonus
  }
}

class Class extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Class'
    this.deck = 'doors'
  }
}

class Race extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Race'
    this.deck = 'doors'
  }
}

class Curse extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Curse'
    this.deck = 'doors'
  }
}

class Charm extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Curse'
    this.deck = 'doors'
  }
}

class Boost extends Item {
  constructor(name, imageUrl, requirement) {
    let effect = player => player.levelUp()
    if (name === 'Kill the Hireling')
      effect = player => {
        const {hireling} = player.game
        hireling.player.lose(hireling.card)
        player.levelUp()
      }
    super(name, imageUrl, effect)
    this.type = 'Boost'
    this.deck = 'treasures'
    this.requirement = requirement
    if (requirement === undefined) this.requirement = () => true
  }
}

function shuffle(array) {
  let counter = array.length
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }
  return array
}

class Deck {
  constructor(cards) {
    this.cards = cards
    this.graveYard = []
  }
}

module.exports = {
  Card,
  Deck,
  Equipment,
  Item,
  Monster,
  Buff,
  Spell,
  Class,
  Race,
  Curse,
  Charm,
  Modifier,
  Boost,
  shuffle
}
