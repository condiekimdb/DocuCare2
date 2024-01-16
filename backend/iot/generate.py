import os
import time
import json
from faker import Faker
faker = Faker()
from random import randint
import logging

logging.basicConfig(level=logging.INFO)

def generate_reading(num):
    readings = [None] * num
    for i in range(0, num):
        print(f'Object {i+1} generated')
        readings[i] = {
            "deviceId": "Device-" + str(randint(1, 100000)),
            "gps_location": { "type": "Point", "coordinates": [ faker.latitude(), faker.longitude() ] },
            "timestamp":faker.date(),
            "hrate":randint(35, 125),
            "o2lvl":randint(20, 100),
            "bloodP": randint(60, 135)
        }
    logging.debug(f"readings objects generated")
    return readings


if __name__ == "__main__":
    print(generate_reading(1))
    # while True:
    #     producer.produce(topic, data, callback=delivery_callback)
    #     print("Telemetry data sent")
    #     os.system(cmd)
    #     time.sleep(1)
