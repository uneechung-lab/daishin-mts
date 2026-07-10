const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split(/\r?\n/);

// 1. Wrap Scrollable Tabs in mode !== 'tobe' check
let tabsStart = -1;
let tabsEnd = -1;

for (let i = 8210; i < 8230; i++) {
  if (lines[i] && lines[i].includes("Scrollable Tabs")) {
    tabsStart = i + 1;
    break;
  }
}

if (tabsStart !== -1) {
  for (let k = tabsStart; k < tabsStart + 40; k++) {
    if (lines[k].includes("</div>") && lines[k+1].includes("Search bar input wrapper")) {
      tabsEnd = k;
      break;
    }
  }
}

console.log('tabsStart:', tabsStart);
console.log('tabsEnd:', tabsEnd);

if (tabsStart !== -1 && tabsEnd !== -1) {
  // Wrap tabs
  lines[tabsStart] = "        {mode !== 'tobe' && (\n" + lines[tabsStart];
  lines[tabsEnd] = lines[tabsEnd] + "\n        )}";
}

// 2. Wrap Select Filter Dropdowns in mode !== 'tobe' check
let filtersStart = -1;
let filtersEnd = -1;

for (let i = 8260; i < 8280; i++) {
  if (lines[i] && lines[i].includes("Select filter dropdowns")) {
    filtersStart = i + 1;
    break;
  }
}

if (filtersStart !== -1) {
  for (let k = filtersStart; k < filtersStart + 40; k++) {
    if (lines[k].includes("</div>") && lines[k+1].includes("Table header")) {
      filtersEnd = k;
      break;
    }
  }
}

console.log('filtersStart:', filtersStart);
console.log('filtersEnd:', filtersEnd);

if (filtersStart !== -1 && filtersEnd !== -1) {
  // Wrap filters
  lines[filtersStart] = "          {mode !== 'tobe' && (\n" + lines[filtersStart];
  lines[filtersEnd] = lines[filtersEnd] + "\n          )}";
}

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log("Successfully wrapped tabs and filters in mode !== 'tobe' checks!");
