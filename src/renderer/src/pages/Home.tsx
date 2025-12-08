import { BellOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Tag } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchGreeting, setMessage } from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function HomePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { message, status, error } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGreeting());
    }
  }, [dispatch, status]);

  return (
    <div style={{ padding: 24 }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <Card title='欢迎回来'>
          <Flex vertical gap={12}>
            <Flex align='center' gap={12}>
              <Tag color='blue'>当前问候</Tag>
              <span style={{ fontSize: 24, fontWeight: 600 }}>{message}</span>
            </Flex>
            <Tag icon={<SyncOutlined spin={status === 'loading'} />}>
              状态：{status}
            </Tag>
            {error ? (
              <Tag color='error'>错误：{error}</Tag>
            ) : (
              <Tag color='success'>一切正常</Tag>
            )}
            <Flex gap={12}>
              <Button
                type='primary'
                icon={<BellOutlined />}
                loading={status === 'loading'}
                onClick={() => {
                  window.electron.ipcRenderer.invoke('notify', {
                    title: '提示',
                    body: '任务已完成！',
                  });
                }}
              >
                系统通知
              </Button>
              <Button
                onClick={() => dispatch(setMessage('本地自定义的问候语'))}
              >
                本地更新
              </Button>
            </Flex>
          </Flex>
        </Card>

        <Card title='页面导航'>
          <Flex gap={16} wrap='wrap'>
            <Button type='link'>
              <Link to='/'>首页</Link>
            </Button>
            <Button type='link'>
              <Link to='/settings'>设置</Link>
            </Button>
          </Flex>
        </Card>
      </Space>
    </div>
  );
}

export default HomePage;
