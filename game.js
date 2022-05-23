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

    //animate block function --used whenever selected by the game or clicked by the user--
    function animate_block(block_id){
        const block_to_animate = document.getElementById(block_id);

        //toggle background color
        block_to_animate.style.backgroundColor = "grey";    
        setTimeout(function(){
            block_to_animate.style.backgroundColor = block_id;
        }, 300);

        var audio = new Audio('sounds/'+block_id+'.mp3');   //play the corresponding audio
        audio.play();
    }

    // click on block event
    function check_clicked_block(block){
        block.addEventListener("mousedown", function(){
            if(playing){
                animate_block(this.id); //animate clicked block
                user_pattern.push(this.id);
                if(user_pattern[current_index] != game_pattern[current_index])  //if clicked block is not the same following the game pattern sequence
                    lost();
                else{
                    current_index += 1; //to check the next one
                    if(user_pattern.length === game_pattern.length){ 
                        setTimeout(next_level, 500);    //go to next level when the user guesses successfully the whole pattern for the corresponding level
                    }
                }
            }
        });
    }

    // lost function --triggered when user loses --
    function lost(){
        title.innerText = "Game Over, Press Any Key To Restart";    //lose message
        
        var audio = new Audio('sounds/wrong.mp3');  //play the "wrong" audio
        audio.play();

        document.body.style.backgroundColor = "red";
        setTimeout(function(){
            document.body.style.backgroundColor = "#011e40";
        }, 100);

        reset_game();   //reset game to play again
    }

    start_game();

}