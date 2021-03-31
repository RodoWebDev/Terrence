import instance from '../utils/axios';
import { Api } from '../utils/api';

/**
 * gets all applications from api
 */
export const getPortOps = () => instance.get(Api.PortOps);
export const getNextCycle = () => instance.get(Api.getNextCycle);
export const analyzeCycle = (startDate: string, endDate: string) => instance.get(Api.analyzeCycle(startDate, endDate));
export const getCycleAnalysis = (id: any) => instance.get(Api.getCycleAnalysis(id));
