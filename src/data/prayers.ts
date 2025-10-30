export type MysteryType = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export interface Mystery {
  type: MysteryType;
  name: string;
  mysteries: string[];
  color: string;
}

export const mysteries: Record<MysteryType, Mystery> = {
  joyful: {
    type: 'joyful',
    name: 'The Joyful Mysteries',
    color: 'from-yellow-100 to-amber-100',
    mysteries: [
      'The Annunciation',
      'The Visitation',
      'The Nativity',
      'The Presentation',
      'Finding Jesus in the Temple'
    ]
  },
  sorrowful: {
    type: 'sorrowful',
    name: 'The Sorrowful Mysteries',
    color: 'from-purple-100 to-violet-100',
    mysteries: [
      'The Agony in the Garden',
      'The Scourging at the Pillar',
      'The Crowning with Thorns',
      'The Carrying of the Cross',
      'The Crucifixion'
    ]
  },
  glorious: {
    type: 'glorious',
    name: 'The Glorious Mysteries',
    color: 'from-blue-100 to-sky-100',
    mysteries: [
      'The Resurrection',
      'The Ascension',
      'The Descent of the Holy Spirit',
      'The Assumption',
      'The Coronation of Mary'
    ]
  },
  luminous: {
    type: 'luminous',
    name: 'The Luminous Mysteries',
    color: 'from-emerald-100 to-teal-100',
    mysteries: [
      'The Baptism of Jesus',
      'The Wedding at Cana',
      'The Proclamation of the Kingdom',
      'The Transfiguration',
      'The Institution of the Eucharist'
    ]
  }
};

export function getDailyMystery(): Mystery {
  const day = new Date().getDay();
  
  // Sunday & Wednesday: Glorious
  if (day === 0 || day === 3) return mysteries.glorious;
  
  // Monday & Saturday: Joyful
  if (day === 1 || day === 6) return mysteries.joyful;
  
  // Tuesday & Friday: Sorrowful
  if (day === 2 || day === 5) return mysteries.sorrowful;
  
  // Thursday: Luminous
  return mysteries.luminous;
}

export interface Prayer {
  name: string;
  text: string;
  type: 'opening' | 'our-father' | 'hail-mary' | 'glory-be' | 'fatima' | 'hail-holy-queen' | 'closing';
}

export const prayers: Record<string, Prayer> = {
  signOfCross: {
    name: 'Sign of the Cross',
    type: 'opening',
    text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'
  },
  apostlesCreed: {
    name: "Apostles' Creed",
    type: 'opening',
    text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.'
  },
  ourFather: {
    name: 'Our Father',
    type: 'our-father',
    text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.'
  },
  hailMary: {
    name: 'Hail Mary',
    type: 'hail-mary',
    text: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'
  },
  gloryBe: {
    name: 'Glory Be',
    type: 'glory-be',
    text: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.'
  },
  fatimaPrayer: {
    name: 'Fatima Prayer',
    type: 'fatima',
    text: 'O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those in most need of Thy mercy.'
  },
  hailHolyQueen: {
    name: 'Hail Holy Queen',
    type: 'hail-holy-queen',
    text: 'Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.'
  },
  finalPrayer: {
    name: 'Final Prayer',
    type: 'closing',
    text: 'O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ Our Lord. Amen.'
  }
};