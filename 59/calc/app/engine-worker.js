// The installed app's entry to ../calc-engine-worker.js. A browser asks the service worker for a
// worker's script only if that URL is in its scope, and the same goes for
// everything the worker then loads: from outside app/, the product could
// not start offline. An embedded component starts the worker directly.
self.CALC_ROOT = "../";
importScripts("../calc-engine-worker.js");
