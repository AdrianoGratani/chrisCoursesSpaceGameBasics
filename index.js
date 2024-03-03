const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = innerWidth;   // window.innerWidth
canvas.height = innerHeight;  // window.innerHeight;

class Player {
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
     draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;                        // il colore non viene mandato automatiamente da this.blue, ma viene dato nero di default, qindi nella funione dove fai fill() e shape di player devi usare anche fillStyle() per assegnare il colore
        c.fill()
    }

}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
    }
    // ERRORE MI DAVA 'projectile.update() is not a function. === avevo affidato update() a player !!!!!!!!!'
    update(){     // qui le caratterstiche default di una classe/istanza vengono aggiornate, solitamente in seguito ad un evento specifico (i.e. un personaggio vigoroso di default, dopo un update() in base ad un evento 'stanchezza' potrebbe risultare stanco ed affaticato)
      this.x = this.x + this.velocity.x           // update() serve in questo caso per aggirnare la posizione id un oggetto nel canvas
      this.y = this.y + this.velocity.y
}
}


const x = canvas.width / 2;    // usi come parameter  di istanza per centrarla
const y = canvas.height / 2;    // usi come parameter  di istanza per centrarla


const player = new Player (x, y, 30, 'blue');
player.draw();

const projectile = new Projectile(
    canvas.width / 2,
    canvas.height /2,
    5,
    'red',
    {
        x: 1,    // se affidi x : 1 y : 1 di velocity come parametro di proectile.update(), di default appena carichi la pagina il projectile va in basso Y > va verso il basso / e a destra x > va verso destra
        y: 1
    }
)



function animate(){
    requestAnimationFrame(animate)
    // projectile.draw();              ERROR; projectile is NOT defined within this scope, instead is in the eventlistener for click;
    // projectile.animate();           SOLUZIONE: estrai dallo scope dell'event listener const projectile e mettila qui sotto;
    // ora che projecctile e' nell'outer scope la reference di draw() e animate() su tale istanza andra' a buon fine;
    projectile.draw()
    projectile.update();

}

addEventListener('click', (event) => {   // prendi le coord clientx ed y del 'click' in x y da 'e' obj
    // const projectile = new Projectile(
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     5,
    //     'red',
    //     {                          // la velocity va da update() e aggiorna la posizione dei proiettili unendosi alla x di posituio
    //         x: 1,
    //         y: 1
    //     }
    // );
    // projectile.draw();             // draw() ed update() qui non servono a nulla. devono stare in animate() per riaggiore la posizione
    // projectile.update();           // la posizione del proiettile va riagigornata di continuo, per quest ova mandata a animate()
    }
);

animate()