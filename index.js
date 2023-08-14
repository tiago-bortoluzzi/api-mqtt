const aedes = require('aedes')()
const mqtt = require('mqtt')
const fs = require('fs')
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
//const server = require('net').createServer(aedes.handle)
const port = process.env.PORT || 3000

/*
// LOCAL SERVER
server.listen(port, function () {
  console.log('MQTT Server started and listening on port ', port)
})
*/
ws.createServer({ server: httpServer }, aedes.handle)
httpServer.listen(port, function () {
  console.log('websocket server listening on port ', port)
})

// LOCAL CLIENT
const broker = 'https://localhost:' + port
const options = {
  keepalive: 60,
  clientId: 'test',
  protocolId: 'WS',
  protocolVersion: 4,
  clean: true
}
const localClient = mqtt.connect(broker, options) //, options);
localClient.on('connect', () => {
    console.log('Local client connected to local server')
})
/*
// MINDCONNECT CLIENT
const mcBroker = 'mqtts://mindconnectmqtt.eu1.mindsphere.io'
const clientId = 'debr2_test'

const options = {
    key: fs.readFileSync('certs/debr2_test.key'),
    cert: fs.readFileSync('certs/debr2_test.pem'),
    ca: [ fs.readFileSync('certs/MindSphereRootCA1.pem') ],
    clientId
}

const mcClient = mqtt.connect(mcBroker, options);
const commandingTopic = "tc/debr2/debr2_test/i/cmd_v3/c";
	
mcClient.on("connect", () => {
		console.log('Connected to MindConnect MQTT')
		mcClient.subscribe(commandingTopic, { qos: 1 }, (err) => {
			if (err) {
			  console.error('Error subscribing:', err);
			} else {
			  console.log('Subscribed to topic:', commandingTopic);
			}
		});
	})
	
mcClient.on('message', (topic, message) => {
		console.log('Message received')
		console.log(message.toString(), topic.toString());
        localClient.publish('t/agent', message.toString())
	})
	
mcClient.on('error', (error) => {
		console.log(error)
	})
*/
