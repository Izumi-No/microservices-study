import { Kafka } from "kafkajs";
import { Request, Response } from "express";
import app from "./src/express";

const PORT = 6969;

const kafka = new Kafka({
  clientId: "one",
  brokers: ["0.0.0.0:9092"],
});

const producer = kafka.producer();

producer.connect().then();
app.get("/:message", async (req: Request, res: Response) => {
  await producer
    .send({
      topic: "test",
      messages: [{ value: req.params["message"] }],
    })
    .then();
  return res.send(req.params["message"]);
});

app.listen(PORT);
