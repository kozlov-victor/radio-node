const http = require('http');
const fs = require('fs');

const Gpio = require('onoff').Gpio;

const button = new Gpio(4, 'in', 'both');

button.watch((err, value) => {
    if (err) console.log(err);
    if (value===0) {
        halt();
    }
});

const PATH = '/home/pi/radio-node/';

let halted = false;
const halt = ()=>{
    halted = true;
    if (halted) return;
    const { spawn } = require('child_process');
    const child = spawn('sudo', ['halt']);
    console.log('halted');
};

const log = (msg)=>{
    console.log(msg);
    fs.writeFileSync(`${PATH}log.txt`,msg,'utf8');
};

const stations = [
    {
        name: 'UR-1',
        url: 'http://91.218.213.49:8000/ur1-mp3'
    },
    {
        name: 'NV',
        url: 'https://online-radio.nv.ua/radionv.mp3'
    },
    {
        name: 'JAM',
        url: 'https://cast.radiogroup.com.ua/jamfm'
    },
    {
        name: 'Krajina',
        url: 'http://live.radioec.com.ua:8000/kiev'
    }
];

let currentStationIndex = 0;


let player;

const runPlayer = ()=>{
    console.log(stations[currentStationIndex].url);
    const Omx = require('node-omxplayer',undefined,true,10);
    player = Omx(stations[currentStationIndex].url);
    player.volUp();
    log('player is running');
    player.on('error',(e)=>{
        log(e);
        log('next running scheduled');
        setTimeout(()=>{
            runPlayer();
        },1000);
    });
    player.on('close',(e)=>{
        log('closed');
        log(e);
        log('next running scheduled');
        setTimeout(()=>{
            runPlayer();
        },5000);
    });
}

const nextStation = ()=>{
    currentStationIndex++;
    currentStationIndex = currentStationIndex%stations.length;
    if (player) player.newSource(stations[currentStationIndex].url, undefined,true,10);
}

const port = 3000;
const requestHandler = async (request, response) => {
	switch (request.url) {
        case '/index.html' : {
            const file = fs.createReadStream(`${PATH}index.html`);
            file.pipe(response);
            break;
        }
        case '/nextStation': {
			nextStation();
            response.end(stations[currentStationIndex].name);
            break;
		}
        case '/halt': {
            halt();
            break;
        }
		default:
            response.end('404');
	}
}
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        return log('something bad happened', err);
    } else {
        runPlayer();
    }
    log(`server is listening on ${port}`);
});



