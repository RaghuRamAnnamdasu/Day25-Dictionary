var data;

var dict = createElement("div","dict container-sm","","","","","");
var searchEnclosure = createElement("div","searchEnclosure","","","","","");
var searchBox = createElement("div","searchBox container-md","","","","","");
var heading = createElement("div","heading","","","","","Dictionary");
var searchText = createElement("input","searchText","type","text","id","textid","");
var searchButton = createElement("button","btn button","","","","","Search");
var clearButton = createElement("button","btn button","","","","","Clear");

document.body.append(dict);
dict.append(searchEnclosure);
searchEnclosure.append(heading,searchBox);
searchBox.append(searchText,searchButton,clearButton);



function createElement(tagName,classAttributeValue,attribute1,attributeValue1,attribute2,attributeValue2,content){
    var element = document.createElement(tagName);
    element.setAttribute("class",classAttributeValue);
    if(attribute1 || attributeValue1){
        element.setAttribute(attribute1,attributeValue1);
    }
    if(attribute2 || attributeValue2){
        element.setAttribute(attribute2,attributeValue2);
    }
    element.innerHTML=content;
    return element;
}

function fetchAPI(word){
    var promise1 = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    promise1.then(
        (readableStreamValue)=>readableStreamValue.json()
        ).then(
            (array)=>{
            data = array;
            dictionary();
        }).catch(
            (err)=>`The error is : ${err}`
        );
}



function dictionary(){
    clearPreviousResults();
    var meaningBody =  createElement("div","meaningBody","","","","","");
    dict.append(meaningBody);
    if(!Array.isArray(data)){
        meaningBody.innerHTML="No results found"
    }
    data[0].meanings.forEach((value,index)=>{
        var partsOfSpeech = createElement("div",`partsOfSpeech`,"","","","","");
        var category = createElement("div",`cat  category${index+1}`,"","","","","");
        var meaningList = createElement("div",`meaningList${index+1}`,"","","","","");
        meaningBody.append(category);
        category.append(partsOfSpeech,meaningList);

        var temp = value.definitions.map((value1,index1)=>{
                return (`${index1+1}. ${value1.definition}`);
        })
        temp.forEach((value2)=>{
            var element = createElement("div","","","","","","");
            element.innerHTML = value2;
            meaningList.append(element);
        })
        partsOfSpeech.innerHTML = value.partOfSpeech;
    })
}

function clearPreviousResults(){
    var elem = document.getElementsByClassName("meaningBody");
    if(elem && elem[0]){
    elem[0].remove();
    }
}
searchButton.addEventListener("click",()=>{
    fetchAPI(document.getElementById("textid").value);
})

clearButton.addEventListener("click",()=>{
    clearPreviousResults();
    document.getElementById("textid").value="";
})

document.addEventListener("keydown",(evt)=>{
    console.log(evt);   
     if(evt.key=="Enter"){
        fetchAPI(document.getElementById("textid").value);
    }
});