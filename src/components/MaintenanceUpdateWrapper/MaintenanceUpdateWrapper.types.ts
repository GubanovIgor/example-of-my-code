type Status = 'FORCE' | 'OPTIONAL' | 'NONE';
export interface IVersion {
  status: Status;
  versionName: string;
  versionCode: string;
}
export interface IMaintenance {
  isEnabled: boolean;
  title: string;
  description: string;
}

export interface AppUpdateMaintenanceResponse {
  maintenance: IMaintenance;
  versions: IVersion[];
}
