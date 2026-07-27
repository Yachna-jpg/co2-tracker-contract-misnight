const path = require('path');
// Simulate what ts-node gives for import.meta.dirname when running src/config.ts
// import.meta.dirname = d:\ideapod\carbon-credit-cli\src
const importMetaDirname = path.join('D:', 'ideapod', 'carbon-credit-cli', 'src');
const currentDir = path.dirname(importMetaDirname);
console.log('import.meta.dirname (simulated):', importMetaDirname);
console.log('currentDir (after dirname):', currentDir);
const zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'carbon-credit');
console.log('zkConfigPath:', zkConfigPath);
const keysDir = path.join(zkConfigPath, 'keys', 'recordCredit.verifier');
console.log('Expected verifier key path:', keysDir);

const fs = require('fs');
console.log('File exists?', fs.existsSync(keysDir));
