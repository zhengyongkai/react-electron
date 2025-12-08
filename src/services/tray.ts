import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;
let trayWindow: BrowserWindow | null = null;

const resolveAssetPath = (...segments: string[]): string => {
  if (app.isPackaged) {
    return join(process.resourcesPath, ...segments);
  }

  return join(app.getAppPath(), ...segments);
};

const resolveTrayIconPath = (): string => {
  const iconFile = process.platform === 'win32' ? 'logo.ico' : 'logo.png';
  return resolveAssetPath('resources', 'icons', iconFile);
};

const getAttachedWindow = (): BrowserWindow | null => {
  if (!trayWindow || trayWindow.isDestroyed()) {
    return null;
  }

  return trayWindow;
};

const showWindow = (): void => {
  const window = getAttachedWindow();
  if (!window) return;

  if (window.isMinimized()) window.restore();
  window.show();
  window.focus();
};

const toggleWindowVisibility = (): void => {
  const window = getAttachedWindow();
  if (!window) return;

  if (window.isVisible()) {
    window.focus();
  } else {
    window.show();
  }
};

export const setupTray = (window: BrowserWindow): void => {
  trayWindow = window;
  if (tray) return;

  const trayIcon = nativeImage.createFromPath(resolveTrayIconPath());
  tray = new Tray(
    process.platform === 'darwin'
      ? trayIcon.resize({ width: 16, height: 16 })
      : trayIcon,
  );
  tray.setToolTip(app.getName());

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: showWindow,
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => app.quit(),
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWindowVisibility);
};

export const destroyTray = (): void => {
  tray?.destroy();
  tray = null;
  trayWindow = null;
};
