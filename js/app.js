//variables
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor resultados
const resultado = document.querySelector('#resultado');

const max_year = new Date().getFullYear();
const min_year = max_year - 10;


//eventos

document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos); // muestra los autos

    //llena las opciones 
    llenarSelect();
});



//event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    console.log(datosBusqueda);
    filtarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtarAuto();
});



color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtarAuto();

});
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda);
    filtarAuto();

});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    console.log(datosBusqueda);
    filtarAuto();

});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    console.log(datosBusqueda);
    filtarAuto();

});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtarAuto();

});



// generar objeto de busqueda

const datosBusqueda = {
    marca: '',
    year: '',
    modelo: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}




function mostrarAutos(autos) {
    resetHTML(); //elimina el html previo
    autos.forEach(auto => {

        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca}-
        ${modelo}-
        ${year}-
        ${precio}-
       Puertas: ${puertas}-
         Color: ${color}-
        Transmision: ${transmision}
        `;

        //insertar resultado

        resultado.appendChild(autoHTML);
    });


};
//limpiar html 

function resetHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}



//generar años del select

function llenarSelect() {
    for (let i = max_year; i >= min_year; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de año al select
    }
}

// filtrado en base a busqueda

function filtarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarColor).filter(filtrarTransmision).filter(filtrarPuertas); // funcion de alto nivel, una funcion que recibe como parametro otra función
    // console.log(resultado);

    mostrarAutos(resultado);

    if (resultado.length) {
        console.log(resultado);
    } else {
        noResultado();
    }
}





function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;

    if (color) {
        return auto.color === color;
    }
    return auto;
}


function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;

    if (puertas) {
        return auto.puertas === puertas;

    }
    return auto;
}

function noResultado() {

    resetHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados para tu busqueda';
    resultado.appendChild(noResultado);
}