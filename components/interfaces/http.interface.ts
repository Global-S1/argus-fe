export interface IHttpBase {
  success: boolean;
  statusCode: number;
  timeLapse: ITimeStamp;
  kindMessage: string;
}

export interface IHttpData<T> extends IHttpBase {
  data: T;
}

interface ITimeStamp {
  started: string;
  ended: string;
  duration: number;
}
