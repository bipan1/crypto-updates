const { Kafka } = require("kafkajs");
const { broadcast } = require("./websocket-server");

const kafka = new Kafka({
  clientId: "crypto-updates",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "crypto-updates" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "crypto-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      if (value) {
        broadcast(value);
        console.log(`Received and broadcasted message: ${value}`);
      }
    },
  });
}

runConsumer().catch(console.error);

module.exports = { runConsumer };
