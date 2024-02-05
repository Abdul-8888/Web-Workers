self.onmessage = function(e) {
    var temperatures = e.data;
    let total = 0
    for (let i = 0; i < temperatures.length; i++) {
        total += temperatures[i]
    }
    let avg = total / temperatures.length;
    self.postMessage(avg);
    self.close(); // Terminates the worker.
    
};