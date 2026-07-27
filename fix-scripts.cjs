const fs=require('fs');
const path=require('path');

function replaceInFile(f) {
  try {
    if (fs.statSync(f).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.git') && !f.includes('dist')) {
        fs.readdirSync(f).forEach(c => replaceInFile(path.join(f, c)));
      }
    } else if (f.endsWith('package.json')) {
      let c = fs.readFileSync(f, 'utf8');
      let n = c
        .replace(/"rm -rf dist/g, '"npx rimraf dist')
        .replace(/"rm -rf build/g, '"npx rimraf build')
        .replace(/"rm -rf \\.swc/g, '"npx rimraf .swc')
        .replace(/cp -R/g, 'npx shx cp -R')
        .replace(/cp /g, 'npx shx cp ');
      if (c !== n) {
        fs.writeFileSync(f, n);
        console.log("Updated", f);
      }
    }
  } catch(e) {}
}

replaceInFile('d:/ideapod');
