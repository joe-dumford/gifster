$(document).ready(function () {

    //Original array
    var movies = ['Forrest Gump', 'Top Gun', 'Wedding Crashers', 'Braveheart', 'Old School', 'Homeward Bound'];

    //Creating preloaded buttons
    function renderButtons() {
        //Stopping any repeat buttons
        $("#my-buttons").empty(); 
        for (var i = 0; i < movies.length; i++) {
            //Create buttons for all items in array
            var a = $("<button>");
            //Add class
            a.addClass("movies");
            //Adding attribute & value of array
            a.attr("data-search", movies[i]);
            //Button's text
            a.text(movies[i]);
            //Moving our buttons into HTML
            $("#my-buttons").append(a);
        }

    }
    //Creating new buttons
    $("#add-button").submit(function (event) {
        event.preventDefault();

        //TRaking users inout text
        var textBox = $("#input").val().trim();
        movies.push(textBox);
        renderButtons();
        console.log(movies);
    });

    renderButtons();
    //Our function to get the GIFs once button is clicked
    $(document).on("click", ".movies", function () {
        var searchTerm = $(this).data("search");

        //Attaching Giphy API and making Ajax call below
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=Ss5Rzu650RylCyJaAf11Sh4F9os831v1&limit=10";
        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function (response) {
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    $("#my_gifs").prepend("<p>Rating: " + response.data[i].rating + "<p>");
                    $("#my_gifs").prepend("<img src='" + response.data[i].images.downsized.url + "'>");

                }
            })


            //Attempt at pausing and animating GIFs when user clicks

        $(document).on("click", "#my_gifs", stopStartGifs);
        function stopStartGifs() {
            var state = $(this).attr("data-state");

            // If/Else statement that should stop or start GIF's 
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }
    });
});