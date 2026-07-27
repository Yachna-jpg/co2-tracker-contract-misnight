const bip39 = require('bip39');
const mnemonic = 'trick squeeze hockey annual powder dry click boat state parent swing thrive penalty parent staff antique item bar picture soon olympic beef mistake solution';
const entropy = bip39.mnemonicToEntropy(mnemonic);
console.log('Hex seed:', entropy);
