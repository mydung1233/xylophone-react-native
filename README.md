# 🎹 Xylophone - Đàn Xylophone (React Native + Expo)

Ứng dụng mô phỏng đàn Xylophone. Chạm vào các phím màu để phát ra nốt nhạc tương ứng.


## ✨ Chức năng

- Giao diện gồm AppBar và 7 phím đàn với 7 màu khác nhau (Đô, Rê, Mi, Fa, Sol, La, Si).
- Mỗi phím phát một file âm thanh trong thư mục `assets/` bằng thư viện `expo-audio`.
- Hàm `playNote(index)` nhận số thứ tự phím và phát nốt tương ứng.
- Phím đổi màu và thu nhỏ nhẹ khi được nhấn.

**Tính năng nâng cao**

- Nút **Bài mẫu** tự chơi bài "Twinkle Twinkle Little Star", các phím sáng lên theo từng nốt.
- Rung nhẹ khi nhấn phím (`expo-haptics`).
- Nhấn nhanh liên tục vẫn nghe rõ từng nốt nhờ phát lại từ đầu (`seekTo(0)`).

## 🛠 Công nghệ sử dụng

- [React Native](https://reactnative.dev/)
- [Expo SDK](https://expo.dev/)
- `expo-audio`, `expo-haptics`

## 📁 Cấu trúc thư mục

```
Xylophone/
├── assets/
│   ├── note1.wav   (Đô)
│   ├── note2.wav   (Rê)
│   ├── note3.wav   (Mi)
│   ├── note4.wav   (Fa)
│   ├── note5.wav   (Sol)
│   ├── note6.wav   (La)
│   └── note7.wav   (Si)
├── screenshots/
├── App.js
├── app.json
├── package.json
└── README.md
```

## 🚀 Cài đặt và chạy

**Yêu cầu:** Node.js 18 trở lên, ứng dụng **Expo Go** trên điện thoại (hoặc emulator).

```bash
# 1. Clone dự án
git clone https://github.com/<username>/<repo>.git
cd <repo>

# 2. Cài thư viện
npm install

# 3. Chạy ứng dụng
npx expo start
```

Sau đó quét mã QR bằng Expo Go, hoặc nhấn `a` (Android), `i` (iOS), `w` (web).

