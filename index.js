const fs = require("fs");
const csvToJson = require("convert-csv-to-json");

const convertCsvToTxt = (csvPath, filePath) => {
  const csvJson = csvToJson
    .supportQuotedField(true)
    .fieldDelimiter(",")
    .getJsonFromCsv(csvPath);

  //create a foreach loop to iterate through the array and delete the first element
  csvJson.forEach((element) => {
    delete element[""];
  });

  //convert json to txt file replace { with [ and } with ]
  const txt = JSON.stringify(csvJson)
    .replace(/{/g, "\n")
    .replace(/}/g, "\n")
    // .replace(/,/g, "\n")
    .replace(/"/g, "")
    .replace(/\[/g, "")
    .replace(/\]/g, "");

  console.log(csvJson);

  fs.writeFile(filePath, txt, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully\n");
    }
  });
};

convertCsvToTxt("./aws_parsed.csv", "./aws_parsed.txt");
