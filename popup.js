chrome.storage.sync.get('scriptNames', function(result){
    if(typeof result.scriptNames != 'undefined'){
        
        var div = document.createElement("div");
        var innerDiv = document.createElement("div");
        innerDiv.classList.add("container");
        var heading = document.createElement("h6");
        var optionsButton = document.createElement("img");
        optionsButton.setAttribute("src", "images/settings.png");
        heading.classList.add("card-title");
        innerDiv.classList.add("text-center");
        heading.innerHTML = "Script Manager ";
        optionsButton.id = "optionsButton";
        heading.appendChild(optionsButton);
        innerDiv.appendChild(heading);
        div.classList.add("card");
        div.setAttribute("style", "border:none;")
        innerDiv.classList.add("card-body");
        innerDiv.setAttribute("style", "padding:15px;min-width:165px;");
        innerDiv.id="btnHolder";
        div.appendChild(innerDiv);
        document.body.appendChild(div);
        setOptionsButton();
        var names = result.scriptNames.split(";");
        if(names.count>0){
            names.forEach(addScripts)
        }       
    }
});

function addScripts(item){
    var button = document.createElement("button");
    button.innerHTML = item
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add('btn-sm');
    button.classList.add("btn-block")

    button.onclick = function(element){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.storage.sync.get(item, function(result){
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: result[item]}
                );
            });
        });
    };

    document.getElementById("btnHolder").appendChild(button);        
}

let button = document.getElementById("btnScript");


function setOptionsButton(){
    var optionsButton = document.getElementById("optionsButton");
    optionsButton.onclick = function(){
        if(chrome.runtime.openOptionsPage){
            chrome.runtime.openOptionsPage();
        }else{
            window.open(chrome.runtime.getURL('options.html'));
        }
    };
}