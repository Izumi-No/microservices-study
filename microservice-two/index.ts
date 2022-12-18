import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "two",
  brokers: ["0.0.0.0:9092"],
});

const consumer = kafka.consumer({ groupId: "consumer" });

consumer.connect().then();
consumer.subscribe({ topic: "test", fromBeginning: true }).then();

consumer
  .run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("TESTE", {
        message: message.value!.toString(),
      });
    },
  })
  .then();
