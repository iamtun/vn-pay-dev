import { Layout, Menu } from 'antd';
import React from 'react';
import {
  InfoCircleOutlined,
  LinkOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { Helmet } from 'react-helmet';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { icon: InfoCircleOutlined, label: 'Hướng dẫn', key: '1', path: '/' },
  { icon: ShoppingOutlined, label: 'Tạo hóa đơn', key: '2', path: '/order' },
  {
    icon: LinkOutlined,
    label: 'Trạng thái đơn hàng',
    key: '3',
    path: '/verify-order',
  },
  //   { icon: UserOutlined, label: 'Tạo hóa đơn', key: '4' },
].map(({ icon, key, label, path }) => ({
  key: key,
  icon: React.createElement(icon),
  label,
  path,
}));

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hướng dẫn tích hợp VNPAY thanh toán trong môi trường test</title>
        <meta
          name="description"
          content="Hướng dẫn tích hợp VNPAY thanh toán trong môi trường test"
        />
        <meta name="keywords" content="vnpay, vnpay developer, vnpay test, hướng dẫn vnpay" />
        <meta name="author" content="tuna.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Layout className={styles.container}>
        <Sider breakpoint="lg" collapsedWidth="80">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
            style={{ marginTop: 64 }}
            onClick={({ key }) => {
              const { path } = items[+key - 1];
              navigate(path);
            }}
            selectedKeys={[
              items.filter((item) => item.path === location.pathname)[0].key,
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <main className={styles.content}>
              <Outlet />
            </main>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Demo VNPay ©{new Date().getFullYear()} Created by tuna.dev
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
