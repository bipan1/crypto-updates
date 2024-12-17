import { startScheduler } from '../lib/scheduler';

const SchedulerInit = async () => {
  if (typeof window === 'undefined') {
    startScheduler().catch(console.error);
  }
  return null;
};

export default SchedulerInit;
