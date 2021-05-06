AFRAME.registerComponent('game', {
    schema: {
        elementId : {type: 'string', default : '#ring1'}    
    },

    init: function () {
        var duration = 10;
        const timer1 = document.querySelector("#timer");
        this.startTimer(duration, timer1);
      },

      startTimer: function (duration, timer1) {
        var minutes;
        var seconds;
    
        var timer = setInterval(countDown, 1000);
    
        function countDown() {
          if (duration >= 0) {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
    
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
    
            timer1.setAttribute("text", {
              value: minutes + ":" + seconds,
            });
    
            duration -= 1;
          } 
          else {
            this.gameOver()        
          }
        }
      },

      updateScore: function(){
        const element = document.querySelector('#score')
        var count = element.getAttribute('text').value
        var currentScore = parseInt(count);
        currentScore += 5
        element.setAttribute('text', {value: currentScore}) 
      },

      updateTarget: function(){
        const element = document.querySelector('#targets')
        var count = element.getAttribute('text').value
        var currentTarget = parseInt(count);
        currentTarget -= 1
        element.setAttribute('text', {value: currentTarget})
      },

      gameOver: function(){
        const plane1 = document.querySelector('#plane')
        const element = document.querySelector('#gameOver')
        element.setAttribute('visible', true)
        plane1.setAttribute('dynamic-body', {mass:1})
      },

    isCollided: function(elementId){
        const element = document.querySelector(elementId)

        element.addEventListener('collide', (e) => {
            if(elementId.includes('#ring')){
                element.setAttribute('visible', 'false')
                this.updateTarget();
                this.updateScore();
            }
            else {
                this.gameOver()
            }
        })
    },

    update : function(){
        this.isCollided(this.data.elementId)
    }
})