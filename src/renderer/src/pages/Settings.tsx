import { Button, Card, Divider, Form, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';

function SettingsPage(): React.JSX.Element {
  return (
    <Card title='系统设置' extra={<Link to='/'>返回首页</Link>}>
      <Form layout='vertical'>
        <Form.Item label='用户昵称'>
          <Input placeholder='输入昵称' maxLength={20} allowClear />
        </Form.Item>
        <Form.Item label='邮箱'>
          <Input placeholder='user@example.com' type='email' />
        </Form.Item>
        <Divider />
        <Form.Item label='桌面通知'>
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item label='自动更新'>
          <Switch />
        </Form.Item>
        <Divider />
        <Button type='primary'>保存更改</Button>
      </Form>
    </Card>
  );
}

export default SettingsPage;
