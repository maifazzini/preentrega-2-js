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

//!---FUNCION DE CHEQUEO
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
        ventanas.push({ anchoVentana: anchoVentana, altoVentana: altoVentana, cantidadHojas: cantidadHojas, espesorVidrio: espesorVidrio, linea: linea });

        let respuesta = prompt("¿Querés calcular otra ventana? Si/No").toLowerCase();
        if (respuesta === "si") {
            continuar = true;
        } else if (respuesta === "no") {
            alert("Abri la consola para ver los resultados");
            continuar = false;
        }
    }

    return ventanas

}
//! --------------- RUEDAS
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
//!Modena
let ruedaSimpleModena = new Ruedas("Rueda simple Modena", "ROL119", 60);
let ruedaDobleModena = new Ruedas("Rueda doble Modena", "ROL120", 120);

//! A30
let ruedaSimpleA30 = new Ruedas("Rueda simple A30", "ROL126", 110);
let ruedaDobleA30 = new Ruedas("Rueda doble A30", "ROL127", 220);

//! Prime
let ruedaCarroPrime = new Ruedas("Rueda doble carro plastica", "L-25004-21-0-1", 70);
let ruedaSimplePrime = new Ruedas("Rueda simple Ducasse para Balconera", "L-23230-70-0-8", 140);
let ruedaDoblePrime = new Ruedas("Rueda doble Ducasse para Balconera", "L-23300-00-0-8", 280);

//! Jumbo
let ruedaSimpleJumbo = new Ruedas("Rueda simple Jumbo", "L-25006-59-0-6", 140);
let ruedaDobleJumbo = new Ruedas("Rueda doble A30", "L-25008-59-0-6", 280);



//! ASIGNACION DE RUEDAS POR LINEA

function asignaciondeRuedasModena(ventanas) {
    let Modena = ventanas.filter((ventana) => ventana.linea === 1);
    console.log(`%c----------- Ventanas de la linea Modena -----------`, "color: orange")
    Modena.forEach(objeto => {
        let anchoHoja = objeto.anchoVentana / objeto.cantidadHojas;
        let pesoDelVidrioEnHoja = anchoHoja * objeto.altoVentana * pesoDelVidrioConstante * objeto.espesorVidrio;
        let pesoModena = (anchoHoja * pesoDelAluminioModenaAncho) + (objeto.altoVentana * pesoDelAluminioModenaAlto) + pesoDelVidrioEnHoja;
        console.log(` La ventana de la linea Modena con un ancho de ${objeto.anchoVentana} mts, un alto de ${objeto.altoVentana} mts separada en ${objeto.cantidadHojas} hojas con un espesor de vidrio de ${objeto.espesorVidrio}  mm. Su peso por hoja es de ${pesoModena.toFixed(2)} kg. Llevaria las siguientes ruedas: `);
        if (pesoModena < ruedaSimpleModena.peso) {
            ruedaSimpleModena.seleccionada();
        } else if (pesoModena < ruedaDobleModena.peso) {
            ruedaDobleModena.seleccionada();
        } else {
            console.log("La ventana es muy grande para esta linea. El peso de la hoja es : " + Math.round(pesoModena) + "kg");
        }
    });

}
function asignaciondeRuedasA30(ventanas) {
    let A30 = ventanas.filter((ventana) => ventana.linea === 2);
    console.log(`%c----------- Ventanas de la linea A30 -----------`, "color: orange")
    A30.forEach(objeto => {
        let anchoHoja = objeto.anchoVentana / objeto.cantidadHojas;
        let pesoDelVidrioEnHoja = anchoHoja * objeto.altoVentana * pesoDelVidrioConstante * objeto.espesorVidrio;
        let pesoA30 = (anchoHoja * pesoDelAluminioA30Ancho) + (objeto.altoVentana * pesoDelAluminioA30Alto) + pesoDelVidrioEnHoja;
        console.log(` La ventana de la linea A30 con un ancho de ${objeto.anchoVentana} mts, un alto de ${objeto.altoVentana} mts separada en ${objeto.cantidadHojas} hojas con un espesor de vidrio de ${objeto.espesorVidrio}  mm. Su peso por hoja es de ${pesoA30.toFixed(2)} kg. Llevaria las siguientes ruedas: `);
        if (pesoA30 < ruedaSimpleA30.peso) {
            ruedaSimpleA30.seleccionada();
        } else if (pesoA30 < ruedaDobleA30.peso) {
            ruedaDobleA30.seleccionada();
        } else {
            console.log("La ventana es muy grande para esta linea. El peso de la hoja es :" + Math.round(pesoA30) + "kg");
        }
    });

}
function asignaciondeRuedasPrime(ventanas) {
    let Prime = ventanas.filter((ventana) => ventana.linea === 4);
    console.log(`%c----------- Ventanas de la linea Prime -----------`, "color: orange")
    Prime.forEach(objeto => {
        let anchoHoja = objeto.anchoVentana / objeto.cantidadHojas;
        let pesoDelVidrioEnHoja = anchoHoja * objeto.altoVentana * pesoDelVidrioConstante * objeto.espesorVidrio;
        let perimetro = anchoHoja + anchoHoja + objeto.altoVentana + objeto.altoVentana;
        let pesoPrime = (perimetro * pesoDelPVCPrime) + pesoDelVidrioEnHoja;
        console.log(` La ventana de la linea Prime con un ancho de ${objeto.anchoVentana} mts, un alto de ${objeto.altoVentana} mts separada en ${objeto.cantidadHojas} hojas con un espesor de vidrio de ${objeto.espesorVidrio}  mm. Su peso por hoja es de ${pesoPrime.toFixed(2)} kg. Llevaria las siguientes ruedas: `);
        if (pesoPrime < ruedaCarroPrime.peso) {
            ruedaCarroPrime.seleccionada();
        } else if (pesoPrime < ruedaSimplePrime.peso) {
            ruedaSimplePrime.seleccionada();
        } else if (pesoPrime < ruedaDoblePrime.peso) {
            ruedaDoblePrime.seleccionada();
        } else {
            console.log("La ventana es muy grande para esta linea. El peso de la hoja es :" + Math.round(pesoPrime) + "kg");
        }
    });

}
function asignaciondeRuedasJumbo(ventanas) {
    let Jumbo = ventanas.filter((ventana) => ventana.linea === 3);
    console.log(`%c----------- Ventanas de la linea Jumbo -----------`, "color: orange")
    Jumbo.forEach(objeto => {
        let anchoHoja = objeto.anchoVentana / objeto.cantidadHojas;
        let pesoDelVidrioEnHoja = anchoHoja * objeto.altoVentana * pesoDelVidrioConstante * objeto.espesorVidrio;
        let perimetro = anchoHoja + anchoHoja + objeto.altoVentana + objeto.altoVentana;
        let pesoJumbo = (perimetro * pesoDelPVCJumbo) + pesoDelVidrioEnHoja; 
        console.log(` La ventana de la linea Jumbo con un ancho de ${objeto.anchoVentana} mts, un alto de ${objeto.altoVentana} mts separada en ${objeto.cantidadHojas} hojas con un espesor de vidrio de ${objeto.espesorVidrio} mm. Su peso por hoja es de ${pesoJumbo.toFixed(2)} kg. Llevaria las siguientes ruedas: `);
        if (pesoJumbo < ruedaSimpleJumbo.peso) {
            ruedaSimpleJumbo.seleccionada();
        } else if (pesoJumbo < ruedaDobleJumbo.peso) {
            ruedaDobleJumbo.seleccionada();
        } else {
            console.log("La ventana es muy grande para esta linea. El peso de la hoja es :" + Math.round(pesoJumbo) + "kg");
        }
    });

}

function calcular(){
    let ventanas = datos();
    const hoy = new Date();
    console.log(`%cHoy ${hoy.toLocaleDateString("es-Ar")} calculaste las ruedas de las siguientes ventanas:`, "color: purple")
    asignaciondeRuedasModena(ventanas);
    asignaciondeRuedasA30(ventanas);
    asignaciondeRuedasPrime(ventanas);
    asignaciondeRuedasJumbo(ventanas);
}

calcular();



