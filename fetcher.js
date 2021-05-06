const args = process.argv.slice(2)
const request = require("request");
const fs = require("fs")

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(args[1])
request(args[0], (error, response, body) => {
  if (error) {
    console.log("Sorry could not get your data, please check your address")
  } else if (response.statusCode !== 200) {
    console.log("Could not get the Data, Try Again")
  } else if (response) {
    let data = response.toJSON();
    fs.access(args[1], (err) => {
      if (err) {
        fs.writeFile(args[1], response.body, (err) => {
          if (err) {
            console.log("Error!!")
          } else {
            console.log("The file has been saved");
          }
        })
      } else {
        rl.question("File already Exists!, Type Y/N if you want to overwrite!", (answer) => {
          if (answer === "Y" || answer === "y") {
            console.log
            fs.writeFile(args[1], response.body, (err) => {
              if (err) {
                console.log("Error!!")
              } else {
                console.log("The file has been saved");
              }
            })
            setTimeout(() => {
              rl.close()
            }, 1000);
          } else {
            console.log("thank you for using the program");
            rl.close()
          }
        })
      }
    })
  }
})
