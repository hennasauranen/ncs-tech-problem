import { NowRequest, NowResponse } from "@vercel/node";
import { Devices } from "./device";
import { Linkstations } from "./linkstation";
import * as devicejson from "./devices.json";
import * as linkstationjson from "./linkstations.json";

export default (req: NowRequest, res: NowResponse) => {
  return res.json(generateResponse());
};

const generateResponse = (): string[] => {
  const devices: Devices = devicejson;
  const linkstations: Linkstations = linkstationjson;
  let messages: string[] = [];

  //loop through devices and linkstations to compare values
  devices.devices.forEach((device) => {
    let message: string = "";
    let power: number = 0;
    linkstations.linkstations.forEach((linkstation) => {
      //calculate distance with pythagorean theorem
      let distance: number = calculateDistance(
        device.pointX,
        device.pointY,
        linkstation.pointX,
        linkstation.pointY
      );
      //calculate linkstations power
      let calculatedPower: number = calculatePower(linkstation.reach, distance);
      //if calculated power is bigger than power value before
      if (calculatedPower > power) {
        power = calculatedPower;
        //generate successful case msg
        message = generateMessage(
          device.pointX,
          device.pointY,
          linkstation.pointX,
          linkstation.pointY,
          power
        );
      }
    });
    //when all linkstations are looped check if there is msg
    if (message) {
      messages.push(message);
    } else {
      //if not generate msg for unsuccessful case
      message = generateMessage(device.pointX, device.pointY);
      messages.push(message);
    }
  });
  return messages;
};

const generateMessage = (
  deviceX: number,
  deviceY: number,
  linkstationX?: number,
  linkstationY?: number,
  power?: number
) => {
  if (power) {
    return `Best link station for point ${deviceX},${deviceY} is ${linkstationX},${linkstationY} with power ${power}`;
  } else {
    return `No link station within reach for point ${deviceX},${deviceY}`;
  }
};

const calculatePower = (reach: number, distance: number): number => {
  if (distance > reach) {
    return 0;
  } else {
    return Math.pow(reach - distance, 2);
  }
};

const calculateDistance = (
  deviceX: number,
  deviceY: number,
  linkstationX: number,
  linkstationY: number
): number => {
  let side: number = linkstationX - deviceX;
  let otherSide: number = linkstationY - deviceY;
  return Math.sqrt(side * side + otherSide * otherSide);
};
