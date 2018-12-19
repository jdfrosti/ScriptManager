chrome.storage.sync.get('scriptNames', function(result){
    if(typeof result.scriptNames != 'undefined'){  

        var optionsButton = document.createElement("img");
        optionsButton.setAttribute("src", "images/settings.png");
        optionsButton.id = "optionsButton";

        var heading = document.createElement("h6");
        heading.classList.add("card-title");
        heading.innerHTML = "Script Manager ";
        heading.appendChild(optionsButton);

        var innerDiv = document.createElement("div");
        innerDiv.classList.add("container", "text-center", "card-body");
        innerDiv.setAttribute("style", "padding:15px;min-width:165px;");
        innerDiv.id="btnHolder";
        innerDiv.appendChild(heading);


        var div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("style", "border:none;")
        div.appendChild(innerDiv);

        document.body.appendChild(div);

        setOptionsButton();

        var names = result.scriptNames.split(";");  
        names.forEach(addScripts)      
    }
});

function addScripts(item){
    var button = document.createElement("button");
    button.innerHTML = item
    button.classList.add("btn", "btn-primary", 'btn-sm', "btn-block");

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
    $("#btnHolder").append(button);        
}

let button = document.getElementById("btnScript");


function setOptionsButton(){
    var optionsButton = $("#optionsButton");
    optionsButton.click(function(){
        if(chrome.runtime.openOptionsPage){
            chrome.runtime.openOptionsPage();
        }else{
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
}