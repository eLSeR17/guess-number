const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// describe("SimpleStorage", () => {})
describe("GuessNumber", function () {
  // let simpleStorageFactory
  // let simpleStorage
  let guessNumberFactory, guessNumber
  beforeEach(async function () {
    guessNumberFactory = await ethers.getContractFactory("GuessNumber")
    guessNumber = await guessNumberFactory.deploy()
  })

  it("Should start with guessed = false ", async function () {
    const guessedAtStart = await guessNumber.checkGuessed()
    const expectedValue = false
    // assert
    // expect
    assert.equal(guessedAtStart, expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should have 0 games at the beginning", async function () {
    const gamesAtStart = await guessNumber.gameNumber()
    const expectedValue = 0
    // assert
    // expect
    console.log(`Games in beginning ${gamesAtStart} and expect is ${expectedValue}`)
    assert.equal(gamesAtStart, expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Guessed should be true after trying number 14", async function () {
    const mySigner = await ethers.getSigner(1);
    await guessNumber.connect(mySigner).tryToGuess(14)
    const guessedAfter14 = await guessNumber.checkGuessed()
    const expectedValue = true
  
    assert.equal(guessedAfter14, expectedValue)
  
  })

  it("Should say error if owner plays", async function () {
    await expect(guessNumber.tryToGuess(14)).to.be.reverted
  })

  it("Should say error if tries to create game when not finished", async function () {
    await expect(guessNumber.createGame(5)).to.be.reverted
  })

  
})
