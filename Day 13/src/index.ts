import assert from "node:assert";
import crypto from "node:crypto";
import { readFile } from "node:fs";
import { promisify } from "node:util";
import async_hooks from "node:async_hooks";
import { Readable, Transform, pipeline } from "node:stream";
import dns from "node:dns";
import { URL } from "node:url";
import querystring from "node:querystring";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { performance } from "node:perf_hooks";
import dgram from "node:dgram";
import { AsyncLocalStorage } from "node:async_hooks";
import zlib from "node:zlib";
import { pipe } from "zod";
import { fileURLToPath } from "url";

function add(a: number, b: number) {
  return a + b;
}

assert.strictEqual(add(2, 3), 5);

console.log("Assertion passed");

// buffer handle binary data
const buf = Buffer.from("Hello");
console.log(buf.toString());
console.log(buf.toJSON());

// crypto hashing
const hash = crypto.createHash("sha256").update("secret").digest("hex");
console.log("SHA256: ", hash);

// aes encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted =
  cipher.update("hello world", "utf8", "hex") + cipher.final("hex");
console.log("Encrypted: ", encrypted);

// util.promisify
const readFileAsync = promisify(readFile);
readFileAsync("package.json", "utf8").then(console.log);

// async hooks - trace async operations
// async_hooks
//   .createHook({
//     init(asyncId, type) {
//       console.log(`Init: ${type} (${asyncId})`);
//     },
//   })
//   .enable();

// setTimeout(() => console.log("Timer triggered"), 100);

// timers - simple interval
let count = 0;
const id = setInterval(() => {
  console.log("Tick: ", ++count);
  if (count == 3) clearInterval(id);
}, 500);

const readable = Readable.from(["Node", "Streams", "Rocks"]);
readable.on("data", (chunk) => console.log(chunk.toString()));

process.stdout.on("error", (err) => {
  if (err.code === "EPIPE" || err.code == "ENOENT") {
    // Exit gracefully without a stack trace
    process.exit(0);
  }
});

const upper = new Transform({
  transform(chunk, _, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

async function runPipeline() {
  try {
    await promisify(pipeline)(
      Readable.from(["hello", "world"]),
      upper,
      process.stdout
    );
  } catch (error) {
    console.log("Pipeline failed: ", error);
  }
}
runPipeline();

// web streams API
const rs = new ReadableStream({
  start(controller) {
    controller.enqueue("Stream Hello");
    controller.enqueue("sim simm....");
    controller.close();
  },
});
const reader = rs.getReader();
// console.log(await reader.read())
// console.log(await reader.read())
// console.log(await reader.read())
let flag = true;
while (flag) {
  const obj = await reader.read();
  if (obj.done) {
    break;
  }
  console.log(obj.value);
}

// dns lookup
dns.lookup("nodejs.org", (err, address) => console.log("IP: ", address));

const myURL = new URL("https://example.com:8000/test?x=1#hash");
console.log(
  myURL.hostname,
  myURL.port,
  myURL.pathname,
  myURL.host,
  myURL.protocol,
  myURL.href,
  myURL.username,
  myURL.password
);

const q = querystring.stringify({ name: "Himanshu", age: 23 });
console.log(q);
const urlPart = "hello%20world";
console.log(querystring.unescape(urlPart));

fs.writeFileSync("hello.txt", "Hello FS!");
console.log(fs.readFileSync("hello.txt"));

console.log(path.join("/usr", "local", "bin"));
console.log(path.extname("file.txt"));

console.log("Platform:", os.platform());
console.log("CPUs:", os.cpus().length);

// const start = performance.now();
// for(let i=0;i<1e6;i++)
// {
//     console.log("Time: ",performance.now() - start , "ms");
// }

// const server = dgram.createSocket("udp4");
// server.on("message" , msg=>
// {
//     console.log("Received: ", msg.toString());
//     server.bind(41234, ()=>
//     {
//         const client = dgram.createSocket("udp4");
//         client.send("Ping" ,41234 , "localhost");
//     })
// }
// )

const storage = new AsyncLocalStorage();
storage.run({ id: 1 }, () => {
  console.log("Context:", storage.getStore());
});

class UppercaseTransform extends Transform {
  _transform(
    chunk: any,
    _encoding: BufferEncoding,
    callback: (err?: Error | null, data?: any) => void
  ) {
    try {
      const out = chunk.toString().toUpperCase();
      callback(null, out);
    } catch (err) {
      callback(err as Error);
    }
  }
}

let s = performance.now();
const pump = promisify(pipeline);
const filePath = path.resolve("Day 13/src/meta.txt");
await pump(
  fs.createReadStream(filePath),
  new UppercaseTransform(),
  fs.createWriteStream("meta.UPPER.txt")
);
console.log("Time taken is: ", performance.now() - s);
