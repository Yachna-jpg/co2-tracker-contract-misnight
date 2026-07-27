const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('.git')) return;
    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            const files = fs.readdirSync(filePath);
            files.forEach(f => replaceInFile(path.join(filePath, f)));
        } else {
            let content = fs.readFileSync(filePath, 'utf8');
            let newContent = content
                .replace(/carbon-credit-ui/g, 'carbon-credit-ui')
                .replace(/carbon-credit-cli/g, 'carbon-credit-cli')
                .replace(/carbon-credit/g, 'carbon-credit')
                .replace(/CarbonCredit/g, 'CarbonCredit')
                .replace(/CarbonCredit/g, 'CarbonCredit')
                .replace(/carbonCredit/g, 'carbonCredit')
                .replace(/Carbon Credit Tracker/g, 'Carbon Credit Tracker')
                .replace(/carbon credit tracker/g, 'carbon credit tracker');

            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    } catch (e) {
        // Ignore files we can't read/write as text
    }
}

replaceInFile('d:\\ideapod');
console.log("Done");
