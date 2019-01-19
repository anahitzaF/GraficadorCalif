//Creo mi grafica de pastel vacia
var myPieChart = new Chart($('#graficaPastel'),
    {
        type: 'pie',
        data: data = {
            datasets: [{
                label: 'Promedios Por Grado',
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

//Creo mi grafica de barras vacia
var myBarChart = new Chart($('#graficaBarras'),
    {
        type: 'bar',
        data: data = {
            datasets: [{
                label: 'Calificaciones',
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

//Funcion que carga el archivo que fue seleccionado
function Upload() {

    var fileUpload = document.getElementById("fileUpload");

    //Valida si es un archivo de excel valido
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //Si es un navegador distinto a IE
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //Para navegadores IE
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            $('#divDatos').hide();
            alert("Este navegador no soporta HTML5.");
        }
    } else {
        $('#divDatos').hide();
        alert("Por Favor, selecciona solo archivos xls.");
    }
};

//Funcion que lee el documento de excel y lo guarda en un json array
function ProcessExcel(data) {
    //Leo documento de Excel
    var libroExcel = XLSX.read(data, {
        type: 'binary'
    });

    //Obtengo el nombre de la primer hoja
    var primerHoja = libroExcel.SheetNames[0];

    //Leo todas las filas de la primer hoja y las coloco en un Json array
    var excelRows = XLSX.utils.sheet_to_row_object_array(libroExcel.Sheets[primerHoja]);

    BarChart(excelRows);
    PieChart(excelRows);
    textoPromedios(excelRows);

    $('#divDatos').show();
};

//Llena la variable Json que se utilizará para llenar el datasets de la grafica de barras
var BarChart = function (list) {
    //Declaro la variable pero vacia
    var json =
        {
            datas: [],
            background: [],
            label: []
        }

    //Lleno la variable "json" con cada item de la lista
    list.forEach(function (item) {
        json.datas.push(item.Calificacion);
        json.background.push(getRandomColor());
        json.label.push(item.Nombres);
    });

    removeData(myBarChart);
    addData(myBarChart, json);
};

//Llena la variable Json que se utilizará para llenar el datasets de la grafica de pastel
var PieChart = function (list) {
    //Declaro la variable pero vacia
    var json =
        {
            datas: [],
            background: [],
            label: []
        }

    var arrayPromedio = {};

    //Lleno el arreglo de objetos donde key:Grado = [sumCalif, contador]
    list.forEach(function (item) {
        if (arrayPromedio[item.Grado] === undefined) {
            arrayPromedio[item.Grado] = [parseFloat(item.Calificacion), 1];
        }
        else {
            arrayPromedio[item.Grado] = [(parseFloat(arrayPromedio[item.Grado][0]) + parseFloat(item.Calificacion)), arrayPromedio[item.Grado][1] + 1];
        }
    });

    //Lleno la variable json con el arreglo previamente llenado (arrayPromedio)
    for (var key in arrayPromedio) {
        json.label.push('Grado: ' + key);
        json.background.push(getRandomColor());
        json.datas.push((arrayPromedio[key][0] / arrayPromedio[key][1]).toFixed(2));
    }
    
    removeData(myPieChart);
    addData(myPieChart, json);
};

//Funcion que obtiene el alumno con mejor y menor calificacion, ademas del promedio general de todos los alumnos
var textoPromedios = function (list) {

    var mejorCalif, menorCalif;
    var promedioGeneral = 0;

    //Leo cada item de la lista
    list.forEach(function (item) {
        //en caso de que mejorCalif o menorCalif sea null, incerto el primer valor en ambos arreglos
        if (mejorCalif == null || menorCalif == null) {
            mejorCalif = [item.Nombres + ' ' + item['Apellido Paterno'] + ' ' + item['Apellido Materno'], item.Calificacion];
            menorCalif = [item.Nombres + ' ' + item['Apellido Paterno'] + ' ' + item['Apellido Materno'], item.Calificacion];
        }
        else {
            //Comparo el valor que contiene el arreglo mejorCalif con el item actual, 
            //si el item.Calificacion es mayor a mejorCalif[1] --> (calificacion), cambio los valores del arreglo
            if (parseFloat(mejorCalif[1]) < parseFloat(item.Calificacion)) {
                mejorCalif[0] = item.Nombres + ' ' + item['Apellido Paterno'] + ' ' + item['Apellido Materno'];
                mejorCalif[1] = item.Calificacion;
            }

            //Comparo el valor que contiene el arreglo menorCalif con el item actual,
            //si el item.Calificacion es menor a menorCalif[1] --> (calificacion), cambio los valores del arreglo
            if (parseFloat(menorCalif[1]) > parseFloat(item.Calificacion)) {
                menorCalif[0] = item.Nombres + ' ' + item['Apellido Paterno'] + ' ' + item['Apellido Materno'];
                menorCalif[1] = item.Calificacion;
            }
        }
        
        promedioGeneral = promedioGeneral + parseFloat(item.Calificacion);
    });

    promedioGeneral = (promedioGeneral / list.length);

    $('#txtAlumnoMayorCalificacion').html(mejorCalif[0]);
    $('#txtMayorCalificacion').html(mejorCalif[1]);

    $('#txtAlumnoMenorCalificacion').html(menorCalif[0]);
    $('#txtMenorCalificacion').html(menorCalif[1]);

    $('#txtPromedioGeneral').html(promedioGeneral.toFixed(2));
};

//Incerto los datos que contiene json dentro del chart de uno en uno
function addData(chart, json) {
    chart.data.datasets.forEach((dataset) => {
        for (let x in json) {
            for (let y in json[x]) {
                if (x == "label") {
                    chart.data.labels.push(json[x][y]);
                }
                else if (x == "datas") {
                    dataset.data.push(json[x][y]);
                }
                else if (x == "background") {
                    dataset.backgroundColor.push(json[x][y]);
                }
            }
        }
    });

    chart.update();
}

//Elimino todos los datos que contiene el chart de uno en uno hasta quedar vacio 
function removeData(chart) {
    if (chart.data.labels.length !== 0) {
        for (var i = 0; i < chart.data.labels.length;) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
                dataset.backgroundColor.pop();
            });
            chart.update();
        }
    }
}

//Funcion que genera colores al azar
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}