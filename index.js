const http = require('http');
const xml2js = require('xml2js');
const commands = require('./commands');

function AvApi() {
    this.config = {
        setHost: host => avCtrl.config.host = host,
        setPort: port => avCtrl.config.port = port,
    };

    this.getStatus = () => {
        return avCtrl.getStatus();
    };
    
    this.setVolume = vol => {
        avCtrl.setVolume(vol);
    };

    this.setVolumeUp = () => {
        avCtrl.setVolumeStep('Up');
    };

    this.setVolumeDown = () => {
        avCtrl.setVolumeStep('Down');
    };

    this.powerOff = () => {
        avCtrl.setPower('Standby');
    };

    this.powerOn = () => {
        avCtrl.setPower('On');
    };
}

const avCtrl = {
    config: {
        host: '192.168.220.24',
        port: '80',
        path: '/YamahaRemoteControl/ctrl'
    },

    buildCmd: (cmdName, value) => {
        if(!value || !commands.hasOwnProperty(cmdName)) {
            console.error('Command', cmdName, 'not found');
            return undefined;
        }

        const cmd = commands[cmdName].replace('%' + cmdName + '%', value);
        return commands._base.replace('%cmd%', cmd);
    },

    getStatus: () => {
        return avCtrl.send(commands.status).then(
            res => res.yamaha_av.main_zone[0].basic_status[0],
            console.error);
    },

    setVolume: vol => {
        avCtrl.send(
            avCtrl.buildCmd('vol', vol)
        );
    },

    setVolumeStep: step => {
        avCtrl.send(
            avCtrl.buildCmd('volStep', step)
        ).then(console.log, console.error);
    },

    setPower: power => {
        avCtrl.send(
            avCtrl.buildCmd('power', power)
        ).then(console.log, console.error);
    },

    send: cmd => {
        return new Promise((resolve, reject) => {
            const reqOptions = Object.assign(avCtrl.config,{ 
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml; charset=UTF-8',
                    'Content-Length': cmd.length
                }
            });

            const request = http.request(reqOptions, res => {
                res.setEncoding('utf8');
                res.on('data', result => {
                    xml2js.parseString(result.toLowerCase(), (err, res) => resolve(res));
                });
            });

            request.on('error', reject);

            request.write(cmd);
            request.end();
        });
    }
};

module.exports = AvApi;
