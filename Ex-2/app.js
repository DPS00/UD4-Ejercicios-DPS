const empcontainer = document.querySelector('#container')

function getEmpleados() {
    
    fetch('./data/empleados.json')
    .then(res=>res.json())
    .then( data =>{
        console.log("Pintar Datos");
        empleados=data;
        renderEmpleados();
    });

}

function renderEmpleados() {
    empleados.forEach(empleado =>{
        empcontainer.innerHTML+=`
        <th>${empleado.id}</th>
        <td>${empleado.nombre}</td>
        <td>${empleado.telefono}</td>
        <td>${empleado.especialidad}</td>
        <td>${empleado.departamento}</td>
        `;
    });
}


function init() {
    getEmpleados();
    renderEmpleados();
    console.log("Despues de getCourses");
}

init();