// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract GuessNumber is Ownable{
    
    address winner;
    address _owner;
    uint8 public i_secretNumber;
    uint private gameAmount;
    bool guessed = false;

    //Set the number to guess, the owner of the game, and the games that have been played so far.
    constructor(){
        i_secretNumber = 14;
        _owner = msg.sender;
        gameAmount = 0;
    }

    function tryToGuess(uint8 myNumber) public payable {
        require(!guessed, "Game not available");
        require(msg.sender != _owner, "Owner cannot play the game");
        (bool success_pay, ) = address(this).call{value: msg.value}("");
        if (myNumber == i_secretNumber) {
            guessed = true;
            winner = msg.sender;
            gameAmount++;
        }
        if(checkGuessed()){
            (bool success_receive, ) = winner.call{value: address(this).balance}("");
        }

    }

    function createGame(uint8 secretNumber) public onlyOwner {
        require(guessed, "Game in process");
        if(winner != _owner){
        winner = _owner;
        i_secretNumber = secretNumber;
        }
    }

    function checkGuessed() public view returns (bool) {
        return guessed;
    }

    function gameNumber() public view returns (uint){
        return gameAmount;
    }
}
