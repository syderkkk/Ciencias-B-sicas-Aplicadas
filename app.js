$(document).ready(function() {
    const units = {
        length: {
            metro: 1,
            kilómetro: 0.001,
            centímetro: 100,
            milímetro: 1000,
            milla: 0.000621371,
            yarda: 1.09361,
            pie: 3.28084,
            pulgada: 39.3701
        },
        mass: {
            gramo: 1,
            kilogramo: 0.001,
            miligramo: 1000,
            libra: 0.00220462,
            onza: 0.035274
        },
        time: {
            segundo: 1,
            minuto: 1/60,
            hora: 1/3600,
            día: 1/86400,
            semana: 1/604800,
            mes: 1/2628000,
            año: 1/31536000
        }
    };

    function populateUnits(unitType) {
        const fromUnit = $('#fromUnit');
        const toUnit = $('#toUnit');
        fromUnit.empty();
        toUnit.empty();
        $.each(units[unitType], function(key, value) {
            fromUnit.append($('<option></option>').attr('value', value).text(key));
            toUnit.append($('<option></option>').attr('value', value).text(key));
        });
    }

    $('#unitType').change(function() {
        const unitType = $(this).val();
        populateUnits(unitType);
    });

    $('#convertBtn').click(function() {
        const unitType = $('#unitType').val();
        const fromUnitValue = parseFloat($('#fromUnit').val());
        const toUnitValue = parseFloat($('#toUnit').val());
        const inputValue = parseFloat($('#inputValue').val());

        if (isNaN(inputValue)) {
            alert('Por favor ingrese un valor válido.');
            return;
        }

        const baseValue = inputValue * fromUnitValue;
        const convertedValue = baseValue / toUnitValue;

        // Redondear el valor convertido
        let displayValue;
        if (convertedValue < 1) {
            displayValue = convertedValue.toFixed(6).replace(/\.?0+$/, '');
        } else {
            displayValue = convertedValue.toFixed(2).replace(/\.?0+$/, '');
        }

        $('#result').html(`<h4>${inputValue} ${$('#fromUnit option:selected').text()} = ${displayValue} ${$('#toUnit option:selected').text()}</h4>`).fadeIn();
    });

    $('#swapBtn').click(function() {
        const fromUnit = $('#fromUnit').val();
        const toUnit = $('#toUnit').val();
        $('#fromUnit').val(toUnit);
        $('#toUnit').val(fromUnit);
    });

    populateUnits($('#unitType').val());
});
