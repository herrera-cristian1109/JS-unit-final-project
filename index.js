
// class Card {
//     constructor(face,value,suit) {
//         this.face = face;
//         this.value = value; 
//         this.suit = suit; 
//     }
// }


// These arrays hold the faces and suits of a standard deck of cards. //
let faces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let suits = ['♥','♦','♣','♠'];

// This function creates a standard deck of cards. //
function makeDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let face of faces) {
            deck.push({ face, suit });
        }
    }
    return deck; 
}

// This functions shuffles the deck of cards. //
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

// This function created to initiate the War card game. //
function playWarGame() {
    const deck = makeDeck();
    shuffle(deck);


// Splits the deck evenly between two players. //
    const half = Math.floor(deck.length / 2);
    const player1Hand = deck.slice(0, half);
    const player2Hand = deck.slice(half);

// Rounds and points at beginning of game are 0. //
    let rounds = 0;
    let player1Points = 0;
    let player2Points = 0;


    while (player1Hand.length > 0 && player2Hand.length > 0) {
        rounds++;
        const player1Card = player1Hand.shift();
        const player2Card = player2Hand.shift();

        console.log(`Round ${rounds}:`);
        console.log(`Player 1 draws: ${player1Card.face} of ${player1Card.suit}`);
        console.log(`Player 2 draws: ${player2Card.face} of ${player2Card.suit}`);

// This loop determines which player has won the round. //
        if (faces.indexOf(player1Card.face) > faces.indexOf(player2Card.face)) {
            console.log('Player 1 wins this round');
            player1Points++;
            player1Hand.push(player1Card, player2Card);
        }   else if (faces.indexOf(player1Card.face) < faces.indexOf(player2Card.face)) {
            console.log('Player 2 wins this round');
            player2Points++;
            player2Hand.push(player1Card, player2Card);
        }   else {
            console.log('This round is a draw!');
            const warCards = [player1Card, player2Card];
    
// If there is not enough cards to keep playing, the game will end. //
            while (true) {
                if (player1Hand.length < 4 || player2Hand.length < 4) {
                    console.log('There is not enough cards for another round. The war is over!');
                    return;
                }

                for (let i = 0; i < 4; i++) {
                    warCards.push(player1Hand.shift(), player2Hand.shift());
                }

                const player1WarCard = player1Hand.shift();
                const player2WarCard = player2Hand.shift();

                console.log('Player 1 puts ${player1WarCard.face} of ${player1WarCard.suit} for war!');
                console.log('Player 2 puts ${player2WarCard.face} of ${player2WarCard.suit} for war!');

                warCards.push(player1WarCard, player1WarCard);

                if (faces.indexOf(player1WarCard.face) > faces.indexOf(player2WarCard.face)) {
                    console.log('Player 1 wins this round!');
                    player1Points += warCards.length;
                    player1Hand.push(...warCards);
                    break;
                }   else if (faces.indexOf(player1WarCard.face) < faces.indexOf(player2WarCard.face)) {
                    console.log('Player 2 wins this round');
                    player2Points += warCards.length;
                    player2Hand.push(...warCards);
                    break;
                }   else {
                    console.log('Another draw! Proceeding to next round...');
                }
            }
        }
    }

// This loop determines who has ran out of cards and wins the game. //
    if (player1Hand.length === 0) {
        console.log('Player 2 wins the war!');
    }   else {
        console.log('Player 1 wins the war!');
    }


    console.log('Number of rounds played:', rounds);
    console.log('Player 1 points:', player1Points);
    console.log('Player 2 points:', player2Points);
}

// Initiates the game. //
playWarGame();