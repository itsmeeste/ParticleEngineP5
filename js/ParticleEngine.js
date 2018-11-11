

// Create the particle engine class
// pass in the startpos of the particle
var ParticleEngine = function(startPos,numOfParticles,lifespam,emitterTime)
{
    // This will contain a list of particles in for the engine
    this.startPos = startPos;
    this.currentitr =0;
    this.numOfParticles = numOfParticles;
    this.life = lifespam;
    this.particles = [];
    this.runTime = 0;
    this.emitterTime = emitterTime;
    this.addedAll = false;
};

// A Method to run all of the particles
ParticleEngine.prototype.run = function(dt)
{
    this.runTime += dt;

    this.Emitter();
    /* Go through the list backwards and then call the run function and
       Check to see if the particle has pass over the lifespam
       */
        for(var i = this.particles.length -1;i >= 0;--i)
        {
          // Go through and run the particle
            var particle = this.particles[i];
            particle.run(dt);
        } 
        this.removeDead();

};

// if the emitter has a value of 200 then every 5th of a second it will push a new particle from the list
ParticleEngine.prototype.Emitter = function()
{
    if(this.runTime >= (this.currentitr * this.emitterTime) && !this.addedAll)
    {
        this.particles.push(
            new Particle(createVector(this.startPos.x,this.startPos.y),this.life,
                createVector(random(-1, 1), random(-1, 0)),
                createVector(0, 0.05)
            )
        );
        this.currentitr++;
        if(this.currentitr == this.numOfParticles-1)
        {
            console.log("added all");
            this.addedAll = true;
        }
    }
};
ParticleEngine.prototype.removeDead = function()
{
    for(var i =this.particles.length -1; i >= 0;--i)
    {
        var particle = this.particles[i];
        if(particle.life < 0)
        {
            this.particles.splice(i,1);
        }
    }
};

// This is a method to add the particle to the system
ParticleEngine.prototype.addParticles = function(num,lifespam)
{
    for(var i = 0; i <= num;++i)
    {
        this.particles.push(
            new Particle(this.startPos,lifespam,
                createVector(random(-1, 1), random(-1, 0)),
                createVector(0, 0.05)
            )
        );
    }
};

/*--------------------- Add an emitter to the particle ---------------------------------*/



/*------------------Particle------------------------------*/
var Particle = function(pos,life,vel,accel)
{
    this.pos = pos;
    this.life = life;
    this.vel = vel;
    this.accel = accel;
};

// now for the methods of the Particle object
Particle.prototype.update = function(dt)
{
    // need to add the accel to the velocity
    //this.vel.add(createVector(this.accel.x * (dt/1000),this.accel.y * (dt/1000)));
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.life -= dt;
};

// This will use the P5 render stuff
Particle.prototype.render = function()
{
    stroke(200,this.life);
    strokeWeight(2);
    fill(127,this.life);
    ellipse(this.pos.x,this.pos.y,12,12);
};

Particle.prototype.run = function(dt)
{
    // This will run the render and update methods
    this.update(dt);
    this.render();
};




/*------------------------- P5 render setup --------------------------------*/
var lastCalledTime;
var fps;

function FPS() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
}

var particleEngine;

// get the delta time
var lastUpdate;
function setup()
{
    // Need to create the p5 canvas
    createCanvas(800,600);
    particleEngine = new ParticleEngine(createVector(width/2,50),300,1000,50);
    //particleEngine.addParticles(1,1000);
    console.log("asda");
    lastUpdate = Date.now();
};  


// This is the draw function that will be ran every frame
function draw()
{
    FPS();
    console.log("Current FPS: " + Math.round(fps));
    // set the background colour of the canvas
    background(51);

    // get the time 
    var now  = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
    particleEngine.run(dt);
};