
import moment from 'moment';

export const getDate = (date: any) => {
  return date ? moment(date).format('YYYY-MM-DD'):'';
}