var saveScript = document.getElementById("btnSaveScript");
var viewScript = document.getElementById("btnViewScript");
var deleteScript = document.getElementById("btnDeleteScript");
var clear = document.getElementById('btnClear');
var select = document.getElementById('selectScript');

saveScript.onclick = function(element){
    var taScript = document.getElementById('taScript').value;
    var scriptName = document.getElementById('tbScriptName').value;
    chrome.storage.sync.get('scriptNames', function(result){
        var names = [];
        if(typeof result.scriptNames != 'undefined'){
            names = result.scriptNames.split(";");
        }
        if(!names.includes(scriptName)){
            names.push(scriptName);
        }
        var scripts = names.join(';');
        chrome.storage.sync.set({scriptNames:scripts}, function(){
        });
        var scriptToAdd = {};
        scriptToAdd[scriptName] = taScript;
        chrome.storage.sync.set(scriptToAdd, function(){
        });
    });
    window.location.reload(false);
};

viewScript.onclick = function(element){
    var scriptName = select.options[select.selectedIndex].value;
    var tbScriptName = document.getElementById('tbScriptName');
    var taScript = document.getElementById('taScript');
    tbScriptName.disabled = true;
    tbScriptName.value = scriptName;
    chrome.storage.sync.get(scriptName, function(result){
        taScript.value = result[scriptName];
    });
}

deleteScript.onclick = function(element){
    var scriptName = select.options[select.selectedIndex].value;
    chrome.storage.sync.get('scriptNames', function(result){
        var names = [];   
        if(typeof result.scriptNames != 'undefined'){
            names = result.scriptNames.split(";");
            names.splice(names.indexOf(scriptName),1);
            var scripts = names.join(';');
            chrome.storage.sync.set({scriptNames:scripts}, function(){
            });
        }
    });  
    chrome.storage.sync.remove(scriptName, function(){
    });
    window.location.reload(false);
}

clear.onclick = function(element){
    select.selectedIndex = 0;
    document.getElementById('tbScriptName').value = "";
    document.getElementById('tbScriptName').disabled = false;
    document.getElementById('taScript').value = "";
    var view = document.getElementById("btnViewScript");
    var dele = document.getElementById("btnDeleteScript");
    view.disabled = true;
    dele.disabled = true;
}

select.onchange = function(){  
    var view = document.getElementById("btnViewScript");
    var dele = document.getElementById("btnDeleteScript");
    if(select.options[select.selectedIndex].value == "0"){
        view.disabled = true;
        dele.disabled = true;
    }else{
        view.disabled = false;
        dele.disabled = false;
    }
};