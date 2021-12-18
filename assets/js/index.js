$(document).ready(function () {
    $("form").submit(function (event) {
        
        let validnum = new RegExp(/^-?[0-9]+$/m);
        let valorId = $("#heroinput").val();
        $("#mensaje").text("");

        if(!validnum.test(valorId)){
            $("#mensaje").text("Porfavor ingresa solo numeros");
        } else if (valorId<1){
            $("#mensaje").text("Valores mayor a 0");
        } else if (valorId>731){
            $("#mensaje").text("Fuera de rango");
        }
        event.preventDefault();

        
        

        

        $.ajax({
            url: "https://superheroapi.com/api.php/2573085536170662/" + valorId,
            success: function (data) {
                let rostro = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections['group-affiliation'];
                let publicado = data.biography.publisher;
                let trabajo = data.work.occupation;
                let ap1 = data.biography['first-appearance'];
                let alt = data.appearance.height;
                let pes = data.appearance.weight;
                let alia2 = data.biography.aliases;


                $("#datos").html(`
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${rostro}" class="img-fluid rounded-start">
                        </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">Nombre: ${nombre}</h5>
                    <p class="card-text">${conexiones}</p>
                    <p class="card-text">${publicado}<small class="text-muted"></small></p>
                    <hr>
                    <p class="card-text">${trabajo}</p>
                    <hr>
                    <p class="card-text">${ap1}</p>
                    <hr>
                    <p class="card-text">${alt}</p>
                    <hr>
                    <p class="card-text">${pes}</p>
                    <hr>
                    <p class="card-text">${alia2}</p>
                         </div>
                        </div>
                     </div>
                </div>
                `)


                let estadisticas=[]
                let n = 0;

                for (let i = 0; i <Object.keys(data.powerstats).length; i++) {
                    
                    if(Object.values(data.powerstats)[i]!=='null'){
                        estadisticas.push({y:Object.values(data.powerstats)[i],
                        label:Object.keys(data.powerstats)[i]})
                        n++;
                    }
                    
                }
                    if(n!==0){
                        var options = {
                            title: {
                                text: `Estadisticas de:  ${nombre}`,
                            },
                            data: [{
                                    type: "pie",
                                    startAngle: 45,
                                    showInLegend: "true",
                                    legendText: "{label}",
                                    indexLabel: "{label} ({y})",
                                    yValueFormatString:"#,##0.#"%"",
                                    dataPoints: estadisticas
                            }]
                        };
                        $("#stats").CanvasJSChart(options);
                    } else {
                        $("#stats").html(`<h5> No se encontraron datos de ${nombre}</h5>`);
                    }

            }
        })
    });
});
