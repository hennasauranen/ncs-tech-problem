export interface IDevices {
  devices: IDevice[];
}

export interface IDevice {
  pointX: number;
  pointY: number;
}

export class Devices implements IDevices {
  public constructor(public devices: IDevice[] = []) {}
}
