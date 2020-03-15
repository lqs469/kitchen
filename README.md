# kitchen


Demo: [http://104.129.183.182](http://104.129.183.182)

This application was built based on my handmade full-stack application boilerplate that includes two open-source projects: `Midway.js` and `Creat-React-App`. The server side uses `Midway.js` that a framework based on `koa.js`, the client-side is a standardized React app ejected by `Creat-React-app`.

Client SPA(Single Page Application) will connect with the server through the web socket. It will create a connection once the user opened the page, the Server-side will push the message to the client and display to the user on the dashboard constantly until the order message runs out. At meanwhile, the Client also could post the data to the server, it will modify order data if demand.

About libraries, I didn't choose any redundant libraries, I used the `Antd` to improve UI and interactive, it will bring nice user experience like I always do. The `moment.js` decorates the display of time and date. And `mapbox-gl` draws the Map component with the origin and destination of the order.

I also write the unit test for the server-side and client-side, The server-side test can be run through script `npm run test` and client-side ut could be triggered by `npm run test:client`.

You can run the application in production mode through `npm run start`, It will run on Node.js `cluster module`. In short, A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, It works as the `Master-Worker Pattern`. In the code, It takes `egg-cluster` to create a Master process, which you can rely on to secure the application instead of daemon manager like `pm2`. And the command `npm run stop` will kill the master process which will handler and notice worker and agent to gracefully exit. 

Of course, you should build the client code before running it on production by `npm run build`.

Node.js(>= 8.0.0) is required so that you should make sure it is pre-installed in the runtime environment.

Thank you for spending your time to read, This project repo will be uploaded to [https://github.com/lqs469/kitchen](https://github.com/lqs469/kitchen). Any question please feel free to connect with me on `liqinshuo469@gmail.com`.

---

### QuickStart

```bash
$ npm install
$ npm run dev
$ open http://localhost:7001/
```

**Notice**: if `npm install` throw an error that shows `postinstall: cannot run in wd xxxx@xxx`. try `npm install --unsafe-perm`.

### Deploy

```bash
$ npm run build
$ npm run start
$ npm run stop
```

### npm scripts

| `npm <script>` | Description                                             |
|----------------|---------------------------------------------------------|
| `dev`          | run local dev mode in `localhost:7001`                  |
| `start`        | run production mode with a new node.js process          |
| `stop`         | stop the node.js process that created by script `start` |
| `test`         | `lint`, then run unit test, includes client and server  |
| `build`        | build the client and server code                        |
| `lint`         | `lint`                                                  |

## Project Structure

```
src
├── app                      # Server ( MidwayTS )
│   ├── controller           # Server Controller
│   └── public               # server public
├── config                   # Server Config
├── service                  # Server Service
│   ...
client/index                 # Client ( Create-React-app )
    ├── build                # Client build dist files
    ├── public               # Client public
    └── src                  # Client React src
    ...
```

