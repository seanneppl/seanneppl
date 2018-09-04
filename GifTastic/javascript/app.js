/// to do... 1. clean up code (double check let/var, remove anonymous functions 

//  $(document).height() / gif size 
//  $(window).width() / gif size
///////maybe add a resize button that changes the column count...

$(document).ready(function (){

            var buttonArray = ["Cyan", "Magenta", "Yellow"];
            var favoritesArray = [];
            // var columnCount = Math.floor($(document).width() / 150);

            $("#clear").click(function () {
                localStorage.clear();
                $("#favoriteSpan").empty();
                buttons();
            });

            $(".search").click(function () {
                var input = $("#input").val();
                console.log($("this").val());
                if ( $(this).val() === "heart") {
                    console.log("favorites");

                    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
                    if (existingEntries == null) {existingEntries = [];};

                        if(existingEntries.length > 0){
                            existingEntries.unshift(input); 
                            existingEntries.pop();
                            localStorage.setItem("allEntries", JSON.stringify(existingEntries));

                        } else{
                            // var allEntries = JSON.parse(localStorage.getItem("allEntries"));
                            existingEntries.unshift(input);
                            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
                        }
                        console.log(JSON.parse(localStorage.getItem("allEntries")));
                        
                        buttons();

                } else {

                buttonArray.unshift(input);
                buttonArray.pop();
                buttons();
                }
            });


////display buttons function
            function buttons() {
                $("#buttonSpan").empty();
                // $("#favDiv").empty();
                
                for (i = 0; i < buttonArray.length; i++) {
                    let newButton = $("<button class='searchButton'></button>");
                    newButton.text(buttonArray[i]);
                    newButton.val(buttonArray[i])
                    $("#buttonSpan").append(newButton);
                }
                let existingEntries = JSON.parse(localStorage.getItem("allEntries"));

                if(existingEntries === null){$("#clear").hide();}
                    else {
                    $("#favoriteSpan").empty();
                    $("#clear").show();
                    for (i = 0; i < existingEntries.length; i++) {
                    let newButton = $("<button class='searchButton'></button>");

                    newButton.text(existingEntries[i]);
                    newButton.val(existingEntries[i])
                    console.log(newButton);
                    $("#favoriteSpan").append(newButton);
                    }
                }
            }

///// display buttons on load
            buttons();


/////click button to trigger ajax request
            $(document).on("click", ".searchButton", function () {

                let searchTerm = $(this).val();
                let queryURL = "https://api.giphy.com/v1/gifs/search";

                $.ajax({
                    url: queryURL,
                    method: "GET",
                    data: {
                        q: searchTerm,
                        api_key: "UDsByAZbeq0lK2yGzawHpAK3x7HTzFS6",
                        limit: "15",
                        rating: "pg-13",
                       
                    },
                }).then(function (response) {
                    console.log(response);

                    for (i = 0; i < 5; i++) {
                        ////loop through each gif 3 times
                        for (j = 0; j < response.data.length; j++) {
                            let element = response.data[j];
                            let imDiv = $("<div>").attr("id", "imdiv");
                            let poster = $("<img>").attr("src", element.images.downsized_still.url).addClass("photo");
                            poster.data("state", "still").data("animate", element.images.downsized.url);
                            poster.data("still", element.images.downsized_still.url);
                            let rating = $("<p>").text(element.rating);
                            let newDiv = $("<div>").attr("id","newDiv");
                            newDiv.append(poster, rating);
                            imDiv.append(newDiv);
                            // console.log(j % 2);
                            // console.log(j % 2);
                            if (j % 2 === 0) {
                                $("#photos").append(imDiv);
                            } else { ////// ? this mostly works...
                               $("#photos>#imdiv:eq(0)").after(imDiv);
                            }
                        }
                    }
                    //// hide p tags
                    $("p").hide();
                });
            });



//// trigger ajax request for fav or buttonArray[0] onload
            function initialize(){

                let existingEntries = [];
                existingEntries = JSON.parse(localStorage.getItem("allEntries"));
                let searchTerm;

                console.log(existingEntries);
                console.log(existingEntries);

                if (existingEntries === null) {
                    existingEntries = [];
                    searchTerm = buttonArray[0];
                }
                else {
                    searchTerm = existingEntries[0];
                    
                    }
            
                let queryURL = "https://api.giphy.com/v1/gifs/search";

                $.ajax({
                    url: queryURL,
                    method: "GET",
                    data: {
                        q: searchTerm,
                        api_key: "UDsByAZbeq0lK2yGzawHpAK3x7HTzFS6",
                        limit: "10",
                        rating: "g",
                    },
                }).then(function (response) {
                    console.log(response);

////loop through each gif x times
                    for (i = 0; i < 10; i++) {
                        for (j = 0; j < response.data.length; j++) {
                            let element = response.data[j];
                            let imDiv = $("<div>").attr("id", "imdiv");
                            let poster = $("<img>").attr("src", element.images.downsized_still.url).addClass("photo");
                            poster.data("state", "still").data("animate", element.images.downsized.url);
                            poster.data("still", element.images.downsized_still.url);
                            let rating = $("<p>").text(element.rating);
                            let newDiv = $("<div>").attr("id", "newDiv");
                            newDiv.append(poster, rating);
                            imDiv.append(newDiv);
                            // if (j % 2 === 0) {
                            //     $("#photos").append(imDiv);
                            // } else {
                            //     $("#photos").prepend(imDiv);
                            // }
                            $("#photos").append(imDiv);
                        }
                    }
                    //// hide p tags
                    $("p").hide();
                });
            };
            initialize();




//////animate on click
            $(document).on("click", ".photo", function () {
                var state = $(this).data("state");

                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).data("state", "animated");
                }

                if (state === "animated") {
                    $(this).attr("src", $(this).data("still"));
                    $(this).data("state", "still");
                }
            });


/////animate on hover
            $(document).on("mouseover", ".photo", function () {
                // console.log($(this).parent().find("p"));
                $(this).attr("src", $(this).data("animate"));
                $(this).data("state", "animated");

                ///// show p on hover (below works!!!)
                $(this).parent().find("p").show();
            });
            $(document).on("mouseout", ".photo", function () {
                // console.log($(this).data("state"));

                $(this).attr("src", $(this).data("still"));
                $(this).data("state", "still");
                $("p").hide();
            });
});
