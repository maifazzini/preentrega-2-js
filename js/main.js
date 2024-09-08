alert("Vamos a analizar que rueda necesita tu ventana corrediza");

const pesoDelAluminioModenaAlto = 0.64 + 0.58; // alcemar jamba + encuentro x mt lineal // 1.237 flamia 
const pesoDelAluminioModenaAncho = 0.64 + 1.26; //alcemar dintel + zocalo x mt lineal // 1.917  flamia
const pesoDelAluminioA30Alto = 1.198 + 1.17; // alcemar jamba + encuentro x mt lineal // 2,344 flamia
const pesoDelAluminioA30Ancho = 0.862 + 1.38; // alcemar dintel + zocalo x mt lineal // 2,236 flamia
const pesoDelPVCJumbo = 3.6; // es el mismo perfil todo la hoja x mt lineal
const pesoDelPVCPrime = 2.8; // es el mismo perfil todo la hoja x mt lineal
const pesoDelVidrioConstante = 2.5;

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
let anchoVentana = Chequeo("Ingrese el ancho de la ventana total en metros", 100, "El numero es mayor a 100. Recorda que la medida debe ser en metros. Intente nuevamente.");
let altoVentana = Chequeo("Ingrese el alto de la ventana total en metros", 100, "El numero es mayor a 100. Recorda que la medida debe ser en metros. Intente nuevamente.");
let espesorVidrio = ChequeoEspesor("Ingrese el espesor del vidrio colocado en milimetros", 50, "El numero es mayor a 50. Recorda que ninguna linea admite acristalamiento con tanto grosor");

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
let anchoHoja = anchoVentana / cantidadHojas;
let pesoDelVidrioEnHoja = anchoHoja * altoVentana * pesoDelVidrioConstante * espesorVidrio;
let pesoModena = (anchoHoja * pesoDelAluminioModenaAncho) + (altoVentana * pesoDelAluminioModenaAlto) + pesoDelVidrioEnHoja;
let pesoA30 = (anchoHoja * pesoDelAluminioA30Ancho) + (altoVentana * pesoDelAluminioA30Alto) + pesoDelVidrioEnHoja;
let perimetro = anchoHoja + anchoHoja + altoVentana + altoVentana;
let pesoPrime = (perimetro * pesoDelPVCPrime) + pesoDelVidrioEnHoja;
let pesoJumbo = (perimetro * pesoDelPVCJumbo) + pesoDelVidrioEnHoja;
switch (linea) {
    case 1:
        if (pesoModena < ruedaSimpleModena.peso) {
            ruedaSimpleModena.seleccionada();
            break;
        } else if (pesoModena < ruedaDobleModena.peso) {
            ruedaDobleModena.seleccionada();
            break;
        } else {
            alert("La ventana es muy grande para esta linea. El peso de la hoja es : " + pesoModena + "kg");
            break;

        }
    case 2:
        if (pesoA30 < ruedaSimpleA30.peso) {
            ruedaSimpleA30.seleccionada();
        } else if (pesoA30 < ruedaDobleA30.peso) {
            ruedaDobleA30.seleccionada();
        } else {
            alert("La ventana es muy grande para esta linea. El peso de la hoja es :" + pesoA30 + "kg");
        }
        break;
    case 3:
        if (pesoJumbo < ruedaSimpleJumbo.peso) {
            ruedaSimpleJumbo.seleccionada();
        } else if (pesoJumbo < ruedaDobleJumbo.peso) {
            ruedaDobleA30.seleccionada();
        } else {
            alert("La ventana es muy grande para esta linea. El peso de la hoja es :" + pesoJumbo + "kg");
        }
        break;
    case 4:
        if (pesoPrime < ruedaCarroPrime.peso) {
            ruedaCarroPrime.seleccionada();
        } else if (pesoPrime < ruedaSimplePrime.peso) {
            ruedaSimplePrime.seleccionada();
        } else if (pesoPrime < ruedaDoblePrime.peso) {
            ruedaDoblePrime.seleccionada();
        } else {
            alert("La ventana es muy grande para esta linea. El peso de la hoja es :" + pesoPrime + "kg");
        }
        break;
    default:
        alert("Se ingreso mal la linea. Intenta nuevamente");
}



//! -------------------- PESOS FIJOS----------------------


//! ------------------- RUEDAS ----------------------
class Ruedas {
    constructor(modelo, codigo, peso) {
        this.nombre = modelo;
        this.codigo = codigo;
        this.peso = peso;
    }
    seleccionada() {
        alert("Debes colocar " + this.nombre + " , su codigo es " + this.codigo + " y soporta " + this.peso + "kg");
    }
}

//Modena
let ruedaSimpleModena = new Ruedas("Rueda simple Modena", "ROL119", 60);
let ruedaDobleModena = new Ruedas("Rueda doble Modena", "ROL120", 120);
// A30
let ruedaSimpleA30 = new Ruedas("Rueda simple A30", "ROL126", 110);
let ruedaDobleA30 = new Ruedas("Rueda doble A30", "ROL127", 220);
// Prime
let ruedaCarroPrime = new Ruedas("Rueda doble carro plastica", "L-25004-21-0-1", 70);
let ruedaSimplePrime = new Ruedas("Rueda simple Ducasse para Balconera", "L-23230-70-0-8", 140);
let ruedaDoblePrime = new Ruedas("Rueda doble Ducasse para Balconera", "L-23300-00-0-8", 280);
// Jumbo
let ruedaSimpleJumbo = new Ruedas("Rueda simple Jumbo", "L-25006-59-0-6", 140);
let ruedaDobleJumbo = new Ruedas("Rueda doble A30", "L-25008-59-0-6", 280);

//! ------------------- Cuentas -----------------------

//! -------------- PROCESOS --------------------


