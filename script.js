function average(temperatures) {
    let total = 0
    for (let i = 0; i < temperatures.length; i++) {
        total += temperatures[i]
    }
    let avg = total / temperatures.length;
    return avg
}

function median(temperatures) {
    // Sort the array
    temperatures.sort((a, b) => a - b);

    const half = Math.floor(temperatures.length / 2);

    // If the array length is odd, return the middle element
    if (temperatures.length % 2) {
        return temperatures[half];
    } else {
        // If the array length is even, return the average of the two middle elements
        return (temperatures[half - 1] + temperatures[half]) / 2.0;
    }
}

function mode(temperatures) {
    let frequencyMap = {};
    let maxFreq = 0;
    let modes = [];

    // Create a frequency map
    temperatures.forEach(item => {
        if (frequencyMap[item]) {
            frequencyMap[item]++;
        } else {
            frequencyMap[item] = 1;
        }
        // Update max frequency if current item's frequency is greater
        if (frequencyMap[item] > maxFreq) {
            maxFreq = frequencyMap[item];
        }
    });

    // Find all items that match max frequency
    for (let item in frequencyMap) {
        if (frequencyMap[item] === maxFreq) {
            modes.push(Number(item));
        }
    }

    return modes;
}

function withoutWebWorkers(temperatures) {
    let startTime = performance.now();
    const avg = average(temperatures);
    const med = median(temperatures);
    const mod = mode(temperatures);
    let endTime = performance.now();

    let executionTime = endTime - startTime;

    const summary = `Temperature Data without Web Workers: Average = ${avg}, Median = ${med}, Mode = ${mod}. The execution time = ${executionTime} ms.`;
    // document.getElementById('result').textContent = summary;
    return summary
}

function usingWebWorkers(temperatures) {
    return new Promise((resolve, reject) => {
        let startTime = performance.now();

        // Initialize workers
        var wAvg = new Worker('averageWorker.js');
        var wMed = new Worker('medianWorker.js');
        var wMod = new Worker('modeWorker.js');

        // Send temperatures data to each worker
        wAvg.postMessage(temperatures);
        wMed.postMessage(temperatures);
        wMod.postMessage(temperatures);

        // Collect promises for each worker's message
        let promises = [
            new Promise(resolve => wAvg.onmessage = e => resolve(e.data)),
            new Promise(resolve => wMed.onmessage = e => resolve(e.data)),
            new Promise(resolve => wMod.onmessage = e => resolve(e.data)),
        ];

        // Wait for all workers to finish
        Promise.all(promises).then(results => {
            let endTime = performance.now();
            let executionTime = endTime - startTime;

            // Results array will contain the responses in the order of promises
            const [avg, med, mod] = results;
            const summary = `Temperature Data using Web Workers: Average = ${avg}, Median = ${med}, Mode = ${mod}. The execution time = ${executionTime} ms.`;

            resolve(summary); // Resolve the promise with the summary
        }).catch(error => {
            console.error('A worker encountered an error', error);
            reject(error); // Reject the promise if there's an error
        });
    });
}



fetch('https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m')
    .then(response => response.json())
    .then(async data => {
        // Data contains an array of temperature readings
        let temperatures = data.hourly.temperature_2m;

        for (var i = 0; i < 5; i++) {
            temperatures = temperatures.concat(temperatures)
        }
        console.log(temperatures.length)

        let sum1 = withoutWebWorkers(temperatures)
        let sum2 = await usingWebWorkers(temperatures); // Await the asynchronous result

        document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + sum1 + '<br><br>' + sum2;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Failed to fetch data';
    });