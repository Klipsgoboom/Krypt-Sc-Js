loadedFromStorage = []

function save(name, data) {
var saveData = { name: name, data: data };
var jsonData = JSON.stringify(saveData);
localStorage.setItem(name, jsonData);
}

function load(name) {
    var storedData = localStorage.getItem(name);
    var loadedData = 0
    if (storedData) {
        loadedData = JSON.parse(storedData);
        return(loadedData["data"]);
    } else {
        console.error('Data not found in storage');
        return(0);

    }
}

function deleteFile(name) {
    localStorage.removeItem(name);
}

function deleteAll() {
    localStorage.clear();
}