const apikey = "O7L1wVOQWScP7RzN4lkLYOhyEClQEg00";


function fetchObjects(url) {
    loading(true);
    const clickedTitle = localStorage.getItem("clickedObjectTitle");
    url = url + "&apikey=" + apikey + "&title=" + clickedTitle;
    //ajax call
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            if (response.data.length == 0) {
                alert("Oops! No Item found.");
                window.location.replace("object.html");
            }
            showDataOnPage(response);
            loading(false);
        },
        error: function (response) {
            alert("Error function triggered in AJAX Call");
            console.log(response);
            loading(false);
        },
    });
}

fetchObjects("https://data.nma.gov.au/object?id=*");


function showDataOnPage(data) {
    data = data.data[0];
    let description = "No Description Found";
    if (data.physicalDescription != undefined || data.physicalDescription != null) {
        description = data.physicalDescription;
    }
    let contributer = "No Contributor Found";
    if (data.contributor != undefined || data.contributor != null) {
        let numOfContributors = data.contributor.length;
        contributer = "";
        for (let i = 0; i < numOfContributors; i++) {
            contributer += data.contributor[i].title + " - " + data.contributor[i].roleName + "<br>";
        }
    }
    let temporal = "No Temporal Found";
    if (data.temporal != undefined || data.temporal != null) {
        let numOfTemporals = data.temporal.length;
        temporal = "";
        for (let i = 0; i < numOfTemporals; i++) {
            temporal += data.temporal[i].title + " - " + data.temporal[i].description + "<br>";
        }
    }
    let medium = "No Medium Found";
    if (data.medium != undefined || data.medium != null) {
        let numOfMediums = data.medium.length;
        medium = "";
        for (let i = 0; i < numOfMediums; i++) {
            medium += data.medium[i].title + " - " + data.medium[i].type + "<br>";
        }
    }
    let collection = "No Collection Found";
    if (data.collection != undefined || data.collection != null) {
        collection = data.collection.title;
    }

    $("#title").html(data.title);
    $("#title2").html(data.title);
    $("#id").html("Object ID: "+data.id);
    $("#description").html(description);
    $("#contributor").html(contributer);
    $("#temporal").html(temporal);
    $("#medium").html(medium);
    $("#collection").html(collection);
    $("#collection2").html(collection);
    $("#copyright").html(data._meta.copyright);
    let sliderImageHTML = "";
    let sliderImageHTMLThumbnail = "";
    if (data.hasVersion != undefined || data.hasVersion != null) {
        if (data.hasVersion[0].hasVersion != undefined || data.hasVersion[0].hasVersion != null) {
            let numOfImages = data.hasVersion.length;
            for (let i = 0; i < numOfImages; i++) {
                    sliderImageHTML += '<div class="single-image my-3">'+
                '                       <img width="100%" height="400px" src="' + data.hasVersion[i].hasVersion[0].identifier + '" alt="">'+
            '                           </div>';

            sliderImageHTMLThumbnail += '<div class="single-thumb">'+
            '                       <img width="100%" height="100px" src="' + data.hasVersion[i].hasVersion[0].identifier + '" alt="">'+
        '                          </div>';

            }
            $("#imagesMain").html(sliderImageHTML);
            //$("#imagesThumb").html(sliderImageHTMLThumbnail);
        } else {
            showStaticImagesOnSlider();
        }
    }
    else {
        showStaticImagesOnSlider();
    }
}

function showStaticImagesOnSlider(){
    let sliderImageHTML = "";
    let sliderImageHTMLThumbnail = "";

    sliderImageHTML += '<div class="single-image my-3"><img width="100%" height="400px" src="./img/harvest m.jpg" alt=""></div>';
    sliderImageHTML += '<div class="single-image my-3"><img width="100%" height="400px" src="./img/hall.jpg" alt=""></div>';
    sliderImageHTML += '<div class="single-image my-3"><img width="100%" height="400px" src="./img/img3.jpg" alt=""></div>';
    sliderImageHTML += '<div class="single-image my-3"><img width="100%" height="400px" src="./img/brick m.jpg" alt=""></div>';

    $("#imagesMain").html(sliderImageHTML);
}