// const gameLandscape = {
//     canvas: document.createElement("canvas"),  
//     time : 0,
  
//     start: function () {
//       this.canvas.width = 800;
//       this.canvas.height = 400;
//       this.context = this.canvas.getContext("2d");
//       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//       this.interval = setInterval(updateGameArea, 25); 
//       this.timeInterval = setInterval(updateTime, 1000);
//     },
//     clear: function () {
//       landscapeImage.move();
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       landscapeImage.draw();
//     },
//     stop: function () {

//       clearInterval(this.interval); 
//       clearInterval (this.timeInterval);
//       this.context.fillStyle = 'rgba(0,0,0,0.85)'
//       this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
//       this.context.font =('40px Lucida Sans')
//       this.context.textBaseline = 'middle'

//       if(points <10){
//         this.context.fillStyle = '#AA4774'
//         this.context.fillText('Calcifer burnt you!', 200, 180, 400) 
//         this.context.font =('30px Lucida Sans')
//         this.context.fillText(`You caugth ${points} stars over 10, try again...`, 200, 240, 400) }
//       else {
//         this.context.fillStyle = '#6B84C8'
//         this.context.fillText('You made it, well done!', 200, 180, 400)  
//         this.context.font =('30px Lucida Sans')
//         this.context.fillText(`You took ${this.time}s to complete the level.`, 200, 240, 400) 
        
//       }


//     },

//     score: function () {
//       points +=1
//     },

//     displayScore : function (){

//       console.log(points)
//       this.context.font = '30px serif';
//       this.context.fillStyle = 'black';

//       this.context.fillText(`Score: ${points}`, 50, 50);
//     }
//   };
  