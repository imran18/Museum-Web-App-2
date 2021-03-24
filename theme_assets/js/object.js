const apikey = "O7L1wVOQWScP7RzN4lkLYOhyEClQEg00";


function fetchObjects(url) {
    loading(true);
    url = url + "&apikey=" + apikey;
    // ajax call
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            showObjects(response.data);
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

function showObjects(data) {
    const len = data.length;
    $("#resultsCount").html("Now showing " + len + " items");
    $("#object-section").html("");
    for (let i = 0; i < len; i++) {
        console.log(data[i]);
        let img = "./img/musuem.jpg";
        if (data[i].hasVersion != undefined || data[i].hasVersion != null) {
            img = data[i].hasVersion[0].hasVersion[0].identifier;
        }
        let description = "No Description Found";
        if (data[i].physicalDescription != undefined || data[i].physicalDescription != null) {
            description = getShortString(data[i].physicalDescription, 70)
        }
        let medium = "No Medium Found";
        if (data[i].medium != undefined || data[i].medium != null) {
            medium = data[i].medium[0].title + " - " + data[i].medium[0].type;
        }
        let collection = "No Collection Found";
        if (data[i].collection != undefined || data[i].collection != null) {
            collection = data[i].collection.title;
        }
        let contributer = "No Contributor Found";
        if (data[i].contributor != undefined || data[i].contributor != null) {
            contributer = data[i].contributor[0].title + " - " + data[i].contributor[0].roleName;
        }

        var objHTML2 = '<div class="col-lg-4 col-sm-6">' +
            '                            <div class="atbd_single_listing ">' +
            '                                <article class="atbd_single_listing_wrapper">' +
            '                                    <figure class="atbd_listing_thumbnail_area">' +
            '                                        <div class="atbd_listing_image">' +
            '                                            <a href="#">' +
            '                                               <img src="' + img + '" width="100%" height="200px" style="object-fit:cover" />' +
            '                                            </a>' +
            '                                        </div>' +
            '                                        <div class="atbd_thumbnail_overlay_content">' +
            '                                            <ul class="atbd_upper_badge">' +
            '                                                <li><span class="atbd_badge atbd_badge_popular">Popular</span></li>' +
            '                                                <li><span class="atbd_badge atbd_badge_new">Near you</span></li>' +
            '' +
            '                                            </ul>' +
            '                                        </div>' +
            '                                        <!-- ends: .atbd_thumbnail_overlay_content -->' +
            '                                    </figure>' +
            '                                    <!-- ends: .atbd_listing_thumbnail_area -->' +
            '                                    <div class="atbd_listing_info">' +
            '                                        <div class="atbd_content_upper">' +
            '                                            <h4 class="atbd_listing_title">' +
            '                                                <a style="cursor:pointer" onclick="openObjectDetailPage(`' + data[i].title + '`)">' + getShortString(data[i].title, 30) + '</a>' +
            '                                            </h4>' +
            '                                            <div class="atbd_listing_meta">' +
            '                                                <span class="atbd_meta atbd_listing_price">ID # ' + data[i].id + '</span>' +
            '                                            </div>' +
            '                                            <!-- End atbd listing meta -->' +
            '                                            <div class="atbd_listing_data_list">' +
            '                                                <ul>' +
            '                                                    <li>' +
            '                                                        <p><span class="la la-steam"></span>' + description +
            '                                                        </p>' +
            '                                                    </li>' +
            '                                                    <li>' +
            '                                                        <p><span class="la la-check-circle"></span>' + collection + '</p>' +
            '                                                    </li>' +
            '                                                    <li>' +
            '                                                        <p><span class="la la-user"></span>' + contributer +
            '                                                        </p>' +
            '                                                    </li>' +
            ' <li>' +
            '                                                        <p><span class="la la-plus"></span>' + medium +
            '                                                        </p>' +
            '                                                    </li>' +
            '                                                </ul>' +
            '                                            </div>' +
            '                                            <!-- End atbd listing meta -->' +
            '                                        </div>' +
            '                                        <!-- end .atbd_content_upper -->' +
            '                                        <div class="atbd_listing_bottom_content">' +
            '                                            <div class="atbd_content_left">' +
            '                                                <div class="atbd_listing_category">' +
            '                                                    <a href="#"><span class="la la-map-marker"></span>' + data[i]._meta.issued + '</a>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                            <ul class="atbd_content_right">' +
            '                                                <li class="atbd_save">' +
            '                                                    <span class="la la-heart-o"></span>' +
            '                                                </li>' +
            '                                            </ul>' +
            '                                        </div>' +
            '                                        <!-- end .atbd_listing_bottom_content -->' +
            '                                    </div>' +
            '                                    <!-- ends: .atbd_listing_info -->' +
            '                                </article>' +
            '                                <!-- atbd_single_listing_wrapper -->' +
            '                            </div>' +
            '                        </div>';




        $("#object-section").append(objHTML2);
    }
}

function getShortString(str, len) {
    if (str.length > len) {
        return str.substring(0, len) + " ....";
    } else {
        return str;
    }
}

function openObjectDetailPage(title) {
    localStorage.setItem("clickedObjectTitle", title);
    window.location.replace("objectDetails.html");
}

function applyFilters() {
    const filterText = $("#filterText").val();
    const filterTitle = $("#filterTitle").val();
    const filterDescription = $("#filterDescription").val();

    loading(true);
    url = "https://data.nma.gov.au/object?id=*";
    url += "&apikey=" + apikey;
    url += "&text=" + filterText;
    url += "&title=" + filterTitle;
    url += "&description=" + filterDescription;
  
    // ajax call
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            showObjects(response.data);
            loading(false);
            document.getElementById('object-main-section').scrollIntoView();
        },
        error: function (response) {
            alert("Error function triggered in AJAX Call");
            console.log(response);
            loading(false);
        },
    });
}