const fs=require('fs');
const path=require('path');

function r(f) {
  try {
    if(fs.statSync(f).isDirectory()) {
      if(!f.includes('node_modules') && !f.includes('.git') && !f.includes('dist')) {
        fs.readdirSync(f).forEach(c=>r(path.join(f,c)));
      }
    } else if(f.endsWith('.ts')||f.endsWith('.tsx')||f.endsWith('package.json')) {
      let c=fs.readFileSync(f,'utf8');
      let n=c.replace(/carbon-creditApi/g, 'carbonCreditApi')
             .replace(/carbon-creditContract/g, 'carbonCreditContract')
             .replace(/rm -rf \.\/dist/g, 'npx rimraf ./dist');
      if(c!==n) {
        fs.writeFileSync(f,n);
        console.log('Updated '+f);
      }
    }
  } catch(e){}
}

r('d:/ideapod');
