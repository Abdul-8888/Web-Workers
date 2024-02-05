self.onmessage = function(e) {
    var temperatures = e.data;
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

    self.postMessage(modes);
    self.close(); // Terminates the worker.
};