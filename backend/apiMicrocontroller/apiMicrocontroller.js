const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const mongo = require(__dirname + '/../mongo');
const variable = require(__dirname + '/../variable/variable');
const process = require(__dirname + '/../process');
const sendMongo = new process();

mongo.then(function(client) {
    data(client);
});

function data(client) {
    router.post('/updateMonitoring', (req, res) => {
        const dataMonitor = variable.dataMonitoring;

        dataMonitor.username = req.body.username;
        dataMonitor.suhu = req.body.suhu;
        dataMonitor.airQuality = req.body.airQuality;
        dataMonitor.humidity = req.body.humidity;
        dataMonitor.lvlPakan = req.body.lvlPakan;
        dataMonitor.lvlMinum = req.body.lvlMinum;
        dataMonitor.status = req.body.status;
        dataMonitor.updatedAt = new Date();

        console.log(req.body);

        sendMongo
            .insertOne(client, 'data_monitoring', dataMonitor)
            .then(respInsert => {
                // console.log('success',dataMonitor);
                res.send('SUCCESS');
            });
    });

    router.post('/getDataStatus', (req, res) => {
        console.log('asdasdasd', req.body.username);
        sendMongo
            .checkOne(
                client,
                'status_monitoring',
                'username',
                req.body.username,
            )
            .then(respCheck => {
                const dataRes = respCheck.startDate.substring(0,10)+"_"+respCheck.endDate.substring(0,10)+" "+respCheck.startHour+"_"+respCheck.endHour+"_"+respCheck.statusMonitoring;
                // console.log('update');
                res.send(dataRes);
            });
    });

    router.post('/setMonitoring', (req, res) => {
        var statusMonitor = variable.statusMonitoring;

        statusMonitor.username = req.body.usernmae;
        statusMonitor.updatedAt = new Date();
        statusMonitor.statusMonitoringNow = '60';
        console.log(statusMonitor);
        // sendMongo.insertOne(client, 'status_monitoring')
    });

    router.post('/updateBoard', (req, res) => {
        // ssid
        // pwd
        // usernmae

        sendMongo
            .updateOne(
                client,
                'users',
                req.body.username,
                'ssid',
                req.body.ssid,
            )
            .then(responSSID => {
                sendMongo
                    .updateOne(
                        client,
                        'users',
                        req.body.username,
                        'pwd',
                        req.body.pwd,
                    )
                    .then(respPWD => {
                        console.log(req.body);
                        return res.send('BOARD_UPDATED');
                    });
            });
    });
}

module.exports = router;
