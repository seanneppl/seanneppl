# GifTastic
[GifTastic](https://seanneppl.github.io/GifTastic/index.html)

GifTastic is a gif generating application using the Giphy api. On page load the first button ("cyan")
is uses to trigger an ajax call for 20 "cyan" gifs. These gifs are then repeated and organized into a grid using
the css column count property. The user can click any of the buttons ("cyan", "magenta", "yellow") to trigger ajax
calls to add gifs to the page. They can also add their own search terms, which become buttons they can click to add
gifs. Their is also a favorite button, which adds a favorite search button to the nav bar and stores the favorite item
in local storage. If there is a favorite stored when a user loads the page that term is called instead
of the default ("cyan").
