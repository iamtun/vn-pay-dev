import { Button, Form, Input, Radio } from 'antd';
import React from 'react';

import styles from './Order.module.css';

const OrderPage: React.FC = () => {
  const onFinish = (values: {
    amount: number;
    'bank_code': string;
    languages: string;
  }) => {
    const data = {
      ...values,
      vn_pay_return_url: import.meta.env.VITE_VN_PAY_RETURN_URL,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/order/create_payment_url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((vpnUrl) => {
        window.location.href = vpnUrl;
      })
      .catch();
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles['form-create-url']}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className={styles['title']}>
          <strong>Tạo đơn hàng</strong>
        </div>
        <Form.Item label="Số tiền" name={'amount'}>
          <Input placeholder="Nhập số tiền" type="number" />
        </Form.Item>
        <Form.Item name="bank_code" label="Chọn Phương thức thanh toán:">
          <Radio.Group>
            <Radio value="">Cổng thanh toán VNPAYQR</Radio>
            <Radio value="VNBANK">
              Thanh toán qua ATM-Tài khoản ngân hàng nội địa
            </Radio>
            <Radio value="INTCARD">Thanh toán qua thẻ quốc tế</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="language" label="Ngôn ngữ">
          <Radio.Group>
            <Radio value="vn">Tiếng việt</Radio>
            <Radio value="en">Tiếng anh</Radio>
          </Radio.Group>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thanh toán
        </Button>
      </Form>
    </div>
  );
};

export default OrderPage;
