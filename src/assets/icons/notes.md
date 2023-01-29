app.on('ready', function () {
    const path = require("path");
    const fs = require("fs");
    const initPath = path.join(app.getPath('userData'), "init.json");

    console.log(`app name ${app.getName()}`); // 'electron-vite-react'

    //https://www.electronjs.org/docs/latest/api/app#appsetpathname-path
    console.log(`data path ${initPath}`); // C:\Users\maxzz\AppData\Roaming\electron-vite-react\init.json

    let data: any;
    try {
        data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
    }
    catch (e) {
    }

    // // Create the browser window.
    // win = new BrowserWindow((data && data.bounds) ? data.bounds : {width: 800, height: 600});
    // ...

    win.on("close", function () {
        console.log('win', win);
        const data = {
            bounds: win.getBounds()
        };
        fs.writeFileSync(initPath, JSON.stringify(data));
    });
    // ...
});
