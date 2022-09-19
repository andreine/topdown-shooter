let player = document.querySelector("#player");
let mouseCoordX = null;
let mouseCoordY = null;
let playerStyle = getComputedStyle(player)


window.addEventListener("mousemove", (event) => {
    mouseCoordX = event.clientX;
    mouseCoordY = event.clientY;
    let playerRect = player.getBoundingClientRect();
    const angle = Math.atan2 ( (event.clientY - Number.parseInt(playerRect.top + playerRect.height/2)), (event.clientX - Number.parseInt(playerRect.left + playerRect.width/2)) )
    player.style.transform = `rotate(${angle}rad)`
})


export function move(moveX, moveY) {
    playerStyle = getComputedStyle(player);
    player.style.left = Number.parseInt(playerStyle.left) + moveX + "px";
    player.style.top = Number.parseInt(playerStyle.top) + moveY + "px";
} 


export function shoot() {
    let bullet = document.createElement("div");
    playerStyle = getComputedStyle(player);

    let centerPlayerX = Number.parseInt(playerStyle.left) + player.offsetWidth/2;
    let centerPlayerY = Number.parseInt(playerStyle.top) + player.offsetHeight/2 ;
    let distanceBetweenPoints = Math.sqrt((mouseCoordY - centerPlayerY)**2 + (mouseCoordX - centerPlayerX)**2)


    // let bulletStartY = centerPlayerY + 80/distanceBetweenPoints*( mouseCoordY- centerPlayerY)
    // let bulletStartX = centerPlayerX + 80/distanceBetweenPoints*( mouseCoordX- centerPlayerX)

    let endY = centerPlayerY + 300/distanceBetweenPoints*( mouseCoordY- centerPlayerY)
    let endX = centerPlayerX + 300/distanceBetweenPoints*( mouseCoordX- centerPlayerX)


    // Test rotation to make the bullet start from tip
    // let newCenterPlayerX = centerPlayerX * Math.cos(10 * Math.PI/180) - centerPlayerY  * Math.sin(10 * Math.PI/180) ;
    // let newCenterPlayerY = centerPlayerX * Math.sin(10 * Math.PI/180) + centerPlayerY  * Math.cos(10 * Math.PI/180) ;


    // let testX = endX * Math.cos(10 * Math.PI/180) - endY  * Math.sin(10 * Math.PI/180) ;
    // let testY = endX * Math.sin(10 * Math.PI/180) + endY  * Math.cos(10 * Math.PI/180) ;

    // let newBulletEndY = newCenterPlayerY + 70/distanceBetweenPoints*( testY- newCenterPlayerY)
    // let newBulletEndX = newCenterPlayerX + 70/distanceBetweenPoints*( testX- newCenterPlayerX)


    let offsetPlayerAfterRotationX = (centerPlayerX - endX) * Math.cos(-11 * Math.PI/180) - (centerPlayerY - endY) * Math.sin(-11 * Math.PI/180) + endX
    let offsetPlayerAfterRotationY = (centerPlayerX - endX) * Math.sin(-11 * Math.PI/180) + (centerPlayerY - endY) * Math.cos(-11 * Math.PI/180) + endY

    let distBetweenTipAndEnd = Math.sqrt((endY - offsetPlayerAfterRotationY)**2 + (endX - offsetPlayerAfterRotationX)**2)

    let weaponTipX =  offsetPlayerAfterRotationX + 70/distBetweenTipAndEnd*( endX - offsetPlayerAfterRotationX)
    let weaponTipY =  offsetPlayerAfterRotationY + 70/distBetweenTipAndEnd*( endY- offsetPlayerAfterRotationY)


    // 


    bullet.classList.add("bullet");
    bullet.style.top = weaponTipY + "px" ;
    bullet.style.left = weaponTipX + "px" ;




    document.body.append(bullet);
    setTimeout(() => {
        bullet.style.top = endY + "px";
        bullet.style.left = endX + "px";
    }, 0);

    bullet.addEventListener("transitionend", (event)=> {
        bullet.remove();
    })
}