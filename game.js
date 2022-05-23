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

    // run game function -- initializes the first level --
    function run_game(){
        if(!playing){
            playing = true;
            title.innerText = "Level "+current_level; 
            select_block();
        }
    }

    // next level function
    function next_level(){
        if(playing){
            user_pattern = [];  //empty the pattern array from values stored from the previous level
            current_index = 0;  //reset index for this level
            current_level += 1;
            title.innerText = "Level "+current_level;
            select_block();
        } 
    }

    // set level function -- randomly choose one color --
    function set_level_color(){
        var random_int = Math.floor(Math.random() * 4);
        var level_color = colors[random_int];
        return level_color;
    }

    // select block function -- select the block to be clicked by the user --
    function select_block(){
        var level_color = set_level_color();
        game_pattern.push(level_color);
        animate_block(level_color);
    }
    
    start_game();

}