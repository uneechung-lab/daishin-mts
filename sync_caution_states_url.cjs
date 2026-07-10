const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split(/\r?\n/);

// 1. First useEffect on mount: restore caution states
let mountRestoreIndex = -1;
for (let i = 9580; i < 9620; i++) {
  if (lines[i] && lines[i].includes("const screen6ToBeSearchParam = params.get('screen6tobesearch');")) {
    mountRestoreIndex = i + 2;
    break;
  }
}
console.log('mountRestoreIndex:', mountRestoreIndex);
if (mountRestoreIndex !== -1) {
  lines.splice(mountRestoreIndex, 0, 
    "    const screen6asisq1Param = params.get('screen6asisq1');\n" +
    "    if (screen6asisq1Param) setScreen6AsIsCautionQ1(screen6asisq1Param);\n" +
    "    const screen6asisq2Param = params.get('screen6asisq2');\n" +
    "    if (screen6asisq2Param) setScreen6AsIsCautionQ2(screen6asisq2Param);\n" +
    "    const screen6tobeq1Param = params.get('screen6tobeq1');\n" +
    "    if (screen6tobeq1Param) setScreen6ToBeCautionQ1(screen6tobeq1Param);\n" +
    "    const screen6tobeq2Param = params.get('screen6tobeq2');\n" +
    "    if (screen6tobeq2Param) setScreen6ToBeCautionQ2(screen6tobeq2Param);"
  );
}

// 2. Second useEffect: sync caution states to URL params
let syncIndex = -1;
for (let i = 9650; i < 9700; i++) {
  if (lines[i] && lines[i].includes("params.set('screen6tobesearch', screen6ToBeSearchOpen ? 'true' : 'false');")) {
    syncIndex = i + 1;
    break;
  }
}
console.log('syncIndex:', syncIndex);
if (syncIndex !== -1) {
  lines.splice(syncIndex, 0,
    "    if (screen6AsIsCautionQ1) params.set('screen6asisq1', screen6AsIsCautionQ1); else params.delete('screen6asisq1');\n" +
    "    if (screen6AsIsCautionQ2) params.set('screen6asisq2', screen6AsIsCautionQ2); else params.delete('screen6asisq2');\n" +
    "    if (screen6ToBeCautionQ1) params.set('screen6tobeq1', screen6ToBeCautionQ1); else params.delete('screen6tobeq1');\n" +
    "    if (screen6ToBeCautionQ2) params.set('screen6tobeq2', screen6ToBeCautionQ2); else params.delete('screen6tobeq2');"
  );
}

// 3. Second useEffect dependency array: add dependencies
let depIndex = -1;
for (let i = 9670; i < 9730; i++) {
  if (lines[i] && lines[i].includes("screen6ToBeSearchOpen]);")) {
    depIndex = i;
    break;
  }
}
console.log('depIndex:', depIndex);
if (depIndex !== -1) {
  lines[depIndex] = lines[depIndex].replace(
    "screen6ToBeSearchOpen]);",
    "screen6ToBeSearchOpen, screen6AsIsCautionQ1, screen6AsIsCautionQ2, screen6ToBeCautionQ1, screen6ToBeCautionQ2]);"
  );
}

// 4. popstate handlePopState useEffect: restore caution states
let popIndex = -1;
for (let i = 9700; i < 9750; i++) {
  if (lines[i] && lines[i].includes("const screen6ToBeSearchParam = params.get('screen6tobesearch');")) {
    popIndex = i + 2;
    break;
  }
}
console.log('popIndex:', popIndex);
if (popIndex !== -1) {
  lines.splice(popIndex, 0,
    "      const screen6asisq1Param = params.get('screen6asisq1');\n" +
    "      if (screen6asisq1Param) setScreen6AsIsCautionQ1(screen6asisq1Param);\n" +
    "      const screen6asisq2Param = params.get('screen6asisq2');\n" +
    "      if (screen6asisq2Param) setScreen6AsIsCautionQ2(screen6asisq2Param);\n" +
    "      const screen6tobeq1Param = params.get('screen6tobeq1');\n" +
    "      if (screen6tobeq1Param) setScreen6ToBeCautionQ1(screen6tobeq1Param);\n" +
    "      const screen6tobeq2Param = params.get('screen6tobeq2');\n" +
    "      if (screen6tobeq2Param) setScreen6ToBeCautionQ2(screen6tobeq2Param);"
  );
}

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log("Successfully integrated caution states URL sync!");
