$(document).ready(function () {
    const unidades = { // Unidades y sus factores de conversión
        longitud: {
            milimetros: 0.001,
            centimetros: 0.01,
            metros: 1,
            kilometros: 1000,
            pulgadas: 0.0254,
            pies: 0.3048
        },
        masa: {
            gramos: 0.001,
            onzas: 0.0283495,
            libras: 0.453592,
            kilogramos: 1
        },
        tiempo: {
            segundos: 1,
            minutos: 60,
            horas: 3600,
            dias: 86400
        }
    };

    const abreviaturas = { // Abreviaturas para las unidades
        milimetros: "mm",
        centimetros: "cm",
        metros: "m",
        kilometros: "km",
        pulgadas: "in",
        pies: "ft",
        gramos: "g",
        onzas: "oz",
        libras: "lb",
        kilogramos: "kg",
        segundos: "s",
        minutos: "min",
        horas: "h",
        dias: "d"
    };

    let conversionRealizada = false;

    function llenarUnidades(tipo) {
        let opciones = '';
        const unidadesOrdenadas = Object.keys(unidades[tipo]).sort((a, b) => unidades[tipo][a] - unidades[tipo][b]);
        for (let unidad of unidadesOrdenadas) {
            opciones += `<option value="${unidad}">${unidad.charAt(0).toUpperCase() + unidad.slice(1)}</option>`;
        }
        $('#unidadDesde, #unidadHasta').html(opciones);
        $('#unidadDesde').val(unidadesOrdenadas[0]);
        $('#unidadHasta').val(unidadesOrdenadas[1] || unidadesOrdenadas[0]);
        comprobarUnidadesIguales();
    }

    function comprobarUnidadesIguales() {
        const desde = $('#unidadDesde').val();
        const hasta = $('#unidadHasta').val();
        if (desde === hasta) {
            $('#unidadHasta').addClass('unidad-seleccionada');
        } else {
            $('#unidadHasta').removeClass('unidad-seleccionada');
        }
    }

    function obtenerNombreUnidad(unidad, valor) {
        if (valor === 1) {
            return `${unidad.slice(0, -1)}`; // ejemplo: "metro"
        }
        return unidad; // ejemplo: "metros"
    }

    function formatearDecimales(valor) {
        if (valor % 1 === 0) {
            return valor.toString(); // Si el valor es un entero, lo devuelve como una cadena sin decimales
        } else if (Math.abs(valor) < 1) {
            return parseFloat(valor.toFixed(6)).toString(); // Limitar a 6 decimales para valores pequeños
        } else {
            return parseFloat(valor.toFixed(4)).toString(); // Limitar a 4 decimales para valores no enteros
        }
    }

    function convertir() {
        const tipo = $('#tipoUnidad').val();
        const unidadDesde = $('#unidadDesde').val();
        const unidadHasta = $('#unidadHasta').val();
        const valorEntrada = parseFloat($('#valorEntrada').val());

        if (unidadDesde === unidadHasta) {
            $('#resultado').text('No se puede convertir entre la misma unidad.').addClass('conversion-invalida').show();
            return;
        }

        if (isNaN(valorEntrada)) {
            $('#resultado').text('Por favor, ingresa un valor numérico válido.').addClass('conversion-invalida').show();
            return;
        }

        const valorEnUnidadBase = valorEntrada * unidades[tipo][unidadDesde];
        const valorConvertido = valorEnUnidadBase / unidades[tipo][unidadHasta];

        const nombreUnidadDesde = obtenerNombreUnidad(unidadDesde, valorEntrada);
        const nombreUnidadHasta = obtenerNombreUnidad(unidadHasta, valorConvertido);

        const resultadoFormateado = formatearDecimales(valorConvertido);

        const resultadoHTML = `<span class="subrayado">${valorEntrada}</span> ${nombreUnidadDesde} [${abreviaturas[unidadDesde]}] = <span class="subrayado">${resultadoFormateado}</span> ${nombreUnidadHasta} [${abreviaturas[unidadHasta]}]`;
        $('#resultado').removeClass('conversion-invalida').html(`<p>${resultadoHTML}</p>`).show();

        conversionRealizada = true; // Marcar que una conversión manual se ha realizado
    }

    $('#tipoUnidad').change(function () {
        const tipo = $(this).val();
        llenarUnidades(tipo);
        $('#resultado').hide().empty(); // Borrar el cuadro de resultado
        conversionRealizada = false; // Resetear la bandera al cambiar el tipo de unidad
    });

    $('#unidadDesde, #unidadHasta').change(function () {
        comprobarUnidadesIguales();
        if (conversionRealizada) {
            convertir(); // Convertir automáticamente solo si se ha realizado una conversión manual
        }
    });

    $('#botonIntercambiar').click(function () {
        const desde = $('#unidadDesde').val();
        const hasta = $('#unidadHasta').val();
        $('#unidadDesde').val(hasta);
        $('#unidadHasta').val(desde);
        comprobarUnidadesIguales();
        if (conversionRealizada) {
            convertir(); // Convertir automáticamente solo si se ha realizado una conversión manual
        }
    });

    $('#botonConvertir').click(function () {
        convertir();
    });

    // Inicializar con el primer tipo de unidad y establecer unidades por defecto
    llenarUnidades($('#tipoUnidad').val());

});