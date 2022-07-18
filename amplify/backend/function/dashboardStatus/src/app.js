/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const {
  planEnterprise,
  planMidmarket,
  firstResponse,
  vmsActivity,
  openVms,
  onAgents,
  incomingChats,
  dudaStatus,
  ecwidStatus,
} = require("./tickets_info.js")
const { supportAgents, ticketSolved } = require("./scores.js")
const { sort_by } = require("./sort.js")

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/channel-status', async function(req, res) {
  // Add your code here
  // res.json({success: 'get call succeed channel-status updated!', url: req.url});
  try {
    const plan_enterprise = await planEnterprise();
    const plan_midmarket = await planMidmarket();
    const plan_firstresponse = await firstResponse();
    const online_agents = await onAgents();
    const incoming_chats = await incomingChats();
    const open_vms = await openVms();
    const vms_activity = await vmsActivity();
    const duda_status = await dudaStatus();
    const ecwid_status = await ecwidStatus();
    const ticket_data = [
      {
        first_response: plan_firstresponse,
        mid_market: plan_midmarket,
        enterprise: plan_enterprise,
        voicemails: open_vms,
        agents_online: vms_activity.agents_online,
        calls_waiting: vms_activity.calls_waiting,
        callbacks_waiting: vms_activity.callbacks_waiting,
        active_agents: online_agents,
        incoming_chats: incoming_chats.incoming_chats,
        active_chats: incoming_chats.active_chats,
        duda_status: duda_status,
        ecwid_status: ecwid_status,
      },
    ];
    res.send(ticket_data);
  } catch (error) {
    console.error("Error Displaying data: ", error);
    res.status(400).json({ message: error });
  }
});

app.get('/channel-status/scores', async function(req, res) {
  // Add your code here
  try {
    const support_agents = await supportAgents();
    const ticket_solved = await ticketSolved(support_agents);
    res.send(ticket_solved.sort(
      sort_by("tickets_solved", true, parseInt)
    ));
  } catch (error) {
    console.error("Error Displaying data: ", error);
    res.status(400).json({ message: error });
  }
});

app.get('/channel-status/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/channel-status', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/channel-status/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/channel-status', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/channel-status/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/channel-status', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/channel-status/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
