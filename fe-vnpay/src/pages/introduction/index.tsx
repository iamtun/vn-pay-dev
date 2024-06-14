import React from 'react';

import styles from './Introduction.module.css';

const IntroductionPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Hướng dẫn tích hợp VN Pay trong môi trường test</h1>
      <div className={styles.intro}>
        <strong>
          Hướng dẫn này mình chỉ tóm tắt lại các bước có thể tích hợp VN Pay vào
          website thông qua môi trường test một cách nhanh chóng.
        </strong>
        <p>
          Quá trình mình làm là sẽ pull code mẫu về, chạy code mẫu. Mình giữ lại
          toàn bộ logic của code mẫu chỉ tách ra viết gọn lại thôi. Nếu để hiểu
          follow cách hoạt động thì nên pull code về chạy thử (Ý kiến riêng của
          mình 😊 )
        </p>

        <ul>
          <strong>Một số tài liệu mình tham khảo:</strong>
          <li>
            <a href="https://sandbox.vnpayment.vn/apis/" target="_blank">
              Tài liệu gốc
            </a>
          </li>
          <li>
            <a href="https://vnpay-lib.vercel.app/" target="_blank">
              Tài một bạn viết lại thư viện
            </a>
          </li>
        </ul>
      </div>
      <ul className={styles.content_list}>
        <li className={styles.content_item}>
          <strong className={styles.title}>1. Đăng ký tài khoản test</strong>
          <div>
            <p>
              <a href="http://sandbox.vnpayment.vn/devreg/" target="_blank">
                Chọn vào đây để đăng ký test
              </a>
            </p>
            <p>
              Sau khi hoàn thành đăng ký thì sẽ gửi thông tin cấu hình & test
              sang mail của mình, kiểm tra mail để lấy thông tin cấu hình biến
              môi trường cho ứng dụng test
            </p>
            <p>
              <a href="#" target="_blank">
                Source code
              </a>
            </p>

            <ul>
              <strong>Pull source code về. Có 2 cách chạy: </strong>
              <li>1. Nếu có docker thì chạy lệnh docker-compose</li>
              <li>
                2. Tạo file .env vào trong source code FE, BE rồi chạy từng cái
              </li>
            </ul>
          </div>
        </li>

        <li className={styles.content_item}>
          <strong className={styles.title}>2. Giải thích thuật ngữ</strong>
          <p>
            <a
              href="https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html#thong-tin-cau-hinh-PAY"
              target="_blank"
            >
              Giải thích chi tiết các thuộc tính của cấu hình và request
            </a>
          </p>
          <div>
            <p>
              Bên phía email sẽ gửi 1 cái mail thông tin cấu hình bao gồm 2
              trường: <strong>vnp_TmnCode</strong> và{' '}
              <strong>vnp_HashSecret</strong> dùng để bỏ vào biến môi trường ở
              phía BE.
            </p>
          </div>
        </li>

        <li className={styles.content_item}>
          <strong
            className={styles.title}
          >{`3. Follow (Follow sau khi mình đọc code vẽ lên có thể tham khảo follow gốc theo tài liệu gốc)`}</strong>
          <img src="/images/follow.png" alt="follow " />

          <div>
            <ul>
              <strong>3.1. Tạo payment url:</strong>

              <li>
                <p>
                  Đầu tiên sẽ gửi 1 request tới server bao gồm những thông tin
                  như:
                </p>
                <p>
                  <strong>{`amount: `}</strong>
                  {`(Số tiền)`}
                </p>
                <p>
                  <strong>{`bankCode: `}</strong>
                  {`(Mã phương thức thanh toán): 
                  VNPAYQR(Thanh toán quét mã QR - Cái này mình test bị lỗi), 
                  VNBANK(Thẻ ATM - Tài khoản ngân hàng nội địa) hoặc 
                  INTCARD(Thẻ thanh toán quốc tế), 
                  default là null hoặc chuỗi rỗng: Sẽ là cho chọn cổng thanh toán`}
                </p>

                <p>
                  <strong>{`languege: `}</strong>
                  {`(Ngôn ngữ): vn hoặc en`}
                </p>

                <p>
                  <strong>{`vn_pay_return_url: `}</strong>
                  {`(Liên kết sau khi thanh toán xong sẽ redirect về)`}
                </p>
              </li>
            </ul>

            <ul>
              <strong>3.2. Tiến hành thanh toán:</strong>
              <p>
                <a
                  href="https://sandbox.vnpayment.vn/apis/vnpay-demo/#link-demo"
                  target="_blank"
                >
                  Danh sách tài khoản thanh toán demo
                </a>
              </p>
              <p>
                Sau khi thanh toán hoàn tất thì nó sẽ redirect về trang mà lúc
                này bạn thêm ở trường <strong>vn_pay_return_url</strong> gửi req
                tạo payment url.
              </p>
              <p>
                {`Ở đây chúng ta có thể tùy chọn verify hóa đơn để thông báo cho người dùng đơn hàng đã được thanh toán`}
              </p>
              <p>
                {`Cùng với đó VNPay sẽ gọi 1 request đến ipn của server của chúng ta để tiến hành xác thực thông tin thanh toán và cập nhật trạng thái đơn hàng`}
              </p>
            </ul>

            <ul>
              <strong>{`3.3. Cách test INP ở local (Test INP cần https - ở đây mình bật ngrok):`}</strong>
              <li>
                - Bật https bằng ngrok với câu lệnh:{' '}
                <strong>{`ngrok http [port]`}</strong>. Trên giao diện terminal
                sẽ hiển thị 1 url cho bạn. Có thể test bằng cách dùng url đó để
                gọi api
              </li>

              <li>
                -{' '}
                <a href="https://sandbox.vnpayment.vn/merchantv2/Home/Dashboard.htm">
                  Đăng nhập vào sandbox
                </a>
              </li>

              <li>
                -{' '}
                <a href="https://sandbox.vnpayment.vn/merchantv2/Account/TerminalEdit.htm">
                  Cập nhật IPN URL bằng ngrok url vừa tạo
                </a>
              </li>

              <li>
                {' '}
                <p> - Chọn Hoàn thành</p>
              </li>
              <li>
                {' '}
                <p>
                  - Tiến hành tạo 1 đơn hàng sau khi hoàn tất VNPay sẽ tự động
                  gọi về api của server chúng ta.
                </p>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <hr />

      <p>
        Nếu có phản ánh gì về bản quyền hoặc nội dung tài liệu vui lòng liên hệ
        qua gmail:{' '}
        <a href="mailto:tuanle.workse@gmail.com">tuanle.workse@gmail.com</a>
      </p>
    </div>
  );
};

export default IntroductionPage;
