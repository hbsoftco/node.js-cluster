import bodyParser from "body-parser";
import express from "express";
import router from "./router.js";
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running!`);
  for (const cpu of os.cpus()) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} is running!`);
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/v1", router);

  const PORT = 3000;
  app.listen(PORT, () => {
    // console.log("Server is running!");
  });
}
