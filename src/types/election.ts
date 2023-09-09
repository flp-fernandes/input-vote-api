import { TVShow } from "./tvshow";

export enum ElectionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  APURATION = 'APURATION',
}

export type Election = {
  id?: string;
  electionUuid?: string;
  startDate: Date;
  endDate: Date;
  apurationDate: Date;
  status: ElectionStatus;
  type: TVShow;
  details?: string;
  createdAt?: string;
}