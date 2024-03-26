var color = 'red'
var backColor = 'blue'
var setText = "Krypt-Script JS";
var setTextVar = "Krypt-Script JS";
var setVars = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var coordx = 0;
var coordy = 0;
var loadedCode = [];
var scene = 0;
var inputString = '';
var loop = 0;
var tbnoneClick = 0;
var tbntwoClick = 0;
var loopStart = 0;
var i = 0;
var currentFunction = ""
var extensionInput = ""
var ifStatments = 0

try {
    var canvas = document.getElementById("tftScreen");
    var ctx = canvas.getContext("2d")
} catch(error) {

}

function destroyStart() {
    for (let k = 0; k < loopStart; k++) {
        loadedCode[k] = 'blank'
    }
}

if (autoRun == true) {
    inputString = softCompile(kryptScCode)
    interpret()
}

function startbtn() {
    if (scene == 0) {
        inputString= prompt('Enter Program Here');
        inputString = softCompile(inputString)
        interpret();
    }
}

function interpret() {
    var currentChar;
    var currentPhrase = '';
    var result = '';
    var line = '';
    var active = 0; //1 = kill read
    var linesSet = 0;
    var extension = ""


    for (let l = 0; l < inputString.length && active == 0; l++) {
        currentChar = inputString[l];
        if (currentChar != '|' && currentChar != 'z') {
            line += currentChar;
        }

        if (currentChar == 'z') {
        loadedCode[linesSet] = line;
        line = '';
        linesSet += 1;  
        }
        if (currentChar == '|') {
            console.log("Killed load with |")
        active = 1;
        }


    console.log(line);
}

processCode();

function processCode() {
        if (true) {
            var testLine = loadedCode[linesSet];

            if (i > loadedCode.length) {
            i = loopStart;
            }
            for (i = 0; i < loadedCode.length; i++) {

            var testLine = loadedCode[i];

            if (i > loadedCode.length) {
                i = loopStart;
            }

            if (loop == 1) {
                testLine = loadedCode[i];
            }

if (typeof testLine !== 'string') {
    testLine = String(testLine);
}

extensionInput = loadedCode[i+1]

periodIndex = testLine.indexOf('.');



if (testLine.indexOf('.') !== -1) {
    extension = testLine.substring(periodIndex);
}

//function extensions
if (extension == ".int") {
        extension = ""
        extensionInput = parseInt(loadedCode[i+1])
        testLine = testLine.substring(0, periodIndex);

    }
 else if (extension == ".str") {
        extension = ""
        extensionInput = toString(loadedCode[i+1])
        testLine = testLine.substring(0, periodIndex);

    }
 else if (extension == ".val") {

    extensionInput = Number(loadedCode[i+1])
    testLine = testLine.substring(0, periodIndex);
    extension = ""
}
 else if (extension == ".var") {
    console.log('.var')
        extensionInput = setVars[loadedCode[i+1]]
        console.log(loadedCode[i+1] + ' yes ' + setVars[loadedCode[i+1]])
        testLine = testLine.substring(0, periodIndex);
        extension = ""
}


if (tbnoneClick == 0 && testLine == "bt1click") {
    i += 1;
    }
    if (tbntwoClick == 0 && testLine == "bt2click") {
    i += 1;
    }
    if (tbnoneClick == 1 && testLine == "bt1click") {
    tbnoneClick = 0;
    currentFunction = loadedCode[i+1]
    }
    if (tbntwoClick == 1 && testLine == "bt2click") {
        currentFunction = loadedCode[i+1]
    }

            if (testLine == 'frontr') {
                color = 'red';
            }
            if (testLine == 'clr') {
                try {
                clrScr();
                }
                catch(error) {
                console.error('Graphics module error: Tried to use a graphics function without a graphics module')
                }
            }
            

            if (testLine == 'frontg') {
                color = 'green';
            }
            if (testLine == 'frontb') {
                color = 'blue';
            }
            if (testLine == 'backr') {
                backColor = 'red';
            }
            if (testLine == 'backg') {
                backColor = 'green';
            }
            if (testLine == 'backb') {
                backColor = 'blue';
            }
            if (testLine == 'settext') {
                setText = extensionInput;
            }
            if (testLine == 'skip') {
                i++
            }
            if (testLine == 'goto') {
                i++
                i = loadedCode[i];
            }
            if (testLine == 'exit') {
                var inc = i
                while (loadedCode[inc] != '}') {
                    inc +=1
                }
                if (loadedCode[inc] == '}') {
                    i = inc
                }
                console.log('exited')
            }
            if (testLine == 'screen') {
                i++;
                try {
                    screenSize(Number(loadedCode[i]), Number(loadedCode[i+1]))
                    i++;
                    console.log(Number(loadedCode[i]) + " " + Number(loadedCode[i+1]))
                } catch(error) {
                    console.error('You dont have a save/load module active')
                }
            }
            if (testLine == 'save') {
                i++;
                try {
                    save(loadedCode[i], loadedCode[i+1])
                } catch(error) {
                    console.error('You dont have a save/load module active')
                }
                i++;
            }
            if (testLine == 'load') {
                i++;
                try {
                    load(loadedCode[i])
                    setVars[loadedCode[i+1]] = loadedFromStorage
                    i++;
                } catch(error) {
                    console.error('You dont have a save/load module active')
                }
            }
            if (testLine == 'deletefile') {
                i++;
                try {
                    deleteFile(loadedCode[i])
                } catch(error) {
                    console.error('You dont have a save/load module active')
                }
            }
            if (testLine == 'deleteall') {
                try {
                    deleteAll()
                } catch(error) {
                    console.error('You dont have a save/load module active')
                }
            }

            if (testLine == 'settextvar') {
                i++;
                setText = setVars[loadedCode[i]];

            }
            if (testLine == 'function') {
                i++;
                if (loadedCode[i] != currentFunction) {
                    var inc = i
                    while (loadedCode[inc] != '}') {
                        inc +=1
                    }
                    if (loadedCode[inc] == '}') {
                        i = inc
                    }
                }
            }
            if (testLine == 'callfunction') {
                currentFunction = extensionInput
            }
            if (testLine == '}') {
                currentFunction = ""
            }
            if (testLine == 'coordx') {
                coordx = extensionInput;
            }
            if (testLine == 'coordy') {
                coordy = extensionInput;
            }
            if (testLine == "coordxvar") {
            i++
            coordx = setVars[loadedCode[i]];

            }
            if (testLine == "coordyvar") {
            i++
            coordy = setVars[loadedCode[i]];
            }
            if (testLine == "sign") {
                writeText();
            }
            if (testLine == "setvar") {
          
                var data = [5];
              i++
              data[1] = loadedCode[i];
              i++
            data[2] = loadedCode[i];
              setVars[data[1]] = data[2];
      }
      if (testLine == 'if') {
        i++
        var arg1 = setVars[loadedCode[i]]
        i++
        var arg2 = loadedCode[i]
        i++
        var arg3 = setVars[loadedCode[i]]

    if (arg2 == '>'){
        if (arg1 <= arg3) {
            i +=2
        }
    }
    if (arg2 == '<'){
        if (arg1 >= arg3) {
            i +=2
        }
    }
    if (arg2 == '=='){
        if (arg1 != arg3) {
            i +=2
        }
    }
    if (arg2 == '!='){
        if (arg1 != arg3) {
            i +=2
        }
    }

    }
      if (testLine == "var") {
    var firstVar;
    var secondVar;
    var thirdVar;

    var data = [5];

    i++
    data[1] = loadedCode[i]; // variable number
    i++
    data[2] = loadedCode[i]; // operator
    i++
    data[3] = loadedCode[i]; // variable number
    i++
    data[4] = loadedCode[i]; // variable to store result in

    // Convert data[1] and data[3] to integers
    var var1 = Number(data[1]);
    var var2 = Number(data[3]);
    var var3 = Number(data[4]);

var snapshot1 = setVars[var1];
var snapshot2 = setVars[var2];

    if (data[2] == "+") {
       setVars[var3] = Number(setVars[var1]) + Number(setVars[var2])
       console.log(setVars[var3])
    } else if (data[2] == "-") {
        setVars[var3] = Number(setVars[var1]) - Number(setVars[var2])
    } else if (data[2] == "..") {
        setVars[var3] = setVars[var1] + setVars[var2]
    } else if (data[2] == "*") {
        setVars[var3] = Number(setVars[var1]) * Number(setVars[var2])
    } else if (data[2] == "/") {
        if (setVars[var2] != 0) {
            setVars[var3] = Number(setVars[var1]) / Number(setVars[var2])
        } else {
            // Handle division by zero error
        }
    } else if (data[2] == "=") {
        if (setVars[var1] == setVars[var2]) {
            setVars[var3] = 1;
            Serial.println("Equal!");
            Serial.print(setVars[var1]);
            Serial.print(setVars[var2]);
        } else {
            setVars[var3] = 0;

                        Serial.println("non Equal!");
                        Serial.print(setVars[var1]);
                        Serial.print(setVars[var2]);
        }
    } else if (data[2] == ">") {
        if (setVars[var1] > setVars[var2]) {
            setVars[var3] = 1;
            Serial.println("True");
        } else {
            setVars[var3] = 0;
            Serial.println("False");
        }
    } else if (data[2] == "<") {
        if (setVars[var1] < setVars[var2]) {
            setVars[var3] = 1;
        } else {
            setVars[var3] = 0;
        }
    } else {
    }
}
if (testLine == "loop") {
      loop = 1;
      loopStart = i +1;
      destroyStart();
    }

    if (testLine == "checkvarresult") {
             var data = [5];
          line += 1;
          data[1] = loadedCode[line];
          Serial.println("checking var result");

          if (setVars[data[1].toInt()] != 1) {
            line+=5;
          } else {
           Serial.println("The variable tested true!");
          }
    }

}

      

            linesSet++;
            if (loop == 1) {
            setTimeout(processCode, 0);
            }
        } else {

        }
    }
processCode();
}


function softCompile(inputString) {
    let result = ''
    let output = ''
    let insideQuotes = false;

    for (let i = 0; i < inputString.length; i++) {
        let char = inputString.charAt(i);

        if (char === '"') {
            insideQuotes = !insideQuotes;
            result += char;
        } else if (char === ' ' && insideQuotes) {
            result += '_';
        } else {
            result += char;
        }
    }
    output = result
    .replace(/ /g, 'z')
    .replace(/_/g, ' ')
    .replace(/\(/g, 'z')
    .replace(/\)/g, '')
    .replace(/,/g, '')
    .replace(/"/g, '')
    .replace(/\n/g, '')
    .replace(/zz/g, 'z');

    console.log(output)
    return output;
}




function onebtn() {
tbnoneClick = 1;
console.log("button 1 Active");
}
function twobtn() {
tbntwoClick = 1;
console.log("button 2 Active");
}



startModules()