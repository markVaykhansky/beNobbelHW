import * as express from "express";
import * as cors from "cors";

import { ClassNameGenerator } from "./BL/class-names-generator.mjs";
import { ClassNameClient } from "./class-name-client/class-name-client.mjs";

const app = express.default();
app.use(cors.default());

const classNameGenerator = new ClassNameGenerator();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function isPositiveAndWholeNumber(str) {
    if(!isNumeric(str)) 
        return false;

    const number = Number(str);
    return number % 1 === 0 && number > 0;
}

app.get("/classnames", async (request, response) => {
    console.log('Classnames request received');

    const classNamesAmountString = request.query.amount;

    if(!classNamesAmountString || !isPositiveAndWholeNumber(classNamesAmountString)) {
        return response.json({ Error: 'Amount must be a valid number'});
    }

    const classNamesAmount = Number(classNamesAmountString); 
    const classNames =  await classNameGenerator.generateClassNames(classNamesAmount);
    return response.json(classNames);
})


const port = 8000;

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
