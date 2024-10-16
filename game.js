
const audios=[];
audios['arena']=new Audio("./sonidos/desenterrar_arena.mp3");
audios['hueso']=new Audio("./sonidos/desenterrar_huesos.mp3");
audios['exit']=new Audio("./sonidos/ayuda.mp3");
audios['lost']=new Audio("./sonidos/game_over.mp3");




// vincular el archivo .js en el php y ejecutar el sonido de la siguiente manera
audios['arena'].play();

function alerts(){

    const alarm_bones=alert("you found a bone");
    alarm_bones.className='bone_alert';
    const alarm_miss=alert("you don´t found nothing");
    alarm_miss.className='miss_alert'
    const alarm_win=alert("you win the game");
    alarm_win.className='win_alert'
    const alarm_lose=alert("have more luck the next time, you lose");
    alarm_lose.className='lose_alert'


}