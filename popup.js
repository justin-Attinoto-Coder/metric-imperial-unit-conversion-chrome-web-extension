document.getElementById('convertBtn').addEventListener('click', convert);
document.getElementById('clearBtn').addEventListener('click', clear);
document.getElementById('inputNumber').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convert();
    }
});

function convert() {
    const input = parseFloat(document.getElementById('inputNumber').value);
    if (isNaN(input) || input < 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    // Conversion rates
    const meterToFeet = 3.28084;
    const literToGallon = 0.264172;
    const kgToPound = 2.20462;

    // Length
    const feet = (input * meterToFeet).toFixed(3);
    const meters = (input * (1 / meterToFeet)).toFixed(3);

    // Volume
    const gallons = (input * literToGallon).toFixed(3);
    const liters = (input * (1 / literToGallon)).toFixed(3);

    // Mass
    const pounds = (input * kgToPound).toFixed(3);
    const kg = (input * (1 / kgToPound)).toFixed(3);

    // Temperature
    const fahrenheit = (input * 9/5 + 32).toFixed(3);
    const celsius = ((input - 32) * 5/9).toFixed(3);

    // Display
    document.getElementById('lengthMetric').textContent = `${input} meters = ${feet} feet`;
    document.getElementById('lengthImperial').textContent = `${input} feet = ${meters} meters`;

    document.getElementById('volumeMetric').textContent = `${input} liters = ${gallons} gallons`;
    document.getElementById('volumeImperial').textContent = `${input} gallons = ${liters} liters`;

    document.getElementById('massMetric').textContent = `${input} kilos = ${pounds} pounds`;
    document.getElementById('massImperial').textContent = `${input} pounds = ${kg} kilograms`;

    document.getElementById('tempMetric').textContent = `${input}°C = ${fahrenheit}°F`;
    document.getElementById('tempImperial').textContent = `${input}°F = ${celsius}°C`;

    document.getElementById('results').classList.remove('hidden');
}

function clear() {
    document.getElementById('inputNumber').value = '';
    document.getElementById('results').classList.add('hidden');
}

document.getElementById('helpLink').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('help.html') });
});