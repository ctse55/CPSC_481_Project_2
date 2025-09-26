# Assisted AI Chess Game (CPSC 481 Project 2)
**By: Chalmers Tse and Darren Chen**
---
## **Project Overview**
This project is an Assisted AI Chess Game that allows users to play chess against AI opponent. The AI utilizes the Minimax Algorithm with Alpha-Beta Pruning to make optimal moves. Additionally a chatbot feature provides move recommendations and assists players during gameplay.

---
## **Directory and File Structure**
## **Directories**
#### 'chesspiecesImg/'
- Contains image assets for the chess pieces displayed on the board during gameplay.

#### 'lib/'
- Holds source files from the libraries **chessboard.js** and **chess.js**.
  - These libraries are integral for building the chessboard UI and implementing game logic.

#### 'node_modules/'
- Contains dependencies and modules installed via **Node.js** for 'chess.js' and 'chessboard.js'

---
### **Files**
#### 'chess.js'
- **Purpose**: Implements the core logic and rules of chess.
- Handles legal/illegal moves, game states (e.g., check, checkmate, draw), and board management.
- **Source Code**: [Chess.js GitHub Repository](https://github.com/jhlywa/chess.js)

#### 'chessboard-0.3.0.js'
- **Purpose**: Generates and manages the chessboard UI
- Enables interactive features such as drag-and-drop piece movement.
- **Source Code**: [Chessboard.js GitHub Repository](https://github.com/oakmac/chessboardjs)

#### 'index.html'
- **Purpose**: Serves as the frontend of the application
- Defines the structure of the user interface, including the chessboard, chatbot, and control elements. 

#### `script.js`
- **Purpose**: Implements the backend logic for the AI Chess Game.
  - Contains:
    - The **Minimax algorithm with Alpha-Beta Pruning** for AI decision-making.
    - The logic for the Assisted Chatbot, which provides optimal move suggestions.
    - Functions to handle game state tracking, move history, and AI-generated moves.

#### `style.css`
- **Purpose**: Defines the visual design of the application.
  - Includes styling for the chessboard, chatbot, buttons, and overall layout.
  - Ensures the UI is intuitive and visually appealing.

---
## **How It All Works**

1. **Libraries**:
   - `chess.js`: Governs the rules and state of the chess game.
   - `chessboard.js`: Manages the interactive chessboard display.

2. **Frontend**:
   - `index.html` defines the visible interface, structured to include the chessboard and chatbot.
   - `style.css` enhances the interface by styling elements for a better user experience.

3. **Backend**:
   - `script.js` implements AI logic (Minimax with Alpha-Beta Pruning) and integrates the chatbot feature to assist players by suggesting moves.

4. **Interactive Features**:
   - Drag-and-drop functionality for chess moves.
   - Move history tracking for player and AI moves.
   - Chatbot that provides real-time advice during gameplay.

---
## **Additional Notes**
- **Setup**:
  - Make sure all required libraries (`chess.js` and `chessboard.js`) are correctly installed.
  - Use a local server or IDE with live preview to test the game.
  
- **Future Improvements**:
  - Enhance the chatbot with natural language responses.
  - Add difficulty levels for the AI by adjusting the Minimax search depth dynamically.
  - Improve the visual design with responsive layouts.

---
