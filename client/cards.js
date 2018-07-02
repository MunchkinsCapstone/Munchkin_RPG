class Card {
  constructor(name, imageUrl) {
    this.name = name
    this.imageUrl = imageUrl
    this.discard = this.discard.bind(this)
  }

  discard() {
    decks[this.deck].graveYard.unshift(this)
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
    this.buffs = []
  }

  get allBuffs() {
    return this.buffs.reduce((total, buff) => total + buff.bonus, 0)
  }

  get total() {
    return this.level + this.allBuffs
  }

  die() {
    this.discard()
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
  constructor(
    name,
    imageUrl,
    bodyPart,
    effect,
    remove,
    numHands,
    restrictedTo,
    restrictedFrom
  ) {
    super(name, imageUrl, effect, remove)
    this.bodyPart = bodyPart
    this.type = 'Equipment'
    this.deck = 'treasures'
    this.numHands = numHands || 0
  }
}

class Spell extends Item {
  constructor(name, imageUrl, effect) {
    super(name, imageUrl, effect, null)
    this.type = 'Spell'
    this.deck = 'treasures'
  }
}

class Class extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Class'
    this.deck = 'doors'
    this.bonus = 0
  }
}

class Race extends Item {
  constructor(name, imageUrl, effect, remove) {
    super(name, imageUrl, effect, remove)
    this.type = 'Race'
    this.deck = 'doors'
    this.bonus = 0
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
  constructor(name, imageUrl) {
    super(name, imageUrl, player => player.levelUp())
    this.type = 'Boost'
    this.deck = 'treasures'
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
    this.draw = this.draw.bind(this)
    this.shuffleCards = this.shuffleCards.bind(this)
    this.restock = this.restock.bind(this)
  }

  draw() {
    if (!this.cards.length) this.restock()
    return this.cards.shift()
  }

  shuffleCards() {
    this.cards = shuffle(this.cards)
  }

  restock() {
    this.cards = this.cards.concat(shuffle(this.graveYard))
  }
}

//-----------------------------------------------------------------------//
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-CARDS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
//-----------------------------------------------------------------------//

const monsters = [
  new Monster('3,872', '3872Orcs.jpeg', 10, 3, player => {}),
  new Monster('Amazon', 'Amazon.jpeg', 8, 2, player => {}),
  new Monster('Bigfoot', 'Bigfoot.jpeg', 12, 3, player => {}),
  new Monster('Bullrog', 'Bullrog.jpeg', 18, 5, player => {}),
  new Monster('Crabs', 'Crabs.jpeg', 1, 1, player => {}),
  new Monster('Drooling Slime', 'DroolingSlime.jpeg', 1, 1, player => {}),
  new Monster('Face Sucker', 'FaceSucker.jpeg', 8, 2, player => {}),
  new Monster('Floating Nose', 'FloatingNose.jpeg', 10, 3, player => {}),
  new Monster('Flying Frogs', 'FlyingFrogs.jpeg', 2, 1, player => {}),
  new Monster('Gazebo', 'Gazebo.jpeg', 8, 2, player => {}),
  new Monster(
    'Gelatinous Octahedron',
    'GelatinousOctahedron.jpeg',
    2,
    1,
    player => {}
  ),
  new Monster('Ghoulfiends', 'Ghoulfiends.jpeg', 8, 2, player => {}),
  new Monster('Harpies', 'Harpies.jpeg', 4, 2, player => {}),
  new Monster('Hippogriff', 'Hippogriff.jpeg', 16, 4, player => {}),
  new Monster(
    'Insurance Salesman',
    'InsuranceSalesman.jpeg',
    14,
    4,
    player => {}
  ),
  new Monster('King Tut', 'KingTut.jpeg', 16, 4, player => {}),
  new Monster('Lame Goblin', 'LameGoblin.jpeg', 1, 1, player => {}),
  new Monster(
    'Large Angry Chicken',
    'LargeAngryChicken.jpeg',
    2,
    1,
    player => {}
  ),
  new Monster('Lawyers', 'Lawyers.jpeg', 6, 2, player => {}),
  new Monster('Leperchaun', 'Leperchaun.jpeg', 4, 2, player => {}),
  new Monster('Maul Rat', 'MaulRat.jpeg', 1, 1, player => {}),
  new Monster('Mr. Bones', 'MrBones.jpeg', 2, 1, player => {}),
  new Monster('Net Troll', 'NetTroll.jpeg', 10, 3, player => {}),
  new Monster('Pit Bull', 'PitBull.jpeg', 2, 1, player => {}),
  new Monster('Platycore', 'Platycore.jpeg', 6, 2, player => {}),
  new Monster('Plutonium Dragon', 'PlutoniumDragon.jpeg', 20, 5, player => {}),
  new Monster('Potted Plant', 'PottedPlant.jpeg', 1, 1, player => {}),
  new Monster('Pukachu', 'Pukachu.jpeg', 6, 2, player => {}),
  new Monster('Shrieking Geek', 'ShriekingGeek.jpeg', 6, 2, player => {}),
  new Monster('Snails On Speed', 'SnailsOnSpeed.jpeg', 6, 2, player => {}),
  new Monster('Squidzilla', 'Squidzilla.jpeg', 18, 4, player => {}),
  new Monster('Stoned Golem', 'StonedGolem.jpeg', 14, 4, player => {}),
  new Monster('Tongue Demon', 'TongueDemon.jpeg', 12, 3, player => {}),
  new Monster('Undead Horse', 'UndeadHorse.jpeg', 4, 2, player => {}),
  new Monster(
    'Unspeakably Awful Indescribable Horror',
    'UnspeakablyAwfulIndescribableHorror.jpeg',
    6,
    2,
    player => {}
  ),
  new Monster('Wannabe Vampire', 'WannabeVampire.jpeg', 12, 3, player => {}),
  new Monster('Wight Brothers', 'WightBrothers.jpeg', 16, 4, player => {})
]

const modifiers = [
  new Modifier(
    'Ancient',
    'Ancient.jpeg',
    monster => {
      monster.level += 10
    },
    monster => {
      monster.level -= 10
    }
  ),
  new Modifier(
    'Baby',
    'Baby.jpeg',
    monster => {
      monster.shrinkage = Math.min(monster.level - 1, 5)
      monster.level -= monster.shrinkage
      monster.treasures--
    },
    monster => {
      monster.level += monster.shrinkage
      monster.treasures++
    }
  ),
  new Modifier(
    'Enraged',
    'Enraged.jpeg',
    monster => {
      monster.level += 5
    },
    monster => {
      monster.level -= 5
    }
  ),
  new Modifier(
    'Intelligent',
    'Intelligent.jpeg',
    monster => {
      monster.level += 5
    },
    monster => {
      monster.level -= 5
    }
  )
]

const equipments = [
  new Equipment(
    'Bad-Ass Bandana',
    'BadAssBandana.jpeg',
    'head',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    0,
    'Human'
  ),
  new Equipment(
    'Boots of Butt-Kicking',
    'BootsOfButtKicking.jpeg',
    'feet',
    user => {
      user.bonus += 2
    },
    user => {
      user.bonus -= 2
    }
  ),
  new Equipment(
    'Boots of Running Really Fast',
    'BootsOfRunningReallyFast.jpeg',
    'feet',
    user => {
      user.run += 2
    },
    user => {
      user.run -= 2
    }
  ),
  new Equipment(
    'Bow With Ribbons',
    'BowWithRibbons.jpeg',
    'hands',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    2,
    'Elf'
  ),
  new Equipment(
    'Broad Sword',
    'BroadSword.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    1,
    'Female'
  ),
  new Equipment(
    'Buckler of Swashing',
    'BucklerOfSwashing.jpeg',
    'hands',
    user => {
      user.bonus += 2
    },
    user => {
      user.bonus -= 2
    },
    1
  ),
  new Equipment(
    'Chainsaw of Bloody Dismemberment',
    'ChainsawOfBloodyDismemberment.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    2
  ),
  new Equipment(
    'Cheese Grater of Peace',
    'CheeseGraterOfPeace.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    1,
    'Cleric'
  ),
  new Equipment(
    'Cloak of Obscurity',
    'CloakOfObscurity.jpeg',
    'torso',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    0,
    'Thief'
  ),
  new Equipment(
    'Dagger of Treachery',
    'DaggerOfTreachery.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    1,
    'Thief'
  ),
  new Equipment(
    'Eleven-Foot Pole',
    'ElevenFootPole.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    2
  ),
  new Equipment(
    'Flaming Armor',
    'FlamingArmor.jpeg',
    'torso',
    user => {
      user.bonus += 2
    },
    user => {
      user.bonus -= 2
    }
  ),
  new Equipment(
    "Gentlemen's Club",
    'GentlemensClub.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    1,
    'Male'
  ),
  new Equipment(
    'Hammer of Kneecapping',
    'HammerOfKneecapping.jpeg',
    'hands',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    1,
    'Dwarf'
  ),
  new Equipment(
    'Helm of Courage',
    'HelmOfCourage.jpeg',
    'head',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    }
  ),
  new Equipment(
    'Hireling',
    'Hireling.jpeg',
    'misc',
    user => {
      //
    },
    user => {
      //
    }
  ),
  new Equipment(
    'Horny Helmet',
    'HornyHelmet.jpeg',
    'head',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    }
  ),
  new Equipment(
    'Huge Rock',
    'HugeRock.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    2
  ),
  new Equipment(
    'Kneepads of Allure',
    'KneepadsOfAllure.jpeg',
    'misc',
    user => {
      user.allure = true
    },
    user => {
      user.allure = false
    },
    0,
    null,
    'Cleric'
  ),
  new Equipment(
    'Leather Armor',
    'LeatherArmor.jpeg',
    'torso',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    }
  ),
  new Equipment(
    'Limburger and Anchovy Sandwich',
    'LimburgerAndAnchovySandwich.jpeg',
    'misc',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    },
    0,
    'Halfling'
  ),
  new Equipment(
    'Mace of Sharpness',
    'MaceOfSharpness.jpeg',
    'hands',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    1,
    'Cleric'
  ),
  new Equipment(
    'Mithril Armor',
    'MithrilArmor.jpeg',
    'torso',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    0,
    null,
    'Wizard'
  ),
  new Equipment(
    'Pantyhose of Giant Strength',
    'PantyhoseOfGiantStrength.jpeg',
    'misc',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    0,
    null,
    'Warrior'
  ),
  new Equipment(
    'Pointy Hat of Power',
    'PointyHatOfPower.jpeg',
    'head',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    0,
    'Wizard'
  ),
  new Equipment(
    'Rapier of Unfairness',
    'RapierOfUnfairness.jpeg',
    'hands',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    1,
    'Elf'
  ),
  new Equipment(
    'Rat on a Stick',
    'RatOnAStick.jpeg',
    'hands',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    },
    1
  ),
  new Equipment(
    'Really Impressive Title',
    'ReallyImpressiveTitle.jpeg',
    'misc',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    }
  ),
  new Equipment(
    'Sandals of Protection',
    'SandalsOfProtection.jpeg',
    'feet',
    user => {
      user.protected = true
    },
    user => {
      user.protected = false
    }
  ),
  new Equipment(
    'Shield of Ubiquity',
    'ShieldOfUbiquity.jpeg',
    'hands',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    1,
    'Warrior'
  ),
  new Equipment(
    'Short Wide Armor',
    'ShortWideArmor.jpeg',
    'torso',
    user => {
      user.bonus += 3
    },
    user => {
      user.bonus -= 3
    },
    0,
    'Dwarf'
  ),
  new Equipment(
    'Singing & Dancing Sword',
    'Singing&DancingSword.jpeg',
    'misc',
    user => {
      user.bonus += 2
    },
    user => {
      user.bonus -= 2
    },
    0,
    null,
    'Thief'
  ),
  new Equipment(
    'Slimy Armor',
    'SlimyArmor.jpeg',
    'torso',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    }
  ),
  new Equipment(
    'Sneaky Bastard Sword',
    'SneakyBastardSword.jpeg',
    'hands',
    user => {
      user.bonus += 2
    },
    user => {
      user.bonus -= 2
    },
    1
  ),
  new Equipment(
    'Spiky Knees',
    'SpikyKnees.jpeg',
    'misc',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    }
  ),
  new Equipment(
    'Staff of Napalm',
    'StaffOfNapalm.jpeg',
    'hands',
    user => {
      user.bonus += 5
    },
    user => {
      user.bonus -= 5
    },
    1,
    'Wizard'
  ),
  new Equipment(
    'Stepladder',
    'Stepladder.jpeg',
    'misc',
    user => {
      user.bonus += 1
    },
    user => {
      user.bonus -= 1
    },
    0,
    'Halfling'
  ),
  new Equipment(
    'Swiss Army Polearm',
    'SwissArmyPolearm.jpeg',
    'hands',
    user => {
      user.bonus += 4
    },
    user => {
      user.bonus -= 4
    },
    2,
    'Human'
  ),
  new Equipment(
    'Tuba of Charm',
    'TubaOfCharm.jpeg',
    'hands',
    user => {
      user.run += 1
      user.tuba = true
    },
    user => {
      user.run -= 1
      user.tuba = false
    },
    1
  )
]

const races = [
  new Race(
    'Dwarf',
    'Dwarf1.jpeg',
    player => {
      player.maxInventory = 6
    },
    player => {
      player.maxInventory = 5
    }
  ),
  new Race(
    'Dwarf',
    'Dwarf2.jpeg',
    player => {
      player.maxInventory = 6
    },
    player => {
      player.maxInventory = 5
    }
  ),
  new Race(
    'Dwarf',
    'Dwarf3.jpeg',
    player => {
      player.maxInventory = 6
    },
    player => {
      player.maxInventory = 5
    }
  ),
  new Race(
    'Elf',
    'Elf1.jpeg',
    player => {
      player.run++
    },
    player => {
      player.run--
    }
  ),
  new Race(
    'Elf',
    'Elf2.jpeg',
    player => {
      player.run++
    },
    player => {
      player.run--
    }
  ),
  new Race(
    'Elf',
    'Elf3.jpeg',
    player => {
      player.run++
    },
    player => {
      player.run--
    }
  ),
  new Race(
    'Halfling',
    'Halfling1.jpeg',
    player => {
      //
    },
    player => {
      //
    }
  ),
  new Race(
    'Halfling',
    'Halfling2.jpeg',
    player => {
      //
    },
    player => {
      //
    }
  ),
  new Race(
    'Halfling',
    'Halfling3.jpeg',
    player => {
      //
    },
    player => {
      //
    }
  )
]

const boosts = [
  new Boost('1,000 Gold Pieces', '1000GoldPieces.jpeg'),
  new Boost('Boil An Anthill', 'BoilAnAnthill.jpeg'),
  new Boost('Bribe GM With Food', 'BribeGMWithFood.jpeg'),
  new Boost('Convenient Addition Error', 'ConvenientAdditionError.jpeg'),
  new Boost('Invoke Obscure Rules', 'InvokeObscureRules.jpeg'),
  new Boost('Kill the Hireling', 'KillTheHireling.jpeg'),
  new Boost('Potion of General Studliness', 'PotionOfGeneralStudliness.jpeg'),
  new Boost('Whine at the GM', 'WhineAtGM.jpeg')
]

const classes = [
  new Class('Cleric', 'Cleric1.jpeg', () => {}, () => {}),
  new Class('Cleric', 'Cleric2.jpeg', () => {}, () => {}),
  new Class('Cleric', 'Cleric3.jpeg', () => {}, () => {}),
  new Class('Thief', 'Thief1.jpeg', () => {}, () => {}),
  new Class('Thief', 'Thief2.jpeg', () => {}, () => {}),
  new Class('Thief', 'Thief3.jpeg', () => {}, () => {}),
  new Class('Warrior', 'Warrior1.jpeg', () => {}, () => {}),
  new Class('Warrior', 'Warrior2.jpeg', () => {}, () => {}),
  new Class('Warrior', 'Warrior3.jpeg', () => {}, () => {}),
  new Class('Wizard', 'Wizard1.jpeg', () => {}, () => {}),
  new Class('Wizard', 'Wizard2.jpeg', () => {}, () => {}),
  new Class('Wizard', 'Wizard3.jpeg', () => {}, () => {})
]

const spells = [
  new Spell('Cotion of Ponfusion', 'CotionOfPonfusion.jpeg', target => {}),
  new Spell('Doppleganger', 'Doppleganger.jpeg', target => {}),
  new Spell(
    'Electric Radioactive Acid Potion',
    'ElectricRadioactiveAcidPotion.jpeg',
    target => {}
  ),
  new Spell('Flaming Poison Potion', 'FlamingPoisonPotion.jpeg', target => {}),
  new Spell('Flask of Glue', 'FlaskOfGlue.jpeg', target => {}),
  new Spell(
    'Freezing Explosive Potion',
    'FreezingExplosivePotion.jpeg',
    target => {}
  ),
  new Spell('Friendship Potion', 'FriendshipPotion.jpeg', target => {}),
  new Spell('Doppleganger', 'Doppleganger.jpeg', target => {}),
  new Spell('Hoard', 'Hoard.jpeg', target => {}),
  new Spell('Instant Wall', 'InstantWall.jpeg', target => {}),
  new Spell('Invisibility Potion', 'InvisibilityPotion.jpeg', target => {}),
  new Spell('Loaded Die', 'LoadedDie.jpeg', target => {}),
  new Spell('Magic Lamp', 'MagicLamp.jpeg', target => {}),
  new Spell('Magic Missile', 'MagicMissile1.jpeg', target => {}),
  new Spell('Magic Missile', 'MagicMissile2.jpeg', target => {}),
  new Spell('Mutilate the Bodies', 'MutilateTheBodies.jpeg', target => {}),
  new Spell(
    'Nasty Tasting Sports Drink',
    'NastyTastingSportsDrink.jpeg',
    target => {}
  ),
  new Spell('Pollymorph Potion', 'PollymorphPotion.jpeg', target => {}),
  new Spell('Potion of Halitosis', 'PotionOfHalitosis.jpeg', target => {}),
  new Spell('Pretty Balloons', 'PrettyBalloons.jpeg', target => {}),
  new Spell('Sleep Potion', 'SleepPotion.jpeg', target => {}),
  new Spell('Steal a Level', 'StealALevel.jpeg', target => {}),
  new Spell('Transferral Potion', 'TransferralPotion.jpeg', target => {}),
  new Spell('Wand of Dowsing', 'WandOfDowsing.jpeg', target => {}),
  new Spell('Wishing Ring', 'WishingRing1.jpeg', target => {}),
  new Spell('Wishing Ring', 'WishingRing2.jpeg', target => {}),
  new Spell('Yuppie Water', 'YuppieWater.jpeg', target => {})
]

const curses = [
  new Curse('Change Class', 'ChangeClass.jpeg', player => {}),
  new Curse('Change Race', 'ChangeRace.jpeg', player => {}),
  new Curse('Change Sex', 'ChangeSex.jpeg', player => {}),
  new Curse('Chicken On Your Head', 'ChickenOnYourHead.jpeg', player => {}),
  new Curse('Duck of Doom', 'DuckOfDoom.jpeg', player => {}),
  new Curse('Income Tax', 'IncomeTax.jpeg', player => {}),
  new Curse('Lose 1 Big Item', 'Lose1BigItem.jpeg', player => {}),
  new Curse('Lose 1 Small Item', 'Lose1SmallItem1.jpeg', player => {}),
  new Curse('Lose 1 Small Item', 'Lose1SmallItem2.jpeg', player => {}),
  new Curse('Lose a Level', 'LoseALevel1.jpeg', player => {
    if (player.level > 1) player.level--
  }),
  new Curse('Lose a Level', 'LoseALevel2.jpeg', player => {
    if (player.level > 1) player.level--
  }),
  new Curse('Lose the Armor You Are Wearing', 'LoseArmor.jpeg', player => {
    const armor = player.equipment.torso
    if (armor) {
      armor.discard()
      player.allEquips.splice(player.allEquips.indexOf(armor), 1)
      player.equipment.torso = null
    }
  }),
  new Curse('Lose Your Class', 'LoseClass.jpeg', player => {
    const cl4ss = player.class
    if (cl4ss) {
      cl4ss.discard()
      player.allEquips.splice(player.allEquips.indexOf(cl4ss), 1)
      player.class = null
    }
  }),
  new Curse('Lose a Level', 'LoseALevel1.jpeg', player => {}),
  new Curse(
    'Lose the Footgear You Are Wearing',
    'LoseFootgear.jpeg',
    player => {
      const footgear = player.equipment.feet
      if (footgear) {
        footgear.discard()
        player.allEquips.splice(player.allEquips.indexOf(footgear), 1)
        player.equipment.feet = null
      }
    }
  ),
  new Curse(
    'Lose the Headgear You Are Wearing',
    'LoseHeadgear.jpeg',
    player => {
      const headgear = player.equipment.head
      if (headgear) {
        headgear.discard()
        player.allEquips.splice(player.allEquips.indexOf(headgear), 1)
        player.equipment.head = null
      }
    }
  ),
  new Curse('Lose Your Race', 'LoseRace.jpeg', player => {
    const race = player.race
    if (race) {
      race.discard()
      player.allEquips.splice(player.allEquips.indexOf(race), 1)
      player.race = null
    }
  }),
  new Curse('Lose Two Cards', 'LoseTwoCards.jpeg', player => {}),
  new Curse('Malign Mirror', 'MalignMirror.jpeg', player => {}),
  new Curse('Truly Obnoxious Curse', 'TrulyObnoxiousCurse.jpeg', player => {}),
  new Curse('Lose Your Class', 'LoseClass.jpeg', player => {})
]

const charms = [
  new Charm('Cheat!', 'Cheat.jpeg'),
  new Charm('Divine Intervention', 'DivineIntervention.jpeg'),
  new Charm('Half-Breed', 'HalfBreed1.jpeg'),
  new Charm('Half-Breed', 'HalfBreed2.jpeg'),
  new Charm('Help Me Out Here!', 'HelpMeOutHere.jpeg'),
  new Charm('Illusion', 'Illusion.jpeg'),
  new Charm('Mate', 'Mate.jpeg'),
  new Charm('Out to Lunch', 'OutToLunch.jpeg'),
  new Charm('Super Munckin', 'SuperMunchkin1.jpeg'),
  new Charm('Super Munckin', 'SuperMunchkin2.jpeg'),
  new Charm('Wandering Monster', 'WanderingMonster1.jpeg'),
  new Charm('Wandering Monster', 'WanderingMonster2.jpeg')
]

const doors = new Deck(
  monsters
    .concat(modifiers)
    .concat(races)
    .concat(classes)
    .concat(curses)
    .concat(charms)
)
const treasures = new Deck(equipments.concat(spells).concat(boosts))

const decks = {
  doors,
  treasures
}

module.exports = {
  Deck,
  Race,
  Class,
  Equipment,
  monsters,
  equipments,
  classes,
  races,
  spells,
  modifiers,
  doors,
  treasures,
  shuffle
}
