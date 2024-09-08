//?------------------------MENSAJE DE INICIO ------------ //
alert("Vamos a analizar que rueda necesita tu ventana corrediza");

//! datos necesarios
const pesoDelAluminioModenaAlto = 0.64 + 0.58; // alcemar jamba + encuentro x mt lineal // 1.237 flamia 
const pesoDelAluminioModenaAncho = 0.64 + 1.26; //alcemar dintel + zocalo x mt lineal // 1.917  flamia
const pesoDelAluminioA30Alto = 1.198 + 1.17; // alcemar jamba + encuentro x mt lineal // 2,344 flamia
const pesoDelAluminioA30Ancho = 0.862 + 1.38; // alcemar dintel + zocalo x mt lineal // 2,236 flamia
const pesoDelPVCJumbo = 3.6; // es el mismo perfil todo la hoja x mt lineal
const pesoDelPVCPrime = 2.8; // es el mismo perfil todo la hoja x mt lineal
const pesoDelVidrioConstante = 2.5;

//!---FUNCION DE CHEQUEO//
function Chequeo(ingreso, maximo, error) {
    let nombre
    for (nombre = parseFloat(prompt(ingreso)); isNaN(nombre) || nombre > maximo; nombre = parseFloat(prompt(ingreso))) {
        if (nombre > maximo) {
            alert(error)
        } else {
            alert("No se ingreso un número. Intente nuevamente.");
        }
    }
    return nombre;
}

//! FUNCION DE RECOLECCION DE DATOS Y  ARRAY ORIGINAL
function datos() {
    let ventanas = [];
    let continuar = true;
    while (continuar === true) {
        let anchoVentana = Chequeo("Ingrese el ancho de la ventana total en metros", 100, "El numero es mayor a 100. Recorda que la medida debe ser en metros. Intente nuevamente.");
        let altoVentana = Chequeo("Ingrese el alto de la ventana total en metros", 100, "El numero es mayor a 100. Recorda que la medida debe ser en metros. Intente nuevamente.");
        let espesorVidrio = Chequeo("Ingrese el espesor del vidrio colocado en milimetros", 50, "El numero es mayor a 50. Recorda que ninguna linea admite acristalamiento con tanto grosor");

        let cantidadHojas = parseInt(prompt("Ingrese cuantas hojas tiene la ventana en número. Con un mínimo de 2 y un máximo de 6 hojas"));
        while (isNaN(cantidadHojas) || cantidadHojas < 2 || cantidadHojas > 6) {
            alert("Selección inválida. Intente nuevamente.");
            cantidadHojas = parseInt(prompt("Ingrese cuantas hojas tiene la ventana en número. Con un mínimo de 2 y un máximo de 6 hojas"));
        }

        let linea = parseInt(prompt(`Seleccione la línea de la ventana según el número de la lista (Ejemplo: Si la línea es Modena, ingrese: 1)
    1. Modena 
    2. A30
    3. Jumbo 
    4. Prime`));
        while (isNaN(linea) || linea < 1 || linea > 4) {
            alert("Selección inválida. Intente nuevamente.");
            linea = parseInt(prompt(`Seleccione la línea de la ventana según el número de la lista (Ejemplo: Si la línea es Modena, ingrese: 1)
            1. Modena 
            2. A30
            3. Jumbo 
            4. Prime`));
        }
        ventanas.push({ anchoVentana: anchoVentana , altoVentana: altoVentana , cantidadHojas: cantidadHojas , espesorVidrio: espesorVidrio , linea: linea});

        let respuesta = prompt("¿Querés calcular otra ventana? Si/No").toLowerCase();
            if (respuesta === "si") {
                continuar = true;
            } else if( respuesta === "no") {
                alert("Abri la consola para ver los resultados");
                continuar = false;
            }  
    }

    return ventanas

}
    class Ruedas {
        constructor(modelo, codigo, peso) {
            this.nombre = modelo;
            this.codigo = codigo;
            this.peso = peso;
        }
        seleccionada() {
            console.log("Debes colocar " + this.nombre + " , su codigo es " + this.codigo + " y soporta " + this.peso + "kg");
        }
    }
    
    //Modena
    let ruedaSimpleModena = new Ruedas("Rueda simple Modena", "ROL119", 60);
    let ruedaDobleModena = new Ruedas("Rueda doble Modena", "ROL120", 120);
    let ruedasModena= [ruedaSimpleModena, ruedaDobleModena];
    // A30
    let ruedaSimpleA30 = new Ruedas("Rueda simple A30", "ROL126", 110);
    let ruedaDobleA30 = new Ruedas("Rueda doble A30", "ROL127", 220);
    let ruedasA30= [ruedaSimpleA30, ruedaDobleA30];
    // Prime
    let ruedaCarroPrime = new Ruedas("Rueda doble carro plastica", "L-25004-21-0-1", 70);
    let ruedaSimplePrime = new Ruedas("Rueda simple Ducasse para Balconera", "L-23230-70-0-8", 140);
    let ruedaDoblePrime = new Ruedas("Rueda doble Ducasse para Balconera", "L-23300-00-0-8", 280);
    let ruedasPrime= [ruedaCarroPrime,ruedaSimplePrime, ruedaDoblePrime];
    // Jumbo
    let ruedaSimpleJumbo = new Ruedas("Rueda simple Jumbo", "L-25006-59-0-6", 140);
    let ruedaDobleJumbo = new Ruedas("Rueda doble A30", "L-25008-59-0-6", 280);
    let ruedasJumbo= [ruedaSimpleJumbo, ruedaDobleJumbo ];




function asignaciondeRuedasModena(lineanum,  ventanas, linea){
    let lineaSeleccionada = ventanas.filter((ventana) => ventana.linea === lineanum);
    console.log(` Ventanas de la linea  ${linea} `)
    lineaSeleccionada.forEach(objeto => {
        let anchoHoja = objeto.anchoVentana / objeto.cantidadHojas;
        let pesoDelVidrioEnHoja = anchoHoja * objeto.altoVentana * pesoDelVidrioConstante * objeto.espesorVidrio;
        let pesoModena = (anchoHoja * pesoDelAluminioModenaAncho) + (objeto.altoVentana * pesoDelAluminioModenaAlto) + pesoDelVidrioEnHoja;
        console.log(` La ventana de la linea ${linea} con un ancho de ${objeto.anchoVentana} mts, un alto de ${objeto.altoVentana} mts separada en ${objeto.cantidadHojas} hojas. Llevaria las siguientes ruedas: ` );
        if (pesoModena < ruedaSimpleModena.peso) {
            ruedaSimpleModena.seleccionada();
        } else if (pesoModena < ruedaDobleModena.peso) {
            ruedaDobleModena.seleccionada();
        } else {
            console.log("La ventana es muy grande para esta linea. El peso de la hoja es : " + Math.round(pesoModena) + "kg");
        }
    });
    
}
let ventanas= datos();
asignaciondeRuedasModena(1,  ventanas, "Modena");


/*  let a30= ventanas.filter((ventana) => ventana.linea === 2);
    let jumbo= ventanas.filter((ventana) => ventana.linea === 3);
    let prime= ventanas.filter((ventana) => ventana.linea === 4);
    let anchoHoja = anchoVentana / cantidadHojas;
    let pesoDelVidrioEnHoja = anchoHoja * altoVentana * pesoDelVidrioConstante * espesorVidrio;
let pesoModena = (anchoHoja * pesoDelAluminioModenaAncho) + (altoVentana * pesoDelAluminioModenaAlto) + pesoDelVidrioEnHoja;
let pesoA30 = (anchoHoja * pesoDelAluminioA30Ancho) + (altoVentana * pesoDelAluminioA30Alto) + pesoDelVidrioEnHoja;
let perimetro = anchoHoja + anchoHoja + altoVentana + altoVentana;
let pesoPrime = (perimetro * pesoDelPVCPrime) + pesoDelVidrioEnHoja;
let pesoJumbo = (perimetro * pesoDelPVCJumbo) + pesoDelVidrioEnHoja; */


