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
    readings = {
            "metadata": { "sensorId": "Device-" + str(randint(1, 100000)), "type": "apple" },
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
    num = 10
    batch_size = 1
    producer = Producer(conf)
    produce_readings(producer,num, batch_size)

