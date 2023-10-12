const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

let currentLog = '';
let currentDate = '';

const activityMonitor = () => {
    const isWindows = os.type() === 'Windows_NT';
    const commandWindows = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
    const commandUnixLike = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

    childProcess.exec(isWindows ? commandWindows : commandUnixLike, (error, stdout, stderr)=>{

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(stdout.trim());

        if (error !== null){
            console.log(error);
        }
        currentLog = stdout.toString();
        currentDate = Date.now();
    });
}

setInterval(activityMonitor, 100);
setInterval(()=>{
    if (currentLog.length !== 0){
        fs.appendFile('activityMonitor.log', `${currentDate} : ${currentLog}`, (err) => {
            if (err) throw err;
          })
    }
}, 60000);
