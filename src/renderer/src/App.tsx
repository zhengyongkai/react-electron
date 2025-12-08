import { useEffect } from 'react';

import { fetchGreeting, setMessage } from './store/appSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { message, status, error } = useAppSelector((state) => state.app);

  // async function showSystemDialog(win: BrowserWindow) {
  //   const { response } = await dialog.showMessageBox(win, {
  //     type: 'info',
  //     buttons: ['确定', '取消'],
  //     defaultId: 0,
  //     title: '提示',
  //     message: '是否执行某操作？',
  //     detail: '这里可以补充说明',
  //   });
  //   console.log('用户选择：', response); // 0=确定,1=取消
  // }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGreeting());
    }
  }, [dispatch, status]);

  return (
    <div style={{ padding: 24 }}>
      <h1>{message}</h1>
      <p>当前状态：{status}</p>
      {error ? <p style={{ color: 'red' }}>错误：{error}</p> : null}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type='button'
          onClick={() => {
            window.electron.ipcRenderer.invoke('notify', {
              title: '提示',
              body: '任务已完成！',
            });
          }}
          disabled={status === 'loading'}
        >
          重新请求
        </button>
        <button
          type='button'
          onClick={() => dispatch(setMessage('本地自定义的问候语'))}
        >
          本地更新
        </button>
      </div>
    </div>
  );
}

export default App;
