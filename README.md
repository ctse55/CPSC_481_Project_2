# Assited AI Chess Game (CPSC 481 Project 2) 
by Chalmers Tse and Darren Chen 

## Directory Description
### chesspiecesImg 
A Directory that holds the images of the chess pieces to be displayed on the chessboard when the user plays the game 
### lib
A directory that holds the source code from chessboard.js and chess.js. These files are used to help build the UI/UX of chess for the player 
### node_modules
A directory that holds the different modules when downloading the source code chess.js and chessboard.js using Node.js 

## File Description
### chess.js
This file contains the logic of chess. It contains the general rules of chess such as legal/illegal moves, draws, checkmates, etc. 
Source Code: https://github.com/jhlywa/chess.js.git 

### chessboard-0.3.0.js
This file contains the logic to create the chessboard generated when players start the game. 
Source Code: https://github.com/oakmac/chessboardjs.git 

### index.html
The Frontend of the AI Chess Game. This file contains the code of the Chess Game UI and what the users will be able to see on their end of the application. 
### script.js
The Backend of the AI Chess Game. This file deals with the logic behind the chess game. It includes the Minimax with Alpha-Beta Pruning Searching Algorithm for the Computer player and includes the logic of the Assisted Chatbot for the player. This file contains the logic behind how the game will keep track of the moves made by each player and other features presented in the Chess Game.
### style.css
The Frontend of the AI Chess Game. This file contains code that modifies the color, style, and position of the overall chess UI. 
