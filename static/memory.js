$(document).ready(function() {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F'];
    const totalPairs = symbols.length;
    let openCards = [];
    let matchedPairs = 0;
    let moves = 0;
  
    function createCard(symbol) {
      const card = $('<div class="card"><span class="hidden">' + symbol + '</span></div>');
      card.on('click', function() {
        flipCard($(this));
      });
      return card;
    }
  
    function flipCard(card) {
      if (!card.hasClass('open') && openCards.length < 2) {
        card.addClass('open');
        card.children().first().removeClass('hidden');
        openCards.push(card);
        if (openCards.length === 2) {
          checkMatch();
          moves++;
          updateMoves();
        }
      }
    }
  
    function checkMatch() {
      const card1 = openCards[0];
      const card2 = openCards[1];
      const symbol1 = card1.children().first().text();
      const symbol2 = card2.children().first().text();

      if (symbol1 === symbol2) {
        card1.addClass('matched');
        card2.addClass('matched');
        matchedPairs++;
  
        if (matchedPairs === totalPairs) {
          // Game is won !!! !! !! 
        }
      } else {
        setTimeout(function(){
            card1.removeClass('open');
            card2.removeClass('open');
            card1.children().first().addClass('hidden');
            card2.children().first().addClass('hidden');
        }, 1000); 
      }
  
      openCards = [];
    }
  
    function updateMoves() {
      $('#moves').text(moves);
    }
  
    function restartGame() {
      $('#gameBoard').empty();
      openCards = [];
      matchedPairs = 0;
      moves = 0;
      updateMoves();
      setupGame();
    }
  
    function setupGame() {
      const shuffledSymbols = shuffle([...symbols, ...symbols]);
  
      shuffledSymbols.forEach(function(symbol) {
        const card = createCard(symbol);
        $('#gameBoard').append(card);
      });
  
      updateMoves();
    }
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    $('#restartBtn').on('click', restartGame);
  
    setupGame();
  });