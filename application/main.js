// [config]
autoRun = true //run the code when the file is opened


var kryptScCode = 
`
load("count", 4);
load("factories", 5);
setvar(1, 1);


keydown(a, addCookie);
keydown(b, addFactory);


loop;
clr;

coordx(100);
coordy(0);
settext("Bad Cookie Clicker");
sign;

coordx(100);
coordy(50);
settext("Cookies: ");
sign;

coordx(175);
coordy(50);
settext KSCvar.4;
sign;

coordx(100);
coordy(100);
settext("Factories: ");
sign;

coordx(175);
coordy(100);
settext KSCvar.5;
sign;

coordx(100);
coordy(200);
settext("Click 2 or b to buy factory for $40");
sign;
bt1click addCookie;
bt2click addFactory;
function addCookie;
var(KSCvar.5, *, KSCvar.1, 2);
var(KSCvar.4, +, KSCvar.2, 4);
var(KSCvar.4, +, KSCvar.1, 4);
save("count", 4);
};

function addFactory;
setvar(1, 1);
if(KSCvar.4 > 39); {;
var(KSCvar.4, -, 40, 4);
save("count", 4);
var(KSCvar.5, +, KSCvar.1, 5);
save("factories", 5);
};
};
|;
`;