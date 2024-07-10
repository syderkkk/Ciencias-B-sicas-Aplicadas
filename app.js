$(document).ready(function () {
    const unidades = {
        longitud: {
            metros: 1,
            kilometros: 1000,
            centimetros: 0.01,
            milimetros: 0.001,
            pulgadas: 0.0254,
            pies: 0.3048
        },
        masa: {
            kilogramos: 1,
            gramos: 0.001,
            libras: 0.453592,
            onzas: 0.0283495
        },
        tiempo: {
            segundos: 1,
            minutos: 60,
            horas: 3600,
            dias: 86400
        }
    };

    function llenarUnidades(tipo) {
        let opciones = '';
        for (let unidad in unidades[tipo]) {
            opciones += `<option value="${unidad}">${unidad.charAt(0).toUpperCase() + unidad.slice(1)}</option>`;
        }
        $('#unidadDesde, #unidadHasta').html(opciones);
    }

    $('#tipoUnidad').change(function () {
        const tipo = $(this).val();
        llenarUnidades(tipo);
    });

    $('#botonIntercambiar').click(function () {
        const desde = $('#unidadDesde').val();
        const hasta = $('#unidadHasta').val();
        $('#unidadDesde').val(hasta);
        $('#unidadHasta').val(desde);
    });

    $('#botonConvertir').click(function () {
        const tipo = $('#tipoUnidad').val();
        const unidadDesde = $('#unidadDesde').val();
        const unidadHasta = $('#unidadHasta').val();
        const valorEntrada = parseFloat($('#valorEntrada').val());

        if (isNaN(valorEntrada)) {
            $('#resultado').text('Por favor, ingresa un valor numérico válido.').addClass('conversion-invalida').show();
            return;
        }

        const valorEnUnidadBase = valorEntrada * unidades[tipo][unidadDesde];
        const valorConvertido = valorEnUnidadBase / unidades[tipo][unidadHasta];

        $('#resultado').removeClass('conversion-invalida').html(`<p class="subrayado">${valorEntrada} ${unidadDesde} = ${valorConvertido.toFixed(4)} ${unidadHasta}</p>`).show();
    });

    // Inicializar con el primer tipo de unidad
    llenarUnidades($('#tipoUnidad').val());
});
