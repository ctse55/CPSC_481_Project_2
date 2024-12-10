var board, game = new Chess();

/* Minimax Searching Algorithm with Alpha-Beta Pruning */

function minimaxRoot(depth, game, isMaximisingPlayer) {
    const moves = game.ugly_moves();
    let bestValue = isMaximisingPlayer ? -Infinity : Infinity;
    let bestMove = null;

    for (const move of moves) {
        game.ugly_move(move);
        const value = minimax(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
        game.undo();

        if ((isMaximisingPlayer && value > bestValue) || (!isMaximisingPlayer && value < bestValue)) {
            bestValue = value;
            bestMove = move;
        }
    }
    return bestMove;
}

function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;

    if (depth === 0 || game.game_over()) {
        return evaluateBoard(game.board());
    }

    const moves = game.ugly_moves();
    let bestValue = isMaximisingPlayer ? -Infinity : Infinity;

    for (const move of moves) {
        game.ugly_move(move);
        const value = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
        game.undo();

        if (isMaximisingPlayer) {
            bestValue = Math.max(bestValue, value);
            alpha = Math.max(alpha, bestValue);
        } else {
            bestValue = Math.min(bestValue, value);
            beta = Math.min(beta, bestValue);
        }

        if (beta <= alpha) break; // Alpha-beta pruning
    }

    return bestValue;
}

function evaluateBoard(board) {
    let totalEvaluation = 0;

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const piece = board[y][x];
            if (piece) {
                totalEvaluation += getPieceValue(piece, x, y);
            }
        }
    }

    return totalEvaluation;
}

function getPieceValue(piece, x, y) {
    const pieceValues = {
        p: 10,
        r: 50,
        n: 30,
        b: 30,
        q: 90,
        k: 900,
    };

    const positionTables = {
        p: piece.color === 'w' ? pawnEvalWhite : pawnEvalBlack,
        r: piece.color === 'w' ? rookEvalWhite : rookEvalBlack,
        n: knightEval,
        b: piece.color === 'w' ? bishopEvalWhite : bishopEvalBlack,
        q: evalQueen,
        k: piece.color === 'w' ? kingEvalWhite : kingEvalBlack,
    };

    const baseValue = pieceValues[piece.type] || 0;
    const positionValue = positionTables[piece.type][y][x] || 0;

    return piece.color === 'w' ? baseValue + positionValue : -(baseValue + positionValue);
}

/* Position evaluation tables */
var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

/* Board visualization and game state handling */

function makeBestMove() {
    if (game.game_over()) {
        alert("Game over");
        return;
    }

    const bestMove = getBestMove(game);
    if (bestMove) {
        game.ugly_move(bestMove);
        board.position(game.fen());
        renderMoveHistory(game.history());
    }

    if (game.game_over()) {
        alert("Game over");
    }
}

function getBestMove(game) {
    positionCount = 0;
    const depth = parseInt(document.getElementById("search-depth").value, 10);

    const startTime = performance.now();
    const bestMove = minimaxRoot(depth, game, true);
    const endTime = performance.now();

    const moveTime = ((endTime - startTime) / 1000).toFixed(2);
    const positionsPerSecond = Math.round((positionCount * 1000) / (endTime - startTime));

    document.getElementById("position-count").textContent = positionCount;
    document.getElementById("time").textContent = `${moveTime}s`;
    document.getElementById("positions-per-s").textContent = positionsPerSecond;

    return bestMove;
}

function renderMoveHistory(moves) {
    const historyElement = document.getElementById("move-history");
    historyElement.innerHTML = "";

    for (let i = 0; i < moves.length; i += 2) {
        historyElement.innerHTML += `<span>${moves[i]} ${moves[i + 1] || ""}</span><br>`;
    }

    historyElement.scrollTop = historyElement.scrollHeight;
}

function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: "q", // Always promote to a queen
    });

    removeGreySquares();
    if (!move) return "snapback";

    renderMoveHistory(game.history());
    setTimeout(makeBestMove, 250);
}

function onSnapEnd() {
    board.position(game.fen());
}

function onMouseoverSquare(square) {
    const moves = game.moves({ square, verbose: true });

    if (moves.length === 0) return;

    greySquare(square);
    moves.forEach((move) => greySquare(move.to));
}

function onMouseoutSquare() {
    removeGreySquares();
}

function removeGreySquares() {
    document.querySelectorAll("#board .square-55d63").forEach((square) => {
        square.style.background = "";
    });
}

function greySquare(square) {
    const squareEl = document.querySelector(`#board .square-${square}`);
    const background = squareEl.classList.contains("black-3c85d") ? "#696969" : "#a9a9a9";
    squareEl.style.background = background;
}

const cfg = {
    draggable: true,
    position: "start",
    onDragStart: (source, piece) => !game.game_over() && piece.search(/^b/) === -1,
    onDrop,
    onMouseoverSquare,
    onMouseoutSquare,
    onSnapEnd,
};
board = ChessBoard("board", cfg);

// Chatbot functionality
document.getElementById("chat-btn").addEventListener("click", () => {
    const bestMove = getBestMove(game);
    const message = bestMove ? `${bestMove.from}-${bestMove.to}` : "No best move available. The game might be over.";
    addChatMessage(message);
});

function addChatMessage(message, sender = "bot") {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.textContent = (sender === "bot" ? "Bot: " : "You: ") + message;
    messageElement.className = sender === "bot" ? "bot-message" : "user-message";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
