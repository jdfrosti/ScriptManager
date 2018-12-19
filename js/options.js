chrome.storage.sync.get('scriptNames', function (result) {
    if (typeof result.scriptNames != 'undefined') {
        var names = result.scriptNames.split(";");
        names.forEach(addSelectScripts)
    }
});

function addSelectScripts(item) {
    var select = document.getElementById('selectScript');
    var option = document.createElement("option");
    option.text = item;
    option.value = item;
    select.appendChild(option);
}

var saveScript = document.getElementById("btnSaveScript");
var viewScript = document.getElementById("btnViewScript");
var deleteScript = document.getElementById("btnDeleteScript");

var clear = document.getElementById('btnClear');
clear.onclick = function () {
    clearInput();
}
var select = document.getElementById('selectScript');

saveScript.onclick = function (element) {
    var taScript = document.getElementById('taScript').value;
    var scriptName = document.getElementById('tbScriptName').value;
    chrome.storage.sync.get('scriptNames', function (result) {
        var names = [];
        if (typeof result.scriptNames != 'undefined') {
            names = result.scriptNames.split(";");
        }
        if (!names.includes(scriptName)) {
            names.push(scriptName);
        }
        var scripts = names.join(';');
        chrome.storage.sync.set({
            scriptNames: scripts
        }, function () {});
        var scriptToAdd = {};
        scriptToAdd[scriptName] = taScript;
        chrome.storage.sync.set(scriptToAdd, function () {});
    });
    window.location.reload(false);
};

select.onchange = function () {
    var scriptName = select.options[select.selectedIndex].value;
    if (scriptName != "0") {
        var dele = document.getElementById("btnDeleteScript");
        dele.disabled = false;
        var tbScriptName = document.getElementById('tbScriptName');
        var taScript = document.getElementById('taScript');
        tbScriptName.disabled = true;
        tbScriptName.value = scriptName;
        chrome.storage.sync.get(scriptName, function (result) {
            taScript.value = result[scriptName];
        });
    } else {
        clearInput();
    }

}

deleteScript.onclick = function (element) {
    if(confirm("Deleted scripts can't be restored, are you sure you want to continue?")){
        var scriptName = select.options[select.selectedIndex].value;
        chrome.storage.sync.get('scriptNames', function (result) {
            var names = [];
            if (typeof result.scriptNames != 'undefined') {
                names = result.scriptNames.split(";");
                names.splice(names.indexOf(scriptName), 1);
                var scripts = names.join(';');
                chrome.storage.sync.set({
                    scriptNames: scripts
                }, function () {});
            }
        });
        chrome.storage.sync.remove(scriptName, function () {});
        window.location.reload(false);
    }
}

function clearInput() {
    select.selectedIndex = 0;
    document.getElementById('tbScriptName').value = "";
    document.getElementById('tbScriptName').disabled = false;
    document.getElementById('taScript').value = "";
    var dele = document.getElementById("btnDeleteScript");
    dele.disabled = true;
}
