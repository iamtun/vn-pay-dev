import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import styles from '../order/Order.module.css';

const VerifyPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const [paymentStatus, setPaymentStatus] = useState<
    'default' | 'paid' | 'error'
  >('default');

  useEffect(() => {
    if (params.size > 0) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/vnpay_return${
          window.location.search
        }`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => res.json())
        .then(({ code }) => {
          if (code == '00') {
            setPaymentStatus('paid');
          } else {
            setPaymentStatus('error');
          }
        })
        .catch();
    }

    return () => setPaymentStatus('default');
  }, [params.size]);

  return (
    <div className={styles.container}>
      <Form
        className={styles['form-create-url']}
        layout="vertical"
        initialValues={{
          amount: params.get('vnp_Amount')
            ? Number(Number(params.get('vnp_Amount')) / 100).toLocaleString(
                'vi-VN',
                {
                  style: 'currency',
                  currency: 'VND',
                },
              )
            : 'Không xác định',
          bankCode: params.get('vnp_BankCode')
            ? params.get('vnp_BankCode')
            : 'Không xác định',
          vnp_TxnRef: params.get('vnp_TxnRef')
            ? params.get('vnp_TxnRef')
            : 'Không xác định',
          vnp_PayDate: params.get('vnp_PayDate')
            ? params.get('vnp_PayDate')
            : 'Không xác định',
          vnp_OrderInfo: params.get('vnp_OrderInfo')
            ? params.get('vnp_OrderInfo')
            : 'Không xác định',
        }}
      >
        <div className={styles['title']}>
          <strong>Thông tin đơn hàng</strong>
        </div>
        <Form.Item label="Mã ngân hàng" name={'bankCode'}>
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Mã giao dịch (vnp_TxnRef)" name={'vnp_TxnRef'}>
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Thời gian tạo giao dịch (vnp_TransactionDate)"
          name={'vnp_PayDate'}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Số tiền" name={'amount'}>
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Nội dung giao dịch" name={'vnp_OrderInfo'}>
          <Input.TextArea rows={4} readOnly />
        </Form.Item>

        {params.size === 0 ? null : paymentStatus == 'default' ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : paymentStatus == 'paid' ? (
          <div>{'Thanh toán thành công!'}</div>
        ) : (
          <div>{'Thanh toán thất bại :('}</div>
        )}
      </Form>
    </div>
  );
};

export default VerifyPage;
