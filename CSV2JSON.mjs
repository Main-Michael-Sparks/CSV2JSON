import fs from "fs";

export default function csv2Json(csvFilePath = "", csvColPath = "", rowKeyIndex=0, newFileName="test") {

    // import the csv file, and the file colNames to convert.
    const csvFile = fs.readFileSync(csvFilePath);
    const cvsColName = fs.readFileSync(csvColPath);

    // split the CSV file into an array. 
    const csvArr = csvFile.toString().split("\n").join().split(",")

    // split the CSV colName into an array.
    const colArr = cvsColName.toString().split(",");

    // create objects to store the converted data.
    const nestObj = {};
    const jsonObj = {};

    // loop through the array(s) and build the object to convert
    for(let [i,j,k,l] = [0,0,rowKeyIndex,colArr.length - 1]; i < csvArr.length; i++, j++){

        // ColName Counter: reset j to the start of col name array. 
        if (j === colArr.length){
            j = 0;
        };

        // Store each CSV row into an object with colName:value
        nestObj[colArr[j]] = csvArr[i];

        // counter K (the index/name of the primary object): Every nth i iterations, iterate k & l once
        // counter L: syncs counter i, counter k; counter l skips the required number of array elements to select the same element for keyname assignment. 
        // sync the counters, pull an param defined unique key to store all of the nest objects under. 
        if(i === l) {
            jsonObj[csvArr[k]] = {...nestObj};
            l += colArr.length;
            k += colArr.length;
        };
    };

    // write the object to disk and convert it to json. 
    fs.writeFile(`${newFileName}.json`,JSON.stringify(jsonObj),(err)=>{
        if(err) {
            throw err;
        }
    });
    console.log("CSV file sucessfully converted!")
    return "CSV file sucessfully converted!"
};

//console.log(csv2Json("PathTo.csv","pathToCol.csv",6,"runtest"))




