import express from "express";
import { config } from "./config.js";
import {
  ListObjectsV2Command,
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const app = express();
const port = 3000;
const router = express.Router();

const s3Client = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

const input = {
  Bucket: "developer-task",
  Prefix: "a-wing",
};

const getImage = async () => {
  const command = new GetObjectCommand({
    Bucket: input.Bucket,
    Key: "a-wing/CYTVFAFT8vA.jpg",
  });
  const data = await s3Client.send(command);
  return data;
};

router.get("/getElems", async (req, res, next) => {
  const command = new ListObjectsV2Command(input);
  const response = await s3Client.send(command);
  console.log(response);
  res.send(response);
});

router.post("/putObject", async (req, res, next) => {
  const command = new PutObjectCommand({
    Bucket: "developer-task",
    Prefix: "a-wing",
    Key: "file-to-uploadl.txt",
    Body: "blabla",
  });
  const response = await s3Client.send(command);
  console.log(response);
  res.send(response);
});

app.use(router);

app.listen(port, () => {
  console.log("server is running");
});
