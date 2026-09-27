import { TangocardAuthEntityBase } from '../TangocardAuthEntityBase';
import type { TangocardAuthSDK } from '../TangocardAuthSDK';
import type { Control } from '../types';
import type { ServiceTokenManagement, ServiceTokenManagementCreateData } from '../TangocardAuthTypes';
declare class ServiceTokenManagementEntity extends TangocardAuthEntityBase<ServiceTokenManagement> {
    constructor(client: TangocardAuthSDK, entopts: any);
    make(this: ServiceTokenManagementEntity): ServiceTokenManagementEntity;
    create(this: any, reqdata?: ServiceTokenManagementCreateData, ctrl?: Control): Promise<ServiceTokenManagementEntity>;
}
export { ServiceTokenManagementEntity };
