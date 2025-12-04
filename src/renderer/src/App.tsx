import { useEffect } from 'react';

import { fetchGreeting, setMessage } from './store/appSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { message, status, error } = useAppSelector((state) => state.app);

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
          onClick={() => dispatch(fetchGreeting())}
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
