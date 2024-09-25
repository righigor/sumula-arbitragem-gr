export type StatusHttpType =
  | "CREATED"
  | "OK"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT";

export type ServiceResponseType<T> = {
  status: StatusHttpType;
  data: { message: string | Error } | T;
};

export type CreateChampionshipType = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  city: string;
  state: string;
  country: string;
  address: string;
  owner: string;
};

export type CreateApparatusType = {
  id?: string;
  name: string;
  competitionId: string;
};

export type ApparatustType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  competitionId: string;
};
