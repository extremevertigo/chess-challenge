# Chess Game Challenge

I was able to get all the require tasks done and a few extra tasks.  

`Looking over Base Code` - 15min 
`Tile board setup` - 30 mins 
`Chess piece setup` - 1.5 hours
`Animating setup` - 30 mins
`Reset button setup` - 20 mins
*Extras*
`Local Storage Setup and adding an array to store data` - 30 mins
`Setting up Movement` - 20 mins - I had to stop because I passed my time limit


`configs.json` - Holds the data for the chess pieces and movement rules I was planning on adding in the future

`board.js` - Utilizes document fragmentation to add the chess tiles and is setup with click events thats emit to the EventBus for movement setup

`controls.js` - Added the reset button that emit the reset call to the EventBus

`pieces.js` - Return a document fragment of divs for the chess pieces

`array.js` - Setups a global array that I can access and store board movement and a future move list

`gameevents.js` - Handles the setup of the globals board Array. Sets up pieces for a starting animation handles          movements and updates local storage.

`main.js` - Handles the loading of the game. I first check local storage for the boardArray before loading the game so
in the future we can have saved gameplay.


*Personal note*
This was a fun and challenging excercise.  Everything seemed to flow pretty nicely with the time I was given.  One area where I felt I struggled was with the correct way to setup the chess pieces.  I had gone through 3 different ideas on how to do it due to the fact I really wanted to simulate the movement of the pieces.  But it got to a point where I decided to move on due to time constraints.  Hopefully you find some quality in my work and some positive ideas on how I develop.  Thank you so much for giving me the opportunity to participate in this challenge!

-Charles Hansen