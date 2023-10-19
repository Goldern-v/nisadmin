import { SetStateAction } from "react";

export interface Backup {
  readonly id?: number;
  startDate?: string;
  endDate?: string;
  nurseNames?: string;
  empNos?: string;
  isPublish?:any;
  isCheck?: boolean
}

export interface Day {
  readonly id?: number;
  empNos?: any;
  nurseNames?: any;
  position?: any;
  roundsDate?: string;
  roundsTime?: string;
  roundsEndTime?: string;
  type?: number;
  typeDescription: string;
  isPublish?:any;
  isCheck?:Boolean
}

export interface Result {
  schedule?: Day[];
  backups: SetStateAction<Backup[]>;
  description: SetStateAction<string>;
  nurseRoundsSchedules?: any;
}
