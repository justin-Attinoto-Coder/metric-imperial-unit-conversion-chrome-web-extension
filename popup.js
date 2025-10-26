document.getElementById('convertBtn').addEventListener('click', convert);
document.getElementById('clearBtn').addEventListener('click', clear);
document.getElementById('inputNumber').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convert();
    }
});
document.getElementById('unitSelect').addEventListener('change', function() {
    const selectedUnit = this.value;
    if (selectedUnit !== 'all') {
        convert();
    }
});

function convert() {
    const input = parseFloat(document.getElementById('inputNumber').value);
    const selectedUnit = document.getElementById('unitSelect').value;

    if (isNaN(input) || input < 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    // Conversion rates
    const meterToFeet = 3.28084;
    const literToGallon = 0.264172;
    const kgToPound = 2.20462;

    // Hide all sections first
    document.querySelectorAll('.conversion').forEach(el => el.style.display = 'none');

    if (selectedUnit === 'all') {
        // Show all conversions
        showAllConversions(input, meterToFeet, literToGallon, kgToPound);
    } else {
        // Show specific conversion
        showSpecificConversion(input, selectedUnit, meterToFeet, literToGallon, kgToPound);
    }

    document.getElementById('results').classList.remove('hidden');
}

function showAllConversions(input, meterToFeet, literToGallon, kgToPound) {
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

    // Display all
    document.getElementById('lengthMetric').textContent = `${input} meters = ${feet} feet`;
    document.getElementById('lengthImperial').textContent = `${input} feet = ${meters} meters`;

    document.getElementById('volumeMetric').textContent = `${input} liters = ${gallons} gallons`;
    document.getElementById('volumeImperial').textContent = `${input} gallons = ${liters} liters`;

    document.getElementById('massMetric').textContent = `${input} kilos = ${pounds} pounds`;
    document.getElementById('massImperial').textContent = `${input} pounds = ${kg} kilograms`;

    document.getElementById('tempMetric').textContent = `${input}°C = ${fahrenheit}°F`;
    document.getElementById('tempImperial').textContent = `${input}°F = ${celsius}°C`;

    document.querySelectorAll('.conversion').forEach(el => el.style.display = 'block');
}

function showSpecificConversion(input, unit, meterToFeet, literToGallon, kgToPound) {
    let resultText = '';

    switch(unit) {
        case 'meters':
            const feet = (input * meterToFeet).toFixed(3);
            resultText = `${input} meters = ${feet} feet`;
            document.querySelector('.conversion.length').style.display = 'block';
            document.getElementById('lengthMetric').textContent = resultText;
            document.getElementById('lengthImperial').textContent = `${input} feet = ${(input / meterToFeet).toFixed(3)} meters`;
            break;
        case 'feet':
            const meters = (input / meterToFeet).toFixed(3);
            resultText = `${input} feet = ${meters} meters`;
            document.querySelector('.conversion.length').style.display = 'block';
            document.getElementById('lengthMetric').textContent = `${input} meters = ${(input * meterToFeet).toFixed(3)} feet`;
            document.getElementById('lengthImperial').textContent = resultText;
            break;
        case 'liters':
            const gallons = (input * literToGallon).toFixed(3);
            resultText = `${input} liters = ${gallons} gallons`;
            document.querySelector('.conversion.volume').style.display = 'block';
            document.getElementById('volumeMetric').textContent = resultText;
            document.getElementById('volumeImperial').textContent = `${input} gallons = ${(input / literToGallon).toFixed(3)} liters`;
            break;
        case 'gallons':
            const liters = (input / literToGallon).toFixed(3);
            resultText = `${input} gallons = ${liters} liters`;
            document.querySelector('.conversion.volume').style.display = 'block';
            document.getElementById('volumeMetric').textContent = `${input} liters = ${(input * literToGallon).toFixed(3)} gallons`;
            document.getElementById('volumeImperial').textContent = resultText;
            break;
        case 'kilos':
            const pounds = (input * kgToPound).toFixed(3);
            resultText = `${input} kilos = ${pounds} pounds`;
            document.querySelector('.conversion.mass').style.display = 'block';
            document.getElementById('massMetric').textContent = resultText;
            document.getElementById('massImperial').textContent = `${input} pounds = ${(input / kgToPound).toFixed(3)} kilograms`;
            break;
        case 'pounds':
            const kg = (input / kgToPound).toFixed(3);
            resultText = `${input} pounds = ${kg} kilograms`;
            document.querySelector('.conversion.mass').style.display = 'block';
            document.getElementById('massMetric').textContent = `${input} kilos = ${(input * kgToPound).toFixed(3)} pounds`;
            document.getElementById('massImperial').textContent = resultText;
            break;
        case 'celsius':
            const fahrenheit = (input * 9/5 + 32).toFixed(3);
            resultText = `${input}°C = ${fahrenheit}°F`;
            document.querySelector('.conversion.temperature').style.display = 'block';
            document.getElementById('tempMetric').textContent = resultText;
            document.getElementById('tempImperial').textContent = `${input}°F = ${((input - 32) * 5/9).toFixed(3)}°C`;
            break;
        case 'fahrenheit':
            const celsius = ((input - 32) * 5/9).toFixed(3);
            resultText = `${input}°F = ${celsius}°C`;
            document.querySelector('.conversion.temperature').style.display = 'block';
            document.getElementById('tempMetric').textContent = `${input}°C = ${(input * 9/5 + 32).toFixed(3)}°F`;
            document.getElementById('tempImperial').textContent = resultText;
            break;
    }
}

function clear() {
    document.getElementById('inputNumber').value = '';
    document.getElementById('unitSelect').value = 'all';
    document.getElementById('results').classList.add('hidden');
    document.querySelectorAll('.conversion').forEach(el => el.style.display = 'block');
}

document.getElementById('helpLink').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('help.html') });
});

// Theme switching functionality
document.getElementById('iconTheme').addEventListener('change', function() {
    const selectedTheme = this.value;
    const iconPath = `icon${selectedTheme === 'default' ? '' : '-' + selectedTheme}.svg`;

    // Save preference (in a real extension, you'd use chrome.storage)
    localStorage.setItem('iconTheme', selectedTheme);

    // Show reload message
    alert(`Icon theme changed to ${selectedTheme}!\n\nTo see the new icon, please:\n1. Right-click the extension icon\n2. Select "Manage extensions"\n3. Click the refresh button for this extension\n\nThe new icon will appear: ${iconPath}`);
});

// Load saved theme on popup open
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('iconTheme') || 'default';
    document.getElementById('iconTheme').value = savedTheme;
});