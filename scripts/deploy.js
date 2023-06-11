// imports
const {ethers} = require("hardhat")

// async main
async function main() {
  const GuessNumberFactory = await ethers.getContractFactory("GuessNumber")
console.log("Deploying contract...")
const guessNumber = await GuessNumberFactory.deploy()
await guessNumber.deployed()
console.log("Deployed!")
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
