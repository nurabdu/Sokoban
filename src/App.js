import React, { Component } from 'react';
import './App.css';

// import  { Login}   from "./components/login/Login";

export default class App extends Component {

  state = {
    gameBlocks: [
      [{wall: false}, {wall: false}, {wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: false}],
      [{wall: true}, {wall: true}, {wall: true}, {wall: false}, {wall: false}, {wall: false}, {wall: true}, {wall: false}],
      [{wall: true}, {wall: false, point: true}, {wall: false, player: true}, {wall: false, box: true}, {wall: false}, {wall: false}, {wall: true}, {wall: false}],
      [{wall: true}, {wall: true}, {wall: true}, {wall: false}, {wall: false, box: true}, {wall: false, point: true}, {wall: true}, {wall: false}],
      [{wall: true}, {wall: false, point: true}, {wall: true}, {wall: true}, {wall: false, box: true}, {wall: false}, {wall: true}, {wall: false}],
      [{wall: true}, {wall: false}, {wall: true}, {wall: false}, {wall: false, point: true}, {wall: false}, {wall: true}, {wall: true}],
      [{wall: true}, {wall: false, box: true}, {wall: false}, {wall: false, box: true, point: true}, {wall: false, box: true}, {wall: false, box: true}, {wall: false, point: true}, {wall: true}],
      [{wall: true}, {wall: false}, {wall: false}, {wall: false}, {wall: false, point: true}, {wall: false}, {wall: false}, {wall: true}],
      [{wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: true}, {wall: true}],
    ],
    score: 0,
    gameFinished: false
  };


  movePlayer = (event) => {

    let { gameBlocks, score, gameFinished } = this.state;
    
 
    let playerIndex = null;
    let stop = false;
    let pressedButton = event.key.toLocaleLowerCase();
    let checkButton = ['a', 'w', 's', 'd']

    if(!checkButton.includes(pressedButton)) return alert('press W, A, S, D');

    function move(direction) {
      if(gameFinished === false) {
        if(direction === 'left') {
          gameBlocks.map((blocks, i) => blocks.map((block, index) => {
            if(block.player && !blocks[index-1].wall && !blocks[index-1].box ) {
              block.player = false;
              blocks[index-1].player = true;
              
            }
            if(block.player && blocks[index-1].box && !blocks[index-2].wall && !stop  && !blocks[index-2].box) {
              block.player = false;
              blocks[index-1].box = false;
              blocks[index-2].box = true;
              blocks[index-1].player = true;   
              stop = true;        
           }
          } ))
        }
        if(direction === 'right') {
          gameBlocks.map((blocks, i) => blocks.map((block, index) => {
            if(block.player && !stop && !blocks[index+1].wall && !blocks[index+1].box) {
              block.player = false;
              blocks[index+1].player = true;
              stop = true
              
            }
            if(block.player && blocks[index+1].box && !blocks[index+2].wall && !stop && !blocks[index+2].box) {
              block.player = false;
              blocks[index+1].box = false;
              blocks[index+2].box = true;
              blocks[index+1].player = true;   
              stop = true;        
           }
          } ))
        }
        if(direction === 'top') {
          gameBlocks.map((blocks, i) => blocks.map((block, index) => {
            if(block.player && !gameBlocks[i-1][index].wall && !gameBlocks[i-1][index].box) {
              block.player = false;
              gameBlocks[i-1][index].player = true;
              
            }
            if(block.player && gameBlocks[i-1][index].box && !gameBlocks[i-2][index].wall && !stop && !gameBlocks[i-2][index].box) {
              block.player = false;
              gameBlocks[i-1][index].box = false;
              gameBlocks[i-2][index].box = true;
              gameBlocks[i-1][index].player = true;   
              stop = true;        
           }
          } ))
        }
        if(direction === 'bottom') {
          gameBlocks.map((blocks, i) => blocks.map((block, index) => {
            if(block.player && !stop && !gameBlocks[i+1][index].wall && !gameBlocks[i+1][index].box) {
              block.player = false;
              gameBlocks[i+1][index].player = true;
              stop = true;
              
              
            }
            if(block.player && gameBlocks[i+1][index].box && !gameBlocks[i+2][index].wall && !stop && !gameBlocks[i+2][index].box) {
              block.player = false;
              gameBlocks[i+1][index].box = false;
              gameBlocks[i+2][index].box = true;
              gameBlocks[i+1][index].player = true;   
              stop = true;        
           }
          } ))
        }
      
    }

  }

    gameBlocks.map((blocks, i) => blocks.map((block, index) => {
      if(block.player) {
        console.log(i);
        console.log(index);
      }
    } ))
    // UP
    if(pressedButton === 'w') {
        move('top');
        !gameFinished && this.setState({
          score: score+1
        })
    }
    // DOWN
    if(pressedButton === 's') {
        move('bottom');
        !gameFinished && this.setState({
          score: score+1
        })
    }
    // LEFT
    if(pressedButton === 'a') {
        move('left');
        !gameFinished && this.setState({
          score: score+1
        })
    }
    // RIGHT
    if(pressedButton === 'd') {
        move('right');
        !gameFinished && this.setState({
          score: score+1
        })
    }

    this.setState({
        gameBlocks: gameBlocks
    })

    let isOver = 0;

    gameBlocks.map(
      blocks => {
        blocks.map(
          block =>
          {
            if (block.point) {
              (block.box && block.point) ?  isOver = isOver+1 : isOver = isOver;
            }

          })
        }
      )

      if(isOver === 7) {
        this.setState({
          gameFinished: true
        })        
      }
  }

  

  componentDidMount() {
    window.addEventListener("keypress", this.movePlayer, false);
  }


  render() {
      let { gameBlocks, gameFinished } = this.state;

      return(
          <div className='game'>
          {
            !gameFinished &&
              <h2>Score: {this.state.score}</h2>
          
          }
           
            {  !gameFinished &&
            
            
              gameBlocks.map(
                (blocks, i) =>
                <div key={i} className="row">
                    {
                      blocks.map(
                        (block, index) => {
                          return (
                          <div
                            key={index}
                            className={`cell${block.box ? ' box' : ''}${block.wall ? ' wall' : ''}${block.player ? ' player' : ''}${block.point ? ' point' : ''}`}
                            />
                          )
                        }
                      )
                    }
                    
                </div>)
            }
            
            { gameFinished && 
              <div className="win">
                <img src="./images/you-win.jpg"/>
                <h1 className="a">You Win!</h1>
                <h1 className="b">SCORE: {this.state.score}</h1>
              </div>
            }     
          </div>
      );
    }
  }