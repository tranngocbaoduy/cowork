# cowork

## Cowork APP: là folder chứa code giao diện của ứng dụng COWORK-APP (FRONT-END)
* Để chạy được folder này chúng ta cần:
    1. Chạy npm install để cài đặt hết tất cả package cần thiết để build được chương trình nằm trong file package.json 
    2. Mở expo app (down trên google play - app store) 
    3. Kết nối Expo với app của mình sau đó gọi: npm start để start 
    4. Dùng điện thoại vào phần chụp ảnh để quét mã QR sau đó đợi load chương trình
    
    
## Server: là folder chứa server để gọi api lấy data cho ứng dụng COWORK-APP (BACK-END)
* Để chạy được folder này chúng ta cần:
    1. Cài python - tốt nhất tải conda để tạo environment riêng để quản lí package ổn định
    2. Tạo một môi trường mới từ conda và kích hoạt môi trường đó theo lệnh:
      - conda create -n cowork python==3.6 
      - conda deactivate
      - conda activate cowork 
    3. Từ thư mục root chúng ta chạy lệnh: 
      - pip install -r requirements.txt // để install các package cần thiết 
      - python run.py

    * Vì React Native sẽ không chấp nhận các đường link api là http nên chúng ta phải config thêm ngrok để tạo 1 tunnel, trong tunnel này chúng ta tạo đường link https để gọi api, bằng cách gọi câu lệnh: 

    - Window: ngrok http http://127.0.0.1:5000/
    - IOS/ Ubuntu/ Linux:  ./ngrok http http://127.0.0.1:5000/

    - Sau khi chạy xong sẽ ra 2 dòng forwarding: chúng ta copy url https của dòng forwarding bên dưới và paste vào đường dẫn sau: 
        "CoWorkApp/redux/service/index.js" sửa const URL lại tương ứng với cái vừa copy

    - Start lại server và app nếu cần thiết, sau khi reload thì chúng ta có thể lấy dữ liệu từ phía backend 

* Lưu ý: bên phía server đã config với mongoDB để có thể lưu trữ dữ liệu người dùng nên không cần làm thêm gì để config 
