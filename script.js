function asignarValoresDefaultFormulario(){
    let input_fecha = document.querySelector('form input#fecha');
    let select_base = document.querySelector('form select#base');

    fetch('https://api.exchangeratesapi.io/latest')
    .then((data) => data.json()) .then((data) => { 

        monedas = Object.keys(data.rates);
        monedas.push('EUR');

        monedas.forEach(moneda => {
            let option = document.createElement('option');

            option.text = moneda;
            option.value = moneda;

            select_base.add(option);

            if(moneda === 'EUR'){
                option.selected = true;
            }

        });
        input_fecha.value = data.date;
     })
    .catch((err) => console.log(err));

}

function mostrarCambios(fecha, base){
    tabla_cambios = document.querySelector('table#cambios');
    tabla_cambios.style.display = '';

    tbody_tabla_cambios = tabla_cambios.querySelector('tbody');
    tbody_tabla_cambios.innerText = '';

    titulo = document.querySelector('h1#titulo');
    titulo.innerText = `Cambios en base a ${base} para la fecha ${fecha}`;

    let url = `https://api.exchangeratesapi.io/${fecha}?base=${base}`;

    fetch(url)
    .then((data) => data.json())
    .then((data) => {

        monedas = Object.entries(data.rates);

        monedas.forEach(moneda => {
            tr = document.createElement('tr');

            td_moneda = document.createElement('td');
            td_cambio = document.createElement('td');

            td_moneda.innerText = moneda[0];
            td_cambio.innerText = moneda[1];

            tr.appendChild(td_moneda);
            tr.appendChild(td_cambio);

            tbody_tabla_cambios.appendChild(tr);

        });

    })
    .catch((err) => console.log(err));
}

boton_mostrar_cambios = document.querySelector('button#mostrarCambios');
boton_mostrar_cambios.onclick = () => {
    let fecha = document.querySelector('form input#fecha').value;
    let base = document.querySelector('form select#base').value;

    mostrarCambios(fecha, base);

    return false;
}

asignarValoresDefaultFormulario();
