// src/main/ipc/notification.ts
import { ipcMain } from 'electron';

import { showNotification } from '../services/notification';

export function registerNotificationIpc(): void {
  ipcMain.handle('notify', (_event, payload) => {
    showNotification(payload?.title ?? '通知', payload?.body ?? '');
  });
}
