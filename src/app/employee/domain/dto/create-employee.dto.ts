export interface CreateEmployeeDto {
  firstName:    string;
  lastName:     string;
  salary:       number;
  contractDate: string | null;
  birthDate:    string | null;
  jobId:        number;
  afpId:        number;
}
