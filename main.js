var canvas = document.getElementById('animation');


var c = canvas.getContext('2d');

var mouse = {
    x:undefined,
    y:undefined
}

var maxRadius = 40;
var connectionRadius = 50;

var colorArray = []
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = '#18191A';
        c.fill();
    }

    this.drawLine = function(cA, cB) {
        c.strokeStyle = '#626668';
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(cA.x, cA.y);
        c.lineTo(cB.x, cB.y);
        c.stroke();
    }

    this.update = function(){

        


        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;    
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;    
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interractivity
        /*
        if((mouse.x - this.x < 50 && mouse.x - this.x > -50)&&(mouse.y - this.y < 50 && mouse.y - this.y > -50)) {
            if(this.radius < maxRadius){
            this.radius += 1;
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }
        */
        
        circleArray.forEach(element => {
            if(Math.abs(this.x - element.x) < connectionRadius && Math.abs(this.y - element.y) < connectionRadius){
                this.drawLine(this, element);
            }
        });

        this.draw();

        
    }
}



var lineArray = [];
var circleArray = [];
function init() {
    circleArray = [];
    for(var i =0; i < 500; i++){
        var x = Math.random()*(innerWidth-radius*2) + radius;
        var y = Math.random()*(innerHeight - radius*2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = Math.random()*10 +1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
    
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        
    }
}

init();
animate();