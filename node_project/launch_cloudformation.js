const AWS = require('aws-sdk');
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");
const bodyParser = require("body-parser"); // used bodyparser to get data from all the field in form
const awsCredentials = (require("./config/config")).getAWS_JSONCredentials();
AWS.config.update(awsCredentials);
// console.log(awsCredentials);
const cloudformation = new AWS.CloudFormation();
const templateString = JSON.stringify(require("./config/synergy_enviroment"));
// console.log(templateString);
// let stackName = "";
let mainbody = {
stackName: "",
createSTK: function (stackName) {
mainbody.stackName = stackName;
const params = {
StackName: mainbody.stackName, /* required */
EnableTerminationProtection: false,
OnFailure: "DO_NOTHING",
TemplateBody: (templateString),
};
console.log(params);
try {
// remove comments from below lines when used in producation enviroment. this lines can
cause charges.
cloudformation.createStack(params, function (err, data) {
if (err) console.log(err, err.stack); // an error occurred
else console.log(data); // successful response
});
} catch (e) {
console.log("Error : " + JSON.stringify(e));
}
},
getStackOutputs: function (callback) {
const params = {
StackName: 'AnnantVPC'//mainbody.stackName
};
try {
cloudformation.describeStacks(params, function (err, data) {
if (err) { // console.log(err, err.stack);
console.log("callback = null");
callback(null);
}
// an error occurred
else {
// noinspection UnnecessaryLocalVariableJS
let outputs = (data['Stacks'][0])['Outputs'];
callback(outputs);
} // successful response
});
} catch (e) {
console.log("Eroor in Describe" + JSON.stringify(e));
callback(null);
}
}
};
module.exports = mainbody;

{
"name": "synergy_web",
"version": "1.0.0",
"main": "app.js",
"scripts": {
“test": "echo \"Error: no test specified\" && exit 1"
},
"author": "annant",
"license": "ISC",
"dependencies": {
"aws-sdk": "^2.382.0",
"body-parser": "latest",
"ejs": "^2.6.1",
"express": "^4.16.4",
"jquery": "^3.3.1",
"node-cmd": "^3.0.0",
"popups": "^1.1.3",
"public-
