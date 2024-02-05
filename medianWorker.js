self.onmessage = function(e) {
    var temperatures = e.data;
    // Sort the array
    temperatures.sort((a, b) => a - b);

    const half = Math.floor(temperatures.length / 2);

    median = null
    // If the array length is odd, return the middle element
    if (temperatures.length % 2) {
        median = temperatures[half];
    } else {
        // If the array length is even, return the average of the two middle elements
        median = (temperatures[half - 1] + temperatures[half]) / 2.0;
    }
    self.postMessage(median);
    self.close(); // Terminates the worker.
};