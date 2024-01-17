import os
import time
import json
from faker import Faker
faker = Faker()
from random import randint
import logging
from confluent_kafka import Producer
from bson import BSON
import pymongo
from datetime import datetime, timezone
import random

logging.basicConfig(level=logging.DEBUG)

conf = {
    'bootstrap.servers': "pkc-p11xm.us-east-1.aws.confluent.cloud:9092",
    'client.id': "patient_devices",
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': '5OJUHEEORALOLBQB',
    'sasl.password': 'GlWs1Cfp/WkRFH3eEFu9uasX6BdeU6o/SRU6wnV2S25Dlyb9YwkQfbqRKJZYAJEB',
}
TOPIC = "telemetry-data-health"


def generate_reading(num):
    # readings = [None] * num
    readings = ""
    # for i in range(0, num):
        # readings[i] = {
    patients = ["efaf74f9-3de3-45dd-a5d5-26d08e8a3190", "aaa4c718-2f48-4c13-9ad0-d287cf280824",
                "a1851c06-804e-4f31-9d8f-388cd52d4ad0","48074b70-4db4-4ab0-b9e8-361bd2ba6216",
                "a4a67345-d7e5-4246-8e06-ed043a9764e2","90ab3acb-46b7-40d2-b66c-a04022cee236",
                "0bcc9845-c873-492e-96e1-9771ebcbc2df","0b763e21-2a8f-4f04-86d2-f7e8f9cebb21",
                "6590902c-4450-488c-8760-fa57d0b7422f","2ff59946-e6d0-492e-8704-a98296eedd4c"]
    readings = {
            # "metadata": { "sensorId": "Device-" + str(randint(1, 100000)), "type": "apple" },
            "metadata": { "sensorId": random.choice(patients), "type": "apple" },
            # "timestamp":faker.date(),
            "timestamp": str(datetime.utcnow()),
            "gps_location": { "type": "Point", "coordinates": [ float(faker.latitude()), float( faker.longitude())]},
            "hrate": randint(35, 125),
            "o2lvl":randint(20, 100),
            "bloodP": randint(60, 135)
        }
    logging.debug(f"readings objects generated")
    return readings

def produce_readings(producer, num, batch_size):
    iter = int(num/batch_size)
    for i in range(iter):
        data = generate_reading(batch_size)
        print(json.dumps(data))
        producer.produce(TOPIC, json.dumps(data), callback=delivery_callback)
        # producer.produce(TOPIC, BSON.encode(data), callback=delivery_callback)
        # # print(BSON.encode({"data":[{'a': 1}]}))
        producer.flush()

    logging.debug(f"objects produced")


def delivery_callback(err, msg):
    if err:
        logging.debug('ERROR: Message failed delivery: {}'.format(err))
    else:
        logging.debug("Produced event to topic")
        


if __name__ == "__main__":
    num = 20
    batch_size = 1
    producer = Producer(conf)
    while True:
        produce_readings(producer,num, batch_size)
        logging.debug("Gateway sleeping for 20 seconds...")
        time.sleep(20)

