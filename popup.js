chrome.storage.sync.get('scriptNames', function(result){
    if(typeof result.scriptNames != 'undefined'){
        var names = result.scriptNames.split(";");
        var div = document.createElement("div");
        var innerDiv = document.createElement("div");
        var heading = document.createElement("h6");
        heading.classList.add("card-title");
        heading.innerHTML = "Script Manager";
        innerDiv.appendChild(heading);
        div.classList.add("card");
        div.setAttribute("style", "border:none;")
        innerDiv.classList.add("card-body");
        innerDiv.setAttribute("style", "padding:15px;");
        innerDiv.id="btnHolder";
        div.appendChild(innerDiv);
        document.body.appendChild(div);
        names.forEach(addScripts)
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

