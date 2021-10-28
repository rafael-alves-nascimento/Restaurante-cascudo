// ---------
  // funçoes
  // ---------

  var canvas = document.querySelector('canvas');
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');
  var count = canvas.height;
  var bubbles = [];
  var bubbleCount = 150;
  var bubbleSpeed = 2;
  var popLines = 30;
  var popDistance = 800;
  var mouseOffset = {
    x: 0,
    y: 0
  }



  // --------------
  // Animation Loop
  // --------------

  function animate() {



    // ------------
    //  Canvas
    // ------------

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    // ------------
    //  desenho bolhas
    // ------------

    ctx.beginPath();
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].position.x = Math.sin(bubbles[i].count/bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
      bubbles[i].position.y = bubbles[i].count;
      bubbles[i].render();

      if(bubbles[i].count < 0 - bubbles[i].radius) {
        bubbles[i].count = canvas.height + bubbles[i].yOff;
      } else {
        bubbles[i].count -= bubbleSpeed;
      }
    }

    // ---------------
    // On bolhas Hover
    // ---------------

    for (var i = 0; i < bubbles.length; i++) {
      if(mouseOffset.x > bubbles[i].position.x - bubbles[i].radius && mouseOffset.x < bubbles[i].position.x + bubbles[i].radius) {
        if(mouseOffset.y > bubbles[i].position.y - bubbles[i].radius && mouseOffset.y < bubbles[i].position.y + bubbles[i].radius) {
          for (var a = 0; a < bubbles[i].lines.length; a++) {
            popDistance = bubbles[i].radius * 0.5;
            bubbles[i].lines[a].popping = true;
            bubbles[i].popping = true;
          }
        }
      }
    }

    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);



  // ------------------
  // Bubble construtor
  // ------------------

  var createBubble = function() {
    this.position = {x: 0, y: 0};
    this.radius = 8 + Math.random() * 6;
    this.xOff = Math.random() * canvas.width - this.radius;
    this.yOff = Math.random() * canvas.height;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = canvas.height + this.yOff;
    this.color = '#8bc9ee';
    this.lines = [];
    this.popping = false;
    this.maxRotation = 85;
    this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
    this.rotationDirection = 'forward';

    //  Linhas
    for (var i = 0; i < popLines; i++) {
      var tempLine = new createLine();
          tempLine.bubble = this;
          tempLine.index = i;

      this.lines.push(tempLine);
    }

    this.resetPosition = function() {
      this.position = {x: 0, y: 0};
      this.radius = 8 + Math.random() * 6;
      this.xOff = Math.random() * canvas.width - this.radius;
      this.yOff = Math.random() * canvas.height;
      this.distanceBetweenWaves = 50 + Math.random() * 40;
      this.count = canvas.height + this.yOff;
      this.popping = false;
    }

    // Render 
    this.render = function() {
      if(this.rotationDirection === 'forward') {
        if(this.rotation < this.maxRotation) {
          this.rotation++;
        } else {
          this.rotationDirection = 'backward';
        }
      } else {
        if(this.rotation > this.maxRotation * -1) {
          this.rotation--;
        } else {
          this.rotationDirection = 'forward';
        }
      }

      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation*Math.PI/180);

      if(!this.popping) {
        ctx.beginPath();
        ctx.strokeStyle = '#8bc9ee';
        ctx.lineWidth = 1;
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI*1.5, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
      }
      
      ctx.restore();

      // desenho linhas
      for (var a = 0; a < this.lines.length; a++) {
        if(this.lines[a].popping) {
          if(this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
            this.lines[a].popDistance += 0.06;
          } else {
            if(this.lines[a].popDistance >= 0) {
              this.lines[a].inversePop = true;
              this.lines[a].popDistanceReturn += 1;
              this.lines[a].popDistance -= 0.03;
            } else {
              this.lines[a].resetValues();
              this.resetPosition();
            }
          }

          this.lines[a].updateValues();
          this.lines[a].render();
        }
      }
    }
  }


  for (var i = 0; i < bubbleCount; i++) {
    var tempBubble = new createBubble();

    bubbles.push(tempBubble);
  }



  // ----------------
  // Line Constructor
  // ----------------

  function createLine() {
    this.lineLength = 0;
    this.popDistance = 0;
    this.popDistanceReturn = 0;
    this.inversePop = false; // 
    this.popping = false;

    this.resetValues = function() {
      this.lineLength = 0;
      this.popDistance = 0;
      this.popDistanceReturn = 0;
      this.inversePop = false;
      this.popping = false;

      this.updateValues();
    }

    this.updateValues = function() {
      this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
      this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
      this.lineLength = this.bubble.radius * this.popDistance;
      this.endX = this.lineLength;
      this.endY = this.lineLength;
    }

    this.render = function() {
      this.updateValues();

      ctx.beginPath();
      ctx.strokeStyle = '#8bc9ee';
      ctx.lineWidth = 2;
      ctx.moveTo(this.x, this.y);
      if(this.x < this.bubble.position.x) {
        this.endX = this.lineLength * -1;
      }
      if(this.y < this.bubble.position.y) {
        this.endY = this.lineLength * -1;
      }
      if(this.y === this.bubble.position.y) {
        this.endY = 0;
      }
      if(this.x === this.bubble.position.x) {
        this.endX = 0;
      }
      ctx.lineTo(this.x + this.endX, this.y + this.endY);
      ctx.stroke();
    };
  }

  canvas.addEventListener('mousemove', mouseMove);

  function mouseMove(e) {
    mouseOffset.x = e.offsetX;
    mouseOffset.y = e.offsetY;
  }

  window.addEventListener('resize', function() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  });

