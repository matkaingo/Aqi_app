var splash, mainPage, mainPage2,contact,tutorial;
var section;
var ret, ret1, ret2, ret3, ret4, ret5, retbackup;
var next, next1, next2, next3;
var btn, btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8,btn9,btn10, btn11;
var cantidad;
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f=new Date();
var date=document.getElementById("fecha");
var date_1=document.getElementById("fecha_1");
var datos=JSON.parse('[{"Barrio": "UPB", "Coordenadas": [6.242637280603178, -75.58945342238027], "aqi": ["86", "105", "112", "148", "109", "128", "113", "95", "128", "89", "82", "80", "74", "76", "73", "76", "74", "81", "74", "39", "59", "75", "69", "80", "88", "78", "108", "121", "139", "123", "184", "101", "81", "83", "83", "68", "83", "77", "70", "78", "96", "105", "42", "21", "29", "38", "51", "28", "72", "90", "90", "97", "86", "92", "81", "90", "140", "138", "113", "95", "89", "93", "55", "55", "54", "72", "69", "106", "109", "99", "110", "103", "109", "134", "117", "123", "100", "83", "102", "123", "63", "51", "63", "55", "89", "110", "102", "65", "94", "98", "92", "92", "115", "123", "105"]}, {"Barrio": "La America", "Coordenadas": [6.250081569077918, -75.61670894284408], "aqi": ["78", "121", "113", "133", "115", "88", "82", "56", "28", "53", "33", "29", "23", "52", "39", "51", "47", "33", "44", "24", "36", "69", "121", "89", "151", "122", "95", "114", "72", "63", "76", "59", "48", "51", "22", "62", "37", "43", "58", "60", "67", "76", "45", "37", "40", "44", "45", "104", "80", "95", "82", "53", "68", "52", "67", "60", "67", "62", "69", "73", "63", "64", "72", "40", "73", "85", "104", "90", "98", "65", "79", "78", "145", "91", "78", "62", "57", "61", "45", "58", "3", "63", "73", "112", "160", "94", "81", "87", "78", "96", "89", "134", "154", "71"]}, {"Barrio": "Santa Monica", "Coordenadas": [6.248792644957115, -75.60899911732578], "aqi": ["77", "119", "112", "136", "114", "95", "81", "57", "42", "55", "46", "39", "34", "53", "49", "56", "52", "43", "49", "33", "70", "114", "85", "140", "119", "92", "114", "82", "72", "80", "64", "57", "57", "34", "67", "47", "53", "62", "63", "73", "83", "48", "32", "38", "42", "40", "102", "83", "92", "82", "57", "67", "54", "68", "63", "72", "67", "72", "74", "67", "60", "70", "42", "71", "80", "102", "91", "99", "68", "83", "80", "142", "93", "81", "66", "59", "67", "55", "59", "7", "65", "73", "109", "158", "96", "85", "80", "95", "89", "130", "153", "78"]}, {"Barrio": "San Javier", "Coordenadas": [6.255813108611198, -75.61829808398893], "aqi": ["74", "113", "109", "128", "111", "87", "81", "53", "25", "51", "35", "28", "24", "52", "39", "51", "51", "35", "45", "27", "65", "111", "83", "139", "115", "93", "110", "69", "63", "75", "57", "49", "52", "24", "64", "42", "47", "59", "61", "67", "75", "47", "37", "41", "45", "43", "97", "76", "90", "78", "50", "67", "51", "67", "60", "66", "61", "69", "74", "61", "67", "72", "40", "69", "81", "97", "85", "96", "65", "81", "75", "140", "92", "78", "63", "57", "61", "45", "61", "10", "62", "73", "107", "158", "94", "83", "78", "94", "86", "127", "152", "70"]}, {"Barrio": "Bel\u00e9n", "Coordenadas": [6.231531796377768, -75.59232027670221], "aqi": ["93", "98", "104", "131", "102", "120", "121", "106", "127", "91", "77", "75", "78", "79", "71", "72", "72", "85", "78", "37", "62", "71", "70", "74", "81", "77", "99", "115", "134", "130", "201", "102", "83", "82", "90", "64", "78", "70", "70", "76", "92", "105", "55", "31", "41", "41", "55", "48", "66", "81", "85", "95", "88", "96", "92", "95", "139", "127", "108", "94", "82", "91", "53", "55", "68", "80", "76", "107", "115", "99", "117", "96", "111", "127", "115", "116", "105", "92", "106", "131", "53", "75", "71", "60", "89", "97", "98", "61", "97", "98", "89", "90", "105", "109", "106"]}, {"Barrio": "La Mota", "Coordenadas": [6.210879176579839, -75.59774092474163], "aqi": ["94", "83", "89", "95", "84", "106", "112", "102", "91", "83", "66", "61", "78", "74", "67", "63", "70", "85", "79", "51", "4", "64", "54", "69", "60", "71", "80", "93", "108", "113", "130", "203", "89", "84", "77", "94", "62", "64", "66", "75", "72", "85", "102", "74", "49", "57", "47", "52", "62", "55", "61", "68", "85", "86", "89", "95", "92", "102", "83", "83", "84", "66", "85", "188", "48", "61", "97", "85", "88", "97", "107", "96", "110", "83", "97", "98", "97", "94", "108", "98", "106", "116", "40", "118", "89", "81", "93", "81", "90", "64", "96", "89", "78", "82", "79", "84", "115"]}, {"Barrio": "El Poblado", "Coordenadas": [6.203488762945017, -75.570242357202], "aqi": ["84", "77", "77", "92", "87", "106", "103", "112", "97", "60", "54", "49", "60", "52", "54", "54", "61", "65", "72", "54", "41", "36", "49", "58", "60", "63", "66", "62", "65", "84", "88", "144", "79", "67", "70", "75", "31", "57", "51", "57", "54", "67", "92", "75", "32", "45", "50", "35", "30", "49", "32", "47", "55", "64", "76", "80", "76", "87", "80", "75", "71", "70", "76", "177", "55", "44", "68", "66", "71", "74", "71", "68", "72", "70", "80", "73", "69", "88", "100", "102", "103", "96", "48", "69", "57", "69", "74", "67", "77", "73", "83", "98", "83", "79", "74", "75", "89"]}, {"Barrio": "Conquistadores", "Coordenadas": [6.242113476057693, -75.58124632873206], "aqi": ["89", "99", "111", "151", "109", "138", "129", "110", "153", "100", "91", "91", "82", "83", "78", "81", "81", "90", "81", "37", "3", "51", "63", "62", "63", "77", "72", "104", "129", "153", "137", "175", "113", "86", "90", "93", "62", "93", "83", "71", "81", "102", "110", "36", "19", "27", "37", "53", "33", "62", "89", "91", "102", "93", "102", "89", "97", "155", "154", "130", "104", "95", "103", "57", "48", "55", "71", "66", "107", "111", "97", "123", "110", "119", "129", "123", "141", "116", "91", "115", "148", "66", "54", "58", "40", "81", "87", "103", "71", "98", "107", "92", "94", "110", "111", "108"]}, {"Barrio": "El Danubio", "Coordenadas": [6.255396824565169, -75.60699831045234], "aqi": ["69", "110", "107", "128", "106", "96", "75", "52", "30", "51", "51", "37", "37", "52", "52", "56", "54", "47", "49", "45", "68", "99", "77", "120", "109", "89", "106", "83", "73", "77", "62", "61", "59", "39", "73", "53", "58", "65", "66", "76", "84", "54", "30", "38", "44", "33", "94", "79", "82", "74", "55", "62", "52", "66", "54", "65", "64", "70", "73", "65", "60", "71", "43", "65", "73", "92", "86", "97", "66", "87", "76", "132", "94", "77", "65", "60", "67", "53", "64", "18", "66", "76", "104", "155", "97", "78", "78", "90", "83", "118", "142", "83"]}, {"Barrio": "San Diego", "Coordenadas": [6.232445332769878, -75.56876073878705], "aqi": ["94", "94", "105", "147", "110", "143", "144", "132", "159", "102", "92", "95", "83", "80", "76", "79", "83", "90", "86", "30", "25", "53", "57", "53", "66", "65", "88", "115", "153", "139", "219", "117", "81", "92", "96", "39", "95", "75", "62", "75", "93", "107", "35", "16", "25", "36", "54", "27", "49", "78", "85", "95", "93", "110", "94", "98", "160", "157", "139", "105", "98", "105", "62", "30", "52", "68", "65", "103", "101", "84", "122", "103", "121", "113", "114", "151", "126", "102", "127", "154", "65", "43", "36", "20", "70", "64", "96", "56", "104", "121", "95", "96", "104", "97", "101"]}]');
var actual=0, bar=90;
var aqi1, aqi2, aqi3, aqi4, aqi5, aqi6, aqi7, aqi8, aqi9, aqi10, aqi11;
var barrio11;
window.onload = ()=>{
	crearReferencias();

	setTimeout(()=>{goTo(mainPage);},1500);
	update();
	addevent();
	setInterval('update()',5000);
	setInterval('change()',5000);
	setInterval('change1()',5000);
	setInterval('recomendation()',5000);
	change();
	Start();
}

function crearReferencias(){
	splash = document.getElementById("splash");
	mainPage = document.getElementById("mainPage");
	mainPage2 = document.getElementById("mainPage2");
	contacto = document.getElementById("contact");
	tutorial = document.getElementById("tutorial");
	tutorial1 = document.getElementById("tutorial1");
	tutorial2 = document.getElementById("tutorial2");
	tutorial3 = document.getElementById("tutorial3");
	section = [splash,mainPage,mainPage2,contacto,tutorial,tutorial1,tutorial2,tutorial3];
	btn  = document.getElementById("btn");
	btn1  = document.getElementById("btn1");
	btn2 = document.getElementById("btn2");
	btn3  = document.getElementById("btn3");
	btn4  = document.getElementById("btn4");
	btn5  = document.getElementById("btn5");
	btn6  = document.getElementById("btn6");
	btn7  = document.getElementById("btn7");
	btn8  = document.getElementById("btn8");
	btn9  = document.getElementById("btn9");
	btn10  = document.getElementById("btn10");
	btn11  = document.getElementById("btn11");
	ret  = document.getElementById("ret");
	ret1  = document.getElementById("ret1");
	ret2  = document.getElementById("ret2");
	ret3  = document.getElementById("ret3");
	ret4  = document.getElementById("ret4");
	ret5  = document.getElementById("ret5");
	next  = document.getElementById("next");
	next1  = document.getElementById("next1");
	next2  = document.getElementById("next2");
	next3  = document.getElementById("next3");
	aqi1  = document.getElementById("Aqi1");
	aqi2  = document.getElementById("Aqi2");
	aqi3  = document.getElementById("Aqi3");
	aqi4  = document.getElementById("Aqi4");
	aqi5  = document.getElementById("Aqi5");
	aqi6  = document.getElementById("Aqi6");
	aqi7  = document.getElementById("Aqi7");
	aqi8  = document.getElementById("Aqi8");
	aqi9  = document.getElementById("Aqi9");
	aqi10  = document.getElementById("Aqi10");
	aqi11  = document.getElementById("Aqi11");

	barrio11 = document.getElementById("barrio11");
}
function goTo(sec){
	document.body.style.backgroundImage = "url('img/background.jpeg')";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundPosition = "center";
	document.body.style.backgroundAttachment = "fixed";
	hide();
	sec.classList.remove("ocultar");
	change();
	change1();
	recomendation();
	date.textContent=diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()];
	date_1.textContent=diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()];

}
function hide()
{
	for(i in section)
	{
		section[i].classList.add("ocultar");
		
	}
}
function addevent()
{
	btn.addEventListener("click", ()=>{goTo(mainPage2);});
	btn1.addEventListener("click", ()=>{goTo(mainPage2);});
	btn2.addEventListener("click", ()=>{goTo(mainPage2);});
	btn3.addEventListener("click", ()=>{goTo(mainPage2);});
	btn4.addEventListener("click", ()=>{goTo(mainPage2);});
	btn5.addEventListener("click", ()=>{goTo(mainPage2);});
	btn6.addEventListener("click", ()=>{goTo(mainPage2);});
	btn7.addEventListener("click", ()=>{goTo(mainPage2);});
	btn8.addEventListener("click", ()=>{goTo(mainPage2);});
	btn9.addEventListener("click", ()=>{goTo(mainPage2);});

	btn.addEventListener("click", function(){update2(0)});
	btn1.addEventListener("click", function(){update2(1)});
	btn2.addEventListener("click", function(){update2(2)});
	btn3.addEventListener("click", function(){update2(3)});
	btn4.addEventListener("click", function(){update2(4)});
	btn5.addEventListener("click", function(){update2(5)});
	btn6.addEventListener("click", function(){update2(6)});
	btn7.addEventListener("click", function(){update2(7)});
	btn8.addEventListener("click", function(){update2(8)});
	btn9.addEventListener("click", function(){update2(9)});

	btn10.addEventListener("click", ()=>{goTo(contacto);});
	btn11.addEventListener("click", ()=>{goTo(tutorial);});
	ret.addEventListener("click", ()=>{goTo(mainPage);});
	ret1.addEventListener("click", ()=>{goTo(mainPage);});
	ret2.addEventListener("click", ()=>{goTo(mainPage);});
	ret3.addEventListener("click", ()=>{goTo(mainPage);});
	ret4.addEventListener("click", ()=>{goTo(mainPage);});
	ret5.addEventListener("click", ()=>{goTo(mainPage);});
	next.addEventListener("click", ()=>{goTo(tutorial1);}); 
	next1.addEventListener("click", ()=>{goTo(tutorial2);}); 
	next2.addEventListener("click", ()=>{goTo(tutorial3);}); 
	next3.addEventListener("click", ()=>{goTo(tutorial);}); 
}

function update2(num){
	actual=num;
	aqi11.textContent=datos[actual].aqi[bar-1];
	barrio11.textContent=datos[actual].Barrio;
	
}

function update(){
	
	aqi1.textContent=datos[0].aqi[bar];
	aqi2.textContent=datos[1].aqi[bar];
	aqi3.textContent=datos[2].aqi[bar];
	aqi4.textContent=datos[3].aqi[bar];
	aqi5.textContent=datos[4].aqi[bar];
	aqi6.textContent=datos[5].aqi[bar];
	aqi7.textContent=datos[6].aqi[bar];
	aqi8.textContent=datos[7].aqi[bar];
	aqi9.textContent=datos[8].aqi[bar];
	aqi10.textContent=datos[9].aqi[bar];
	aqi11.textContent=datos[actual].aqi[bar];
	bar=bar+1;
	if(bar > 90)
		bar=0;
		
}

function Start(){
	var barrio1 = document.getElementById("barrio1");
	var barrio2 = document.getElementById("barrio2");
	var barrio3 = document.getElementById("barrio3");
	var barrio4 = document.getElementById("barrio4");
	var barrio5 = document.getElementById("barrio5");
	var barrio6 = document.getElementById("barrio6");
	var barrio7 = document.getElementById("barrio7");
	var barrio8 = document.getElementById("barrio8");
	var barrio9 = document.getElementById("barrio9");
	var barrio10 = document.getElementById("barrio10");
	
	barrio1.textContent=datos[0].Barrio;
	barrio2.textContent=datos[1].Barrio;
	barrio3.textContent=datos[2].Barrio;
	barrio4.textContent=datos[3].Barrio;
	barrio5.textContent=datos[4].Barrio;
	barrio6.textContent=datos[5].Barrio;
	barrio7.textContent=datos[6].Barrio;
	barrio8.textContent=datos[7].Barrio;
	barrio9.textContent=datos[8].Barrio;
	barrio10.textContent=datos[9].Barrio;
}

function change(){
	var image=document.getElementById("nube")
	var numero=textContent();

	if(numero<=50){
		image.src="img/green.png";
	}
	else if(numero<=100){
		image.src="img/yellow.png";

	}
	else if(numero<=150){
		image.src="img/orange.png";
	}
	else if(numero<=200){
		image.src="img/red.png";
	}
	else if(numero<=300){
		image.src="img/purple.png";
	}
	else if(numero>300){
		image.src="img/granate.png";
	}
}

function change1(){
	var image1=document.getElementById("nube1");
	var numero1=document.getElementById("cantidad_aqi1").textContent;

	if(numero1<=50){
		image1.src="img/green.png";
	}
	else if(numero1<=100){
		image1.src="img/yellow.png";

	}
	else if(numero1<=150){
		image1.src="img/orange.png";
	}
	else if(numero1<=200){
		image1.src="img/red.png";
	}
	else if(numero1<=300){
		image1.src="img/purple.png";
	}
	else if(numero1>300){
		image1.src="img/granate.png";
	}
}

function recomendation(){
	var message=document.getElementById("mensaje");
	var recomenda=document.getElementById("recomendacion");
	var cantidad=document.getElementById("cantidad_aqi1").textContent;
	
	if(cantidad<=50){
		message.textContent="Hoy hace buen dia, disfruta de tus actividades cuidando el medio ambiente...";
		recomenda.textContent="No hay riesgo en salir al aire libre, puedes salir y realizar actividades con tu familia o amigos.";
		message.style.color="green";
	}
	else if(cantidad<=100){
		message.textContent="Hoy no es el dia perfecto pero aun puedes salir a disfrutar...";
		recomenda.textContent="Solo hay riesgo en salir al aire libre para personas muy sensibles a la contaminación ambiental.";
		message.style.color="yellow";

	}
	else if(cantidad<=150){
		message.textContent="No hace tan buen dia, sal a lo necesario y quedate en casa maratoneando tu serie favorita...";
		recomenda.textContent="Los miembros de grupos sensibles pueden padecer efectos en la salud, no afecta en gran escala a las personas en general.";
		message.style.color="orange";
	}
	else if(cantidad<=200){
		message.textContent="Quedate en casa, evitemos enfermarnos...";
		recomenda.textContent="Hoy hace un mal dia, todos pueden padecer efectos negativos en su salud, grupos sensible pueden llegar a padecer efectos más graves.";
		message.style.color="red";
	}
	else if(cantidad<=300){
		message.textContent="No salgas, cuida el ambiente para evitar estas situaciones de emergencia...";
		recomenda.textContent="Hoy nadie deberia salir de su hogar,  hay advertencias ssanitarias de condiciones de emergencia, la mayoria de la población puede llegar a estar afectada.";
		message.style.color="purple";
	}
	else if(cantidad>300){
		message.style.color="brown";
		message.textContent="Sal de tu ciudad para evitar problemas en tu salud...";
		message.textContent="Recomendable moverse de su localización, hay alerta sanitaria por lo que toda persona puede llegar a tener efectos graves en la salud.";
	}
}



function textContent(){
	cantidad=document.getElementById("cantidad_aqi").textContent;
	return cantidad;
}
