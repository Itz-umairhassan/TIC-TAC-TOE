let choice;
let end;
let player1, player2;
let double_touch;

let heading = document.getElementById('heading');


// here we make a message controller which we show at the start and end
// of the game....so we restore each values in
// game control like choice array above so that user can start a new game...
let inner_message = document.getElementById('end-message');
let message = document.getElementById('play-button');
let layer = document.getElementsByClassName('layer');
message.addEventListener('click', () => {
    reset_values();
    layer[0].style.display = 'none';

})

function reset_values() {
    choice = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    double_touch = [false, false, false, false, false, false, false, false, false, false];
    end = false;
    player1 = true, player2 = false;
    heading.innerText = 'Player X turn';
    t.forEach((elem) => {
        elem.innerText = '';
        elem.style.backgroundColor = '#008b7ecc';
    })
}

// take input from user... taking id of target as an argument...
function input(target, text) {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (choice[i][j] == target) {
                choice[i][j] = text;
                double_touch[target] = true;
            }

        }
    }
}


// this function shows your input on screen....

// function to check if game ends or not......
function check_winner() {
    // check row wise win...
    for (let i = 0; i < 3; i++) {
        if (choice[i][0] == choice[i][1] && choice[i][1] == choice[i][2]) {
            return true;
        }
    }

    // check column wise win....
    for (let i = 0; i < 3; i++) {
        if (choice[0][i] == choice[1][i] && choice[1][i] == choice[2][i]) {
            return true;
        }
    }

    // diagonal check...
    if (choice[0][0] == choice[1][1] && choice[1][1] == choice[2][2]) {
        return true;
    }
    if (choice[2][0] == choice[1][1] && choice[1][1] == choice[0][2]) {
        return true;
    }

    // check overall end ... but no one will win in this case....
}

// check if the game is tied or not....
function tie(player) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((choice[i][j] == 'X' || choice[i][j] == '0') == false) {
                return false;
            }
        }
    }
    return true;
}

// it displayes info on screen in case of game win or tie...
function display(message_format) {
    end = true;
    inner_message.innerText = message_format;
    message.innerText = 'Play again'
    layer[0].style.display = 'flex';
}

function game_control(id, winner_check, input) {
    let elem = document.getElementById(id);

    if (player1 == true) {
        input(id, 'X');

        elem.innerHTML = `<h1>X</h1>`;
        elem.style.backgroundColor = "#e11b00d6";

        // console.log(choice)
        if (winner_check()) {

            display('Player X has won .. hehehe');

        }
        else if (tie()) {
            display(`Oops it's a tie`);
        }
        player1 = false;
        player2 = true;
        heading.innerText = 'Player Y turn';

    }
    else if (player2 == true) {
        input(id, '0');

        elem.innerHTML = `<h1>o</h1>`;
        elem.style.backgroundColor = "#fd9939ed";


        player1 = true;
        player2 = false;
        if (winner_check()) {
            display('Player Y has won .. hehehe');
        }
        else if (tie()) {
            display(`Oops it's a tie`);
        }
        heading.innerText = 'Player X turn';
    }

}


// adding event listener on each item so that we can play game...
// Function written above will not be executed without this event listener 
let t = document.querySelectorAll('.item');

t.forEach((Element) => {
    Element.addEventListener('click', () => {
        if (end == false && double_touch[Element.id] == false) {
            game_control(Element.id, check_winner, input);
        }
    })
})

