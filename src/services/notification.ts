import { app, Notification } from 'electron';

export function setupNotification(): void {
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.your.app');
  }
}

export function showNotification(title: string, body: string): void {
  new Notification({ title, body }).show();
}
