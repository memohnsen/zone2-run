// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('zone2Form');
    const milesInput = document.getElementById('miles');
    const twoMrInput = document.getElementById('2mr');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        calculateZone2Pace();
    });

    function calculateZone2Pace() {
        // Retrieve and trim input values
        const milesValue = milesInput.value.trim();
        const twoMrTimeValue = twoMrInput.value.trim();

        // Input Validation
        if (!milesValue || !twoMrTimeValue) {
            alert('Please enter both distance and 2MR time.');
            return;
        }

        const miles = parseFloat(milesValue);
        if (isNaN(miles) || miles <= 0) {
            alert('Please enter a valid number of miles.');
            return;
        }

        const timeParts = twoMrTimeValue.split(':');
        if (timeParts.length !== 2) {
            alert('Please enter the 2MR time in MM:SS format.');
            return;
        }

        const minutes = parseInt(timeParts[0], 10);
        const seconds = parseInt(timeParts[1], 10);

        if (isNaN(minutes) || isNaN(seconds) || seconds >= 60 || minutes < 0 || seconds < 0) {
            alert('Please enter a valid 2MR time in MM:SS format.');
            return;
        }

        // Convert 2MR time to total seconds
        const twoMrSeconds = (minutes * 60) + seconds;

        // Calculate 1 Mile Time
        const oneMileSeconds = twoMrSeconds / 2;

        // Calculate Zone 2 Pace
        const zone2PaceSeconds = oneMileSeconds / 0.70;

        // Calculate Total Run Time
        const totalRunSeconds = zone2PaceSeconds * miles;

        // Convert Zone 2 Pace to MM:SS
        const paceMinutes = Math.floor(zone2PaceSeconds / 60);
        const paceSeconds = Math.round(zone2PaceSeconds % 60);

        // Convert Total Run Time to MM:SS
        const totalMinutes = Math.floor(totalRunSeconds / 60);
        const totalSeconds = Math.round(totalRunSeconds % 60);

        // Display the results
        resultDiv.innerHTML = `
            <p>Pace: ${padZero(paceMinutes)}:${padZero(paceSeconds)} per mile</p>
            <p>Total Run Time: ${padZero(totalMinutes)}:${padZero(totalSeconds)}</p>
        `;
    }

    // Helper function to pad single digit numbers with a leading zero
    function padZero(number) {
        return number < 10 ? '0' + number : number;
    }

    // Allow calculation on "Enter" key press for both inputs
    [twoMrInput, milesInput].forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                calculateZone2Pace();
            }
        });
    });
});
