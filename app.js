$(document).ready(function() {
    const unidades = {
        longitud: {
            metro: 1,
            kilómetro: 0.001,
            centímetro: 100,
            milímetro: 1000,
            milla: 0.000621371,
            yarda: 1.09361,
            pie: 3.28084,
            pulgada: 39.3701
        },
        masa: {
            gramo: 1,
            kilogramo: 0.001,
            miligramo: 1000,
            libra: 0.00220462,
            onza: 0.035274
        },
        tiempo: {
            segundo: 1,
            minuto: 1/60,
            hora: 1/3600,
            día: 1/86400,
            semana: 1/604800,
            mes: 1/2628000,
            año: 1/31536000
        }
    };

    function poblarUnidades(tipoUnidad) {
        const unidadDesde = $('#unidadDesde');
        const unidadHasta = $('#unidadHasta');
        unidadDesde.empty();
        unidadHasta.empty();
        $.each(unidades[tipoUnidad], function(key, value) {
            unidadDesde.append($('<option></option>').attr('value', value).text(key));
            unidadHasta.append($('<option></option>').attr('value', value).text(key));
        });
    }

    $('#tipoUnidad').change(function() {
        const tipoUnidad = $(this).val();
        poblarUnidades(tipoUnidad);
    });

    $('#botonConvertir').click(function() {
        const tipoUnidad = $('#tipoUnidad').val();
        const valorUnidadDesde = parseFloat($('#unidadDesde').val());
        const valorUnidadHasta = parseFloat($('#unidadHasta').val());
        const valorEntrada = parseFloat($('#valorEntrada').val());

        if (isNaN(valorEntrada)) {
            alert('Por favor ingrese un valor válido.');
            return;
        }

        if ($('#unidadDesde').val() === $('#unidadHasta').val()) {
            $('#unidadHasta').addClass('conversion-invalida');
            setTimeout(function() {
                $('#unidadHasta').removeClass('conversion-invalida');
            }, 2000); // El color rojo desaparecerá después de 2 segundos
            return;
        }

        const valorBase = valorEntrada * valorUnidadDesde;
        const valorConvertido = valorBase / valorUnidadHasta;

        // Redondear el valor convertido
        let valorMostrar;
        if (valorConvertido < 1) {
            valorMostrar = valorConvertido.toFixed(10).replace(/\.?0+$/, '');
        } else {
            valorMostrar = valorConvertido.toFixed(6).replace(/\.?0+$/, '');
        }

        $('#resultado').html(`<h4><span class="subrayado">${valorEntrada}</span> ${$('#unidadDesde option:selected').text()} = <span class="subrayado">${valorMostrar}</span> ${$('#unidadHasta option:selected').text()}</h4>`).fadeIn();
    });

    $('#botonIntercambiar').click(function() {
        const unidadDesde = $('#unidadDesde').val();
        const unidadHasta = $('#unidadHasta').val();
        $('#unidadDesde').val(unidadHasta);
        $('#unidadHasta').val(unidadDesde);
    });

    poblarUnidades($('#tipoUnidad').val());
});
