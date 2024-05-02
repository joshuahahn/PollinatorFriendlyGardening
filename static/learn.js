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

    var button = $("<button></button>");
    var home_image = $("<img>");
    home_image.attr("src", "/static/imgs/house-solid.svg");
    button.append(home_image);
    $("#home").append(button);
})