const http = require('http');
const fs = require('fs');

const window = false;

if (!window) {
    const Gpio = require('onoff').Gpio;

    const button = new Gpio(4, 'in', 'both');

    button.watch((err, value) => {
        if (err) console.log(err);
        if (value===0) {
            halt();
        }
    });
}



const PATH =
    window?'':'/home/pi/radio-node/';

let halted = false;
const halt = ()=>{
    if (halted) return;
    const { spawn } = require('child_process');
    const child = spawn('sudo', ['halt']);
    console.log('halted');
    halted = true;
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
       name: 'Maria',
       url: 'http://91.203.4.121:8000/stream64',
    },
    // {
    //     name: 'NV',
    //     url: 'https://online-radio.nv.ua/radionv.mp3'
    // },
    // {
    //     name: 'JAM',
    //     url: 'https://cast.radiogroup.com.ua/jamfm'
    // },
    // {
    //     name: 'Krajina',
    //     url: 'http://live.radioec.com.ua:8000/kiev'
    // }
];

let currentStationIndex = 0;


let player;
let lastId = 0;

const onError = e=>{
    log(e);
    log('error, next running scheduled');
    setTimeout(()=>{
        runPlayer();
    },1000);
};

const onClosed = e=>{
    log('closed');
    log('closed, next running scheduled');
    setTimeout(()=>{
        runPlayer();
    },5000);
};

const runPlayer = ()=>{
    if (player) {
        if (player.running) {
            log('next running cancelled');
            return;
        }
        log('listener removed');
    }
    const Omx = require('node-omxplayer',undefined,true,10);
    player = Omx(stations[currentStationIndex].url);
    player.volUp();
    log('player is running');
    player.once('error',onError);
    player.once('close',onClosed);
}

const nextStation = ()=>{
    if (!player.running) return;
    currentStationIndex++;
    currentStationIndex = currentStationIndex%stations.length;
    if (player) {
        player.newSource(stations[currentStationIndex].url, undefined,true,10);
    }
}

const port = 3000;
const requestHandler = async (request, response) => {
	switch (request.url) {
        case '/index.html' : {
            const file = fs.createReadStream(`${PATH}index.html`);
            file.pipe(response);
            break;
        }
        case '/currentStation': {
            response.end(stations[currentStationIndex].name);
            break;
        }
        case '/nextStation': {
			nextStation();
            response.end(stations[currentStationIndex].name);
            break;
		}
        case '/halt': {
            setTimeout(()=>{
                halt();
            },1);
            break;
        }
        case '/exit': {
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
        if (!window) runPlayer();
    }
    log(`server is listening on ${port}`);
});



