import cron from 'node-cron';
import axios from 'axios';
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv'; 

dotenv.config();

const kafka = new Kafka({
  clientId: 'crypto-updates',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export const startScheduler = async () => {
  await producer.connect();

  cron.schedule('*/1 * * * *', async () => {
    try {

      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: { ids: 'bitcoin,ethereum', vs_currencies: 'usd' },
      });

      await producer.send({
        topic: 'crypto-updates',
        messages: [{ value: JSON.stringify(response.data) }],
      });

      console.log('Data fetched and sent to Kafka');
    } catch (error) {
      console.error('Error fetching and sending data', error);
    }
  });
};

