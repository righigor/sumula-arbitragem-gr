import {
  ApparatustType,
  CreateApparatusType,
  ServiceResponseType,
} from "../../types";

type ResponseGetAllApparatusByCompetitionIdType = {
  name: string;
};

export interface ApparatusServiceInterface {
  createApparatus: (
    obj: CreateApparatusType
  ) => Promise<ServiceResponseType<ApparatustType>>;
  getAllApparatusByCompetitionId: (
    competitionId: string
  ) => Promise<ServiceResponseType<ResponseGetAllApparatusByCompetitionIdType[]>>;
  getApparatusById: (
    apparatusId: string
  ) => Promise<ServiceResponseType<ApparatustType>>;
  updateApparatusById: (
    obj: CreateApparatusType,
    apparatusId: string
  ) => Promise<ServiceResponseType<ApparatustType>>;
  deleteApparatusById: (
    apparatusId: string
  ) => Promise<ServiceResponseType<ApparatustType>>;
}
