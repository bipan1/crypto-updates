# Crypto Portfolio Tracker

## Overview

Crypto Portfolio Tracker is a web application that provides real-time updates of cryptocurrency prices. It fetches data from the CoinGecko API and uses Apache Kafka for processing and broadcasting updates via WebSocket to a Next.js front-end.

## Features

- Real-time cryptocurrency price updates.
- Efficient and scalable data processing with Kafka.
- WebSocket communication for low-latency updates.
- Integration with CoinGecko API for reliable market data.

## Technologies

- Next.js
- TypeScript
- WebSocket
- Apache Kafka
- CoinGecko API

## Prerequisites

- Node.js (v14 or later)
- Apache Kafka (v3.9.0 or later)
- CoinGecko API Key (optional but recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bipan1/crypto-updates.git
cd crypto-updates
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Apache Kafka in KRaft Mode
Download and Extract Kafka
```bash
wget https://downloads.apache.org/kafka/3.9.0/kafka_2.13-3.9.0.tgz
```

Extract the downloaded tar file:
```bash
tar -xzf kafka_2.13-3.9.0.tgz
mv kafka_2.13-3.9.0 /home/kafka/
```
Configure KRaft Mode

Navigate to the Kafka config directory:

```bash
cd /home/kafka/kafka_2.13-3.9.0/config
```
Edit the server.properties file:
```bash
nano server.properties
```

Add the following configuration to the KRaft Mode:
```bash
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:9093
controller.listener.names=CONTROLLER
listeners=PLAINTEXT://:9092,CONTROLLER://:9093
log.dirs=/home/kafka/kafka_2.13-3.9.0/kraft-logs
metadata.log.dir=/home/kafka/kafka_2.13-3.9.0/kraft-metadata
controller.quorum.timeout.ms=5000
log.retention.hours=168
log.segment.bytes=1073741824
```


Format Storage Directories
Before starting Kafka, you need to format the storage directories:
```bash
kafka-storage.sh format -t $(uuidgen) -c /home/kafka/kafka_2.13-3.9.0/config/server.properties
```



#### Start Kafka

Start the Kafka server in KRaft mode:
```bash
kafka-server-start.sh /home/kafka/kafka_2.13-3.9.0/config/server.properties
```



### 4. Start WebSocket Server and Kafka Consumer
```bash
npm run start:ws
````



### 5. Start the next application
```bash
npm run dev
```


### 6. Access the application
Open your browser and navigate to http://localhost:3000 to view the real-time crypto portfolio tracker.
