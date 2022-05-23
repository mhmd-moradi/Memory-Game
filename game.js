window.onload=function(){

    const blocks = Array.from(document.getElementsByClassName("block"));
    const title = document.getElementById("title");
    const body = document.getElementsByTagName("body")[0];

    const colors = ["green", "red", "yellow", "blue"]; //game colors
    var game_pattern = [];  //storing the game pattern   
    var user_pattern = [];  //storing the pattern entered by the user for each level

    var playing = false;    //to prevent body and blocks event listeners from occuring twice on each click
    var current_level = 1;
    var current_index = 0;  //to validate the clicked block by user on each click

    // start game function
    function start_game(){
        document.body.addEventListener('click', run_game);
        document.body.addEventListener('keypress', run_game);
        blocks.forEach(check_clicked_block);  
    }

    start_game();

}