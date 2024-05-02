$(document).ready(function() {
    let id = data[0];
    let currData = data[1][id];
    let pairs = currData["pairs"];
    let flowerNames = Object.keys(pairs);
    let title = currData["title"];

    const totalPairs = pairs.length;
    let openCards = [];
    let matchedPairs = 0;
    let moves = 0;

    $('#title').text(title);

    function setupGame() {
      const shuffledSymbols = shuffle([...flowerNames, ...flowerNames]);
  
      shuffledSymbols.forEach(function(flowerName) {
        const card = createCard(flowerName);
        $('#gameBoard').append(card);
      });
  
      updateMoves();
    }
  
    function createCard(flowerName) {
      const card = $('<div class="card"> \
        <img class="memory-image hidden-img" src=' + pairs[flowerName] + ' alt=\
        ' + flowerName + '><span class="hidden">' + flowerName + '</span> \
      </div>');
      card.on('click', function() {
        flipCard($(this));
      });
      return card;
    }
  
    function flipCard(card) {
      if (!card.hasClass('open') && openCards.length < 2) {
        card.addClass('open');
        card.children()[1].classList.remove('hidden');
        card.children()[0].classList.remove('hidden-img');
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
      const symbol1 = card1.children()[1].textContent;
      const symbol2 = card2.children()[1].textContent;

      console.log(symbol1);
      console.log(symbol2);

      if (symbol1 === symbol2) {
        card1.addClass('matched');
        card2.addClass('matched');
        matchedPairs++;
  
        if (matchedPairs === totalPairs) {
          // Game is won !!! !! !! 
        }

        openCards = [];
      } else {
        setTimeout(function(){
            card1.removeClass('open');
            card2.removeClass('open');
            card1.children()[0].classList.add('hidden-img');
            card2.children()[0].classList.add('hidden-img');
            card1.children()[1].classList.add('hidden');
            card2.children()[1].classList.add('hidden');
            openCards = [];
        }, 1000); 
      }
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