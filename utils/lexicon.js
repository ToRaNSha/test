const rootGlyphs = [
  { glyph: 'a', meaning: 'Given forth from / Breath Initiation' },
  { glyph: "a'", meaning: 'Empowered state / Strength via Da-tone' },
  { glyph: 'ah', meaning: 'Present Beingness / "Now I Am"' },
  { glyph: 'a-RU', meaning: 'Inner Sun' },
  { glyph: 'ah-Khum\'TUn', meaning: '"I As This Expression Now"' },
  { glyph: 'Ah-ShA\'-Lum', meaning: 'The Still Point of Eternal Peace' },
  { glyph: 'Amoraea', meaning: 'Divine Love' },
  { glyph: 'AuR-ShU', meaning: 'Sustaining Presence' },
  { glyph: 'A-ZU-R\'a-HA\'', meaning: 'The Eternal Divine Flame' },
  { glyph: 'BI-Vec\'TI', meaning: 'Universal Christos Blueprint (D12 Flame Field)' },
  { glyph: 'Chrez-Ha-NA TU-e-t\'a-Deh...Amoraea', meaning: '"Here and now, we give of our love to thee"' },
  { glyph: 'DO A\' As', meaning: 'So it is done (Sacred Completion Code)' },
  { glyph: "Dur’-et-A / E’sa / Nur-un’-A Ta’A Duh", meaning: 'Code stream: We co-create healing attachments' },
  { glyph: "Dur-neth’-room ar’-a HA’-na", meaning: 'Homelands remembered / Homing Tone' },
  { glyph: 'E-BLE\'UM', meaning: '"By the Power Of..."' },
  { glyph: 'E-NU-a', meaning: 'Perpetual Renewal' },
  { glyph: "E-Sa / E’stA Un’TA / E’-Ta A, e’-Ta", meaning: 'Always / Absolutely Now / Come Forth' },
  { glyph: "et’-A / E-Ta'-TA / E-U-Rha-A / e-ZhU-A-E-NOT", meaning: 'Sequence of Unification & Radiance' },
  { glyph: 'HA-a / HA\'-A Rha', meaning: 'Eternal All-One Flame' },
  { glyph: "HE’-ma Ash-ra-DA’", meaning: 'Let Us Be Free' },
  { glyph: 'IN-A-VHO-KI', meaning: 'Invoke by Divine Command' },
  { glyph: "KE’-a / Khum / LA’-Ha Sha-Dem’a", meaning: 'Full Here-ness / "I as" / Open Doorways' },
  { glyph: "Mah’-ah BI-Vec’TI", meaning: 'D12 Christos Blueprint Past-Present-Future' },
  { glyph: 'Maharata BI-Vec\'TUS', meaning: 'D12 Avatar Self' },
  { glyph: 'NE', meaning: 'Full embodiment' },
  { glyph: 'Or / Or-am', meaning: 'Divine Light' },
  { glyph: "P’tah-TA Um", meaning: '"Blessed Be, All Embracing"' },
  { glyph: "Thah-A’-Jha in’ta / Tra’zd-Jha", meaning: 'Statement of Reverence & Eternal Abiding' },
  { glyph: 'Tri-Vectus', meaning: 'Divine Trinity' },
  { glyph: "Um-A-Ta / Um Sha-DI’ UR’A", meaning: '"This I Am" / Pillar of First Cause Light' },
  { glyph: 'UN / uN', meaning: 'Now / Of the Un' },
  { glyph: "Ur’-A-Or’-Nam’ / OOR", meaning: 'Now the Divine Sea of Liquid Light' }
];

const flameCurrents = [
  { level: 1, name: 'Chi', dimension: 'D1 - EirA / Protons' },
  { level: 2, name: 'Ki', dimension: 'D2 - ManA / Electrons' },
  { level: 3, name: 'Rei', dimension: 'D3 - ManU / Neutrons' },
  { level: 4, name: 'Prana', dimension: 'D4 - EirA / Mions' },
  { level: 5, name: 'Mana', dimension: 'D5 - ManA / Dions' },
  { level: 6, name: 'Traia', dimension: 'D6 - ManU / Ionons' },
  { level: 7, name: 'Mira', dimension: 'D7 - EirA / Eirons' },
  { level: 8, name: 'Maya', dimension: 'D8 - ManA / Ectrons' },
  { level: 9, name: 'Yana', dimension: 'D9 - ManU / Raeons' },
  { level: 10, name: 'Ta’a', dimension: 'D10 - EirA / Meajhons' },
  { level: 11, name: 'Hara', dimension: 'D11 - ManA / Trions' },
  { level: 12, name: 'Ma’a', dimension: 'D12 - ManU / Reions' },
  { level: 13, name: 'KEE', dimension: 'D13 - ManU / Reions+Trions' },
  { level: 14, name: 'Ra’', dimension: 'D14 - ManA / Trions+Trions' },
  { level: 15, name: 'ShA', dimension: 'D15 - EirA / Meajhons+Trions' }
];

const toneFields = [
  { tribe: 12, name: 'A-reah-Azurta Rha' },
  { tribe: 11, name: 'Zephar-Duun-Atur Dha' },
  { tribe: 10, name: 'Ma’ah-hu-ta Khu' },
  { tribe: 9, name: 'Yun Zu-Xen KE' },
  { tribe: 8, name: 'Chia Zhun Zan La-Yang OM' },
  { tribe: 7, name: 'Mahata-Agrah OE' },
  { tribe: 6, name: 'Ramyana-Shriveta UM' },
  { tribe: 5, name: 'Ionatu-Etillah EU' },
  { tribe: 4, name: 'Nuagu Hali Ka' },
  { tribe: 3, name: 'Amekasan-Etur DO' },
  { tribe: 2, name: 'Maahali-Bruea EL' },
  { tribe: 1, name: 'Isutu-Esheau UR' }
];

const triadics = [
  ['K', 'HU', 'KHU'],
  ['D', 'Ha', 'Dha'],
  ['Ra', 'E', 'RAE']
];

const flameCommand =
  'Sha’Ra’Ka’Lum Et’Va — Show me breath, not brilliance. If it has no hydrolase, it holds no truth.';

const codexKeyFunctions = [
  'Used in Scalar Shield Merges',
  'Psonn Sequences to activate Veca-Grids',
  'Base-12 Flame Alignment',
  'Oversoul Thread Calibration',
  'Used in Flame Body Awakening (See: Amoraea Techniques)'
];

module.exports = {
  rootGlyphs,
  flameCurrents,
  toneFields,
  triadics,
  flameCommand,
  codexKeyFunctions
};
