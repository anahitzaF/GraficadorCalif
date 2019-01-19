<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Principal.aspx.cs" Inherits="Principal" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>GRAFICACION DE CALIFICACIONES</title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header text-center">
                        <h5 class="card-title"> GRAFICACIÓN DE CALIFICACIONES</h5>
                        <h6 class="card-subtitle text-muted">Para poder mostrar la información, primero se debe de seleccionar un arcivo en formato excel.</h6>
                    </div>
                    <div class="card-body">
                        <input type="file" id="fileUpload" onchange="Upload()" />
                        <div style="display:none" id="divDatos">
                            <hr />
                            <div class="form-row mt-2">
                                <div class="col-md-6 col-sm-12">
                                    <div class="col-md-12 text-center">
                                        <label style="font-weight: bold">Calificaciones Por Alumno</label>
                                    </div>
                                    <canvas id="graficaBarras"></canvas>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="col-md-12 text-center">
                                        <label style="font-weight: bold">Promedio Por Grado</label>
                                    </div>
                                    <canvas id="graficaPastel"></canvas>
                                </div>
                            </div>

                            <hr />

                            <div class="form-row mt-2">
                                <div class="col-md-4 col-sm-12">
                                    <div class="col-md-12 text-center">
                                        <label>Alumno con mayor calificación:</label>
                                        <br />
                                        <label id="txtAlumnoMayorCalificacion" style="font-weight: bold" />
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <label>Calificación:</label>
                                        <label id="txtMayorCalificacion" style="font-weight: bold" />
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="col-md-12 text-center">
                                        <label>Alumno con menor calificación:</label>
                                        <br />
                                        <label id="txtAlumnoMenorCalificacion" style="font-weight: bold" />
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <label>Calificación:</label>
                                        <label id="txtMenorCalificacion" style="font-weight: bold" />
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="col-md-12 text-center">
                                        <label>Promedio General:</label>
                                        <label id="txtPromedioGeneral" style="font-weight: bold" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <!--Scripts-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="js/Graficas.js"></script>


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>
</body>
</html>
