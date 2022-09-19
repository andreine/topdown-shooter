import {shoot, move} from './player.js';


let moveX = 0;
let moveY = 0;


export function initInputs(){
    window.addEventListener("mousedown", (event) => {
        shoot();
    })

    window.addEventListener("keydown", (event) => {
        if(event.key === "w"){
            moveX = 0;
            moveY = -5;
        }else if(event.key === "a"){
            moveX = -5;
            moveY = 0;
        }else if(event.key === "s" ){
            moveX = 0;
            moveY = 5;
        }else if(event.key === "d"){
            moveX = 5;
            moveY = 0;
        }
            move(moveX, moveY);
    })

}