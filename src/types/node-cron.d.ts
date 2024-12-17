declare module 'node-cron' {
    export function schedule(cronExpression: string, func: () => void): ScheduledTask;
  
    export interface ScheduledTask {
      start(): this;
      stop(): this;
      getStatus(): string;
    }
  }
  