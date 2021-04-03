import instance from '../utils/axios';
import { Api } from '../utils/api';

/**
 * gets all applications from api
 */
export const getPortOps = () => instance.get(Api.PortOps);
export const getNextCycle = () => instance.get(Api.getNextCycle);
export const analyzeCycle = (startDate: string, endDate: string) => instance.get(Api.analyzeCycle(startDate, endDate));
export const getCycleAnalysis = (id: any) => instance.get(Api.getCycleAnalysis(id));
export const getCycleDetails = (id: any) => instance.get(Api.getCycleDetails(id));
export const updateRpSlack = (rpId: number, slack: string) => instance.post(Api.updateRpSlack(rpId, slack));
export const sendNotifications = (data: any) => instance.post(Api.sendNotifications, data);
export const getNewScopeData = () => instance.get(Api.getNewScopeData);
export const createScope = (cycleRpId: number, data: any) => instance.post(Api.createScope(cycleRpId), data);
export const completeReview = (data: any) => instance.post(Api.completeReview, data);
export const cycleReport = (data: any) => instance.post(Api.cycleReport, data);
export const postChanges = (id: any) => instance.get(Api.postChanges(id));
