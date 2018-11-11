

// Create the particle engine class
// pass in the startpos of the particle
var ParticleEngine = function(startPos)
{
    // This will contain a list of particles in for the engine
    this.startPos = startPos;
    this.particles = [];
};

// A Method to run all of the particles
ParticleEngine.prototype.run = function()
{
    /* Go through the list backwards and then call the run function and
       Check to see if the particle has pass over the lifespam
       */
        for(var i = this.particles.length -1;i >= 0;--i)
        {
          // Go through and run the particle
            var particle = this.particles[i];
            particle.run();
        } 
        this.removeDead();

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


/*------------------Particle------------------------------*/
var Particle = function(pos,life,vel,accel)
{
    this.pos = pos;
    this.life = life;
    this.vel = vel;
    this.accel = accel;
};

// now for the methods of the Particle object
Particle.prototype.update = function()
{
    // need to add the accel to the velocity
    //this.vel.add(this.accel);
    //this.pos.add(this.vel);
    this.life -= 1;
};

// This will use the P5 render stuff
Particle.prototype.render = function()
{
    stroke(200,this.life);
    strokeWeight(2);
    fill(127,this.life);
    ellipse(this.pos.x,this.pos.y,12,12);
};

Particle.prototype.run = function()
{
    // This will run the render and update methods
    this.update();
    this.render();
};




/*------------------------- P5 render setup --------------------------------*/

var particleEngine;
function setup()
{
    // Need to create the p5 canvas
    createCanvas(800,600);
    particleEngine = new ParticleEngine(createVector(width/2,50));
    particleEngine.addParticles(50,50);
};  


// This is the draw function that will be ran every frame
function draw()
{
    // set the background colour of the canvas
    background(51);
    particleEngine.run();
    var size =0;
    size = particleEngine.particles.length;
    console.log(size);
};