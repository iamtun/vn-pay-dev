import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  vnp_TmnCode: process.env.VNP_TMN_CODE,
  vnp_HashSecret: process.env.VNP_HASH_SECRET,
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
};

export default config;
