$(document).ready( function() {
    let id = data[0];
    let currData = data[1][id];

    let pairs = currData["pairs"];
    let text = currData["text"];
    let flowerNames = Object.keys(pairs);
    let title = currData["title"];

    $('#title').text(title);
    $('#bodytext').text(text);

    for (let i = 1; i <= 4; i++) {
        let imgid = '#img' + i.toString();
        $(imgid).attr("src", pairs[flowerNames[i-1]]);
        $(imgid).attr("alt", flowerNames[i-1]);
    }

    $("#homeButton").click(function(){
        window.location.href = "/";
    })

    $("#leftButton").click(function(){
        window.location.href = "/learningmodules";
    })

    $("#rightButton").click(function(){
        window.location.href = "/learn/game" + id.toString();
    })
})