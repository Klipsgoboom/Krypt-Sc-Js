// [config]
autoRun = true //run the code when the file is opened


var kryptScCode = 
`
setvar(1, 5) 
setvar(3, 5) 
setvar(4, 5) 

loop 
clr 
bt1click(moveRight) 
bt2click(moveLeft) 

function moveRight 
var(3, +, 1, 3) 
} 

function moveLeft 
var(4, +, 1, 4) 
} 

coordx 10 
coordy 10 
settext "move left and right with button 1 and 2" 
sign 

coordx.var(3) 
coordy.var(4) 
settext "0" 
sign 
| 
`;