export const API_BASE_URL = process.env.REACT_APP_API_SERVER;

export const HOME = () => '/';
export const PORTOPS = () => `${HOME()}PortOps`;

export const Api = {
	baseURL: API_BASE_URL,
  PortOps: `${PORTOPS()}/cycles`,
  getNextCycle: `${PORTOPS()}/getNextCycle`,
  analyzeCycle: (startDate: string, endDate: string) => `${PORTOPS()}/analyzeCycle?startDate=${startDate}&endDate=${endDate}`,
  getCycleAnalysis: (id: number) => `${PORTOPS()}/cycleAnalysis?cycleId=${id}`,
};
