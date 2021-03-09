var splash, mainPage, mainPage2,contact,tutorial,tutorial1,tutorial2,tutorial;
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


window.onload = ()=>{
	crearReferencias();
	setTimeout(()=>{goTo(mainPage);},1500);

	addevent();
	
	change();
	
	
	
}

function crearReferencias(){
	splash = document.getElementById("splash");
	mainPage = document.getElementById("mainPage");
	mainPage2 = document.getElementById("mainPage2");
	contacto = document.getElementById("contact");
	tutorial = document.getElementById("tutorial");
	tutorial1 = document.getElementById("tutorial1");
	tutorial2 = document.getElementById("tutorial1");
	tutorial3 = document.getElementById("tutorial1");
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
