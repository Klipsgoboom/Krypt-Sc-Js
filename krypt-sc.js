var red = 255
var green = 255
var blue = 255

var setText = "Krypt-Script JS";
var setTextVar = "Krypt-Script JS";
var coordx = 0;
var coordy = 0;
var scene = 0;
var ifStatments = 0
var currentPhrase = '';
var result = '';
var inputString
var tbnoneClick = 0;
var tbntwoClick = 0;
var sizeX = 0;
var sizeY =0;
var setVars = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var parenthesisOpened = 0

var previewAllowed = false

imageQueue = [];
currentIndex = 0;

function queueImage(src, x, y, w, h) {
    imageQueue.push({ src, x, y, w, h });
    processQueue();
}

function processQueue() {
    if (currentIndex >= imageQueue.length) {
        return;
    }

    const { src, x, y, w, h } = imageQueue[currentIndex];
    const img = new Image();
    img.src = src;

    img.onload = function() {
        ctx.drawImage(img, x, y, w, h);
        currentIndex++;
        processQueue();
    };

    img.onerror = function() {
        console.error('Failed to load image:', src);
        currentIndex++;
        processQueue();
    };
}


try {
    var canvas = document.getElementById("tftScreen");
    var ctx = canvas.getContext("2d")
} catch(error) {

}

function varChecker(varToCheck) {
if (String(varToCheck).includes('KSCvar')) { //is var
    varSplit = varToCheck.split('.')
    return setVars[varSplit[1]];
} else {                             //is not var
    return varToCheck;
}
}

function preview(code) {
inputString = code
var loop = 0;
var loopStart = 0;
var i = 0;
var loadedCode = [];
var currentFunction = ""
var extensionInput = ""


function destroyStart() {
    for (let k = 0; k < loopStart; k++) {
        loadedCode[k] = 'blank'
    }
}

    inputString = softCompile(inputString)
    interpret()

function interpret() {
    var currentChar;
    var line = '';
    var active = 0; //1 = kill read
    var linesSet = 0;
    var extension = ""


    for (let l = 0; l < inputString.length && active == 0; l++) {
        currentChar = inputString[l];

        itemExtension = line.slice(-4)

        if (itemExtension == ".png" || itemExtension == ".jpg") {
            var img = new Image();
            img.src = line
        }


        if (currentChar != '|' && currentChar != 'z') {
            line += currentChar;
        }

        if (currentChar == 'z') {
        loadedCode[linesSet] = line;
        line = '';
        linesSet += 1;  
        }
        if (currentChar == '|') {
        active = 1;
        }

}

function processCode() {
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
 else if (extension == ".var") { //deprecated
        extensionInput = setVars[loadedCode[i+1]]
        testLine = testLine.substring(0, periodIndex);
        extension = ""
}



if (tbnoneClick == 0 && testLine == "bt1click") {
    i++
    }
    if (tbntwoClick == 0 && testLine == "bt2click") {
    i++
    }
    if (tbnoneClick == 1 && testLine == "bt1click") {
    i++
    tbnoneClick = 0;
    currentFunction = loadedCode[i]
    }
    if (tbntwoClick == 1 && testLine == "bt2click") {
        i++
        tbntwoClick = 0;
        currentFunction = loadedCode[i]
    }


    else if (testLine == 'clr') {
        try {
        clrScr();
        }
        catch(error) {
        console.error('Graphics module error: Tried to use a graphics function without a graphics module')
        }
    }
            
    else if (testLine == 'rgb') {
        i++
        red = loadedCode[i];
        i++ 
        green = loadedCode[i];
        i++
        blue = loadedCode[i];
    }

    else if (testLine == 'settext') {
        setText = varChecker(extensionInput)
    }
    else if (testLine == 'skip') {
        i++
    }
    else if (testLine == '{') {
        parenthesisOpened++
        i++;
    }
    else if (testLine == 'goto') {
        i++
        i = varChecker(loadedCode[i])
    }
    else if (testLine == 'exit') {
        var inc = i
        while (loadedCode[inc] != '}') {
            inc +=1
        }

    }
    else if (testLine == 'screen') {
        i++;
        try {
            screenSize(Number(loadedCode[i]), Number(loadedCode[i+1]))
            i++;
        } catch(error) {
        console.error('You dont have a save/load module active')
    }
    }
    else if (testLine == 'save') {
        i++;
        try {
            save(loadedCode[i], setVars[loadedCode[i+1]]) 
        } catch(error) {
        console.error('You dont have a save/load module active')
        }
        i++;
        }
        else if (testLine == 'load') {
            i++;
            try {
                setVars[loadedCode[i+1]] = load(loadedCode[i])
                i++;
            } catch(error) {
            console.error('You dont have a save/load module active')
            }
        }
        else if (testLine == 'deletefile') {
            i++;
            try {
                deleteFile(loadedCode[i])
            } catch(error) {
            console.error('You dont have a save/load module active')
            }
        }
        else if (testLine == 'sprite') {
            i++;
            sprite(Number(varChecker(loadedCode[i])), Number(varChecker(loadedCode[i+1])), Number(varChecker(loadedCode[i+2])), Number(varChecker(loadedCode[i+3])))
            i+=3
        }
        else if (testLine == 'img') {
            i++;
            const imgSrc = loadedCode[i];
            const imgX = Number(loadedCode[i + 1]);
            const imgY = Number(loadedCode[i + 2]);
            const imgW = Number(loadedCode[i + 3]);
            const imgH = Number(loadedCode[i + 4]);

            queueImage(imgSrc, imgX, imgY, imgW, imgH);
            i += 4;
        }
            
        else if (testLine == 'deleteall') {
            try {
                deleteAll()
                } catch(error) {
                console.error('You dont have a save/load module active')
                }
        }

        else if (testLine == 'settextvar') { //deprecated
            i++;
            setText = setVars[loadedCode[i]];

        }
        else if (testLine == 'function') {
            i++;
            if (loadedCode[i] != currentFunction) {
                var inc = i
                while (loadedCode[inc] != '}' && parenthesisOpened == 0) {
                inc +=1;
                if (parenthesisOpened == 0 && loadedCode[inc] == '}') {
                    i = inc
                }
            }
            if (loadedCode[inc] == '}' && parenthesisOpened == 0) {
                i = inc
                currentFunction = ""
            }
            }
        }
        else if (testLine == 'callfunction') {
                currentFunction = extensionInput
            }
            else if (testLine == '}' && parenthesisOpened == 0) {
                currentFunction = ""
            } else if(testLine == '}' && parenthesisOpened != 0) {
                parenthesisOpened -=1
            }
            else if (testLine == 'coordx') {
                coordx = varChecker(extensionInput);
            }
            else if (testLine == 'coordy') {
                coordy = varChecker(extensionInput);
            }
            else if (testLine == "sign") {
                writeText();
            }
            else if (testLine == "setvar") {
                var data = [5];
                i++
                data[1] = loadedCode[i];
                i++
                data[2] = loadedCode[i];
                setVars[data[1]] = data[2];
      }
      else if (testLine == 'if') {
        i++
        var arg1 = varChecker(loadedCode[i])
        i++
        var arg2 = varChecker(loadedCode[i])
        i++
        var arg3 = varChecker(loadedCode[i])
        i++
        parenthesisOpened++;
        var inc = i
        if (arg1 <= arg3 && arg2 == '>' || arg2 == '<' && arg1 >= arg3 || arg2 == '==' && arg1 != arg3 || arg2 == '!=' && arg1 == arg3) {
            while (loadedCode[inc] != '}' && parenthesisOpened >= 1) {

                inc++
            }
            if (loadedCode[inc] == '}' && parenthesisOpened >= 1) {
            i = inc
            parenthesisOpened -= 1
            }
        } else {
            i++
        }
    }
    else if (testLine == "var") {
    var firstVar;
    var secondVar;
    var thirdVar;

    var data = [5];

    i++
    data[1] = varChecker(loadedCode[i]); // variable number
    i++
    data[2] = loadedCode[i]; // operator
    i++
    data[3] = varChecker(loadedCode[i]); // variable number
    i++
    data[4] = loadedCode[i]; // variable to store result in

    // Convert data[1] and data[3] to integers
    var var1 = Number(data[1]);
    var var2 = Number(data[3]);
    var var3 = Number(data[4]);

var snapshot1 = setVars[var1];
var snapshot2 = setVars[var2];

    if (data[2] == "+") {
       setVars[var3] = Number(var1) + Number(var2)
    } else if (data[2] == "-") {
        setVars[var3] = Number(var1) - Number(var2)
    } else if (data[2] == "..") {
        setVars[var3] = var1 + var2
    } else if (data[2] == "*") {
        setVars[var3] = Number(var1) * Number(var2)
    } else if (data[2] == "/") {
        if (var2 != 0) {
            setVars[var3] = Number(var1) / Number(var2)
        } else {
            // Handle division by zero error
        }
    } else if (data[2] == "=") {
        if (var1 == var2) {
            setVars[var3] = 1;
            Serial.println("Equal!");
            Serial.print(var1);
            Serial.print(var2);
        } else {
            setVars[var3] = 0;

                        Serial.println("non Equal!");
                        Serial.print(var1);
                        Serial.print(var2);
        }
    } else if (data[2] == ">") {
        if (var1 > var2) {
            setVars[var3] = 1;
            Serial.println("True");
        } else {
            setVars[var3] = 0;
            Serial.println("False");
        }
    } else if (data[2] == "<") {
        if (var1 < var2) {
            setVars[var3] = 1;
        } else {
            setVars[var3] = 0;
        }
    } else {
    }
}
else if (testLine == "loop") {
    //if (previewAllowed == true){
        loop = 1;
        loopStart = i +1;
        destroyStart();
    //}
    loop = 1;
    }

    else if (testLine == "checkvarresult") {
             var data = [5];
          line += 1;
          data[1] = loadedCode[line];
          Serial.println("checking var result");

          if (setVars[data[1].toInt()] != 1) {
            line+=5;
          } else {
           Serial.println("The variable tested true!");
          }
    } else if (loadedCode[i] != "blank") {
        //console.warn( '"' + loadedCode[i] + '"' + " performed no actions. That is fine if it is any argument input.")
    }

}

      

            linesSet++;
            if (loop == 1) {
            setTimeout(processCode, 0);
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
    .replace(/;/g, 'z')
    .replace(/ /g, 'z')
    .replace(/_/g, ' ')
    .replace(/\(/g, 'z')
    .replace(/\)/g, '')
    .replace(/,/g, '')
    .replace(/"/g, '')
    .replace(/\n/g, '')

    return output;
}



startModules()
}
function onebtn() {
    tbnoneClick = 1;
    }
    function twobtn() {
    tbntwoClick = 1;
    }
