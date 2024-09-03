document.getElementById('locationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const response = await fetch(`/api/solar?city=${city}`);
    const data = await response.json();
    
    const resultDiv = document.getElementById('result');
    if (data.error) {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
        resultDiv.innerHTML = `
            <h3>Solar Radiation Data for ${data.city}:</h3>
            <p>Solar Radiation: ${data.solar_radiation} W/m²</p>
        `;
    }
});
