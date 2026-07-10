const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split(/\r?\n/);

// 1. AS-IS Order button transition (Line 9269 in clean file)
let asisBuyLine = -1;
for (let i = 9250; i < 9290; i++) {
  if (lines[i] && lines[i].includes("onClick={() => setScreen6AsIsSubScreen('bondCurrentPrice')}") && lines[i+1] && lines[i+1].includes("style=") && lines[i+3] && lines[i+3].includes("매수")) {
    asisBuyLine = i;
    break;
  }
}
console.log('asisBuyLine:', asisBuyLine);
if (asisBuyLine !== -1) {
  lines[asisBuyLine] = "                              onClick={() => setScreen6AsIsSubScreen('cautionAgreement')}";
}

// 2. TO-BE Order button transition (Line 12358 in clean file)
let tobeBuyLine = -1;
for (let i = 12340; i < 12380; i++) {
  if (lines[i] && lines[i].includes("Button: 매수")) {
    // The next line is <button style={{
    tobeBuyLine = i + 1;
    break;
  }
}
console.log('tobeBuyLine:', tobeBuyLine);
if (tobeBuyLine !== -1) {
  lines[tobeBuyLine] = "                            <button onClick={() => setScreen6ToBeSubScreen('cautionAgreement')} style={{";
}

// 3. AS-IS subscreen conditional branch (Line 9080 in clean file)
let asisBranchLine = -1;
for (let i = 9060; i < 9100; i++) {
  if (lines[i] && lines[i].includes("screen6AsIsSubScreen === 'bondOrder' ? (")) {
    asisBranchLine = i;
    break;
  }
}
console.log('asisBranchLine:', asisBranchLine);
if (asisBranchLine !== -1) {
  // Let's replace the ternary start of bondOrder to handle cautionAgreement
  // We need to find the matching closing tag of bondOrder ternary.
  // Wait, in renderScreen6AsIs:
  // lines[9080] is screen6AsIsSubScreen === 'bondOrder' ? (
  // We can insert a branch inside the ternary!
  // Wait, renderScreen6AsIs returns a flat ternary:
  // screen6AsIsSubScreen === 'menu' ? ( ... ) : ( ... )
  // Wait, let's trace:
  // {screen6AsIsSubScreen === 'menu' ? ( ... ) : (
  //   <>
  //     {screen6AsIsSubScreen === 'bondOrder' ? ( ... ) : ( ... )}
  //   </>
  // )}
  // Yes! The inner ternary starts at line 9080!
  // Let's see: if we change line 9080 to:
  // screen6AsIsSubScreen === 'bondOrder' ? ( ... ) : screen6AsIsSubScreen === 'cautionAgreement' ? ( renderScreen6Caution('asis') ) : ( ... )
  // This is extremely simple because we just modify the outer : ( else branch of bondOrder!
  // Wait, let's find the closing ) : ( of the inner ternary!
  // In the clean file, lines[9354] was "                      ) : ("
  // Yes! Let's check lines[9354] and confirm it matches.
}

let asisInnerElseLine = -1;
for (let i = 9330; i < 9370; i++) {
  if (lines[i] && lines[i].includes(") : (") && lines[i-1].includes("</>") && lines[i+1].includes("Header")) {
    asisInnerElseLine = i;
    break;
  }
}
console.log('asisInnerElseLine:', asisInnerElseLine);
if (asisInnerElseLine !== -1) {
  lines[asisInnerElseLine] = "                      ) : screen6AsIsSubScreen === 'cautionAgreement' ? (\n" +
                             "                        renderScreen6Caution('asis')\n" +
                             "                      ) : (";
}

// 4. TO-BE subscreen conditional branch (Line 12444 in clean file)
let tobeBranchLine = -1;
for (let i = 12420; i < 12460; i++) {
  if (lines[i] && lines[i].includes(") : (") && lines[i-1].includes("</>") && lines[i+1].includes("Status Bar")) {
    tobeBranchLine = i;
    break;
  }
}
console.log('tobeBranchLine:', tobeBranchLine);
if (tobeBranchLine !== -1) {
  lines[tobeBranchLine] = "                  ) : screen6ToBeSubScreen === 'cautionAgreement' ? (\n" +
                          "                    renderScreen6Caution('tobe')\n" +
                          "                  ) : (";
}

fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
console.log("Successfully wired caution subscreen transitions and layouts!");
