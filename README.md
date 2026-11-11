# Eco App - Expo Router + Tamagui + React Native Paper + Zustand + TanStack Query

Dự án React Native hoàn chỉnh sử dụng **Expo Router** phiên bản mới nhất cùng hệ sinh thái công nghệ:

- 🧭 **Expo Router**: Cấu trúc file-based routing chuẩn (`src/app/`, `(tabs)`, modals, not-found).
- 🎨 **Tamagui**: UI component system chính với hiệu năng cao, tối ưu biên dịch qua Metro plugin.
- 📄 **React Native Paper**: Thư viện Material Design 3 cho các component cụ thể (Card, Chip, SegmentedButtons, Snackbar, FAB, etc.).
- 🐻 **Zustand**: Quản trị global state nhẹ, trực quan và type-safe.
- ⚡ **TanStack Query (v5)**: Xử lý data fetching, caching, mutation và optimistic updates.

---

## 📁 Cấu trúc thư mục dự án

```text
├── assets/                     # Hình ảnh, icons, splash screen
├── src/
│   ├── app/                    # File-based routing theo chuẩn Expo Router
│   │   ├── (tabs)/             # Nhóm màn hình Tab navigation
│   │   │   ├── _layout.tsx     # Cấu hình Bottom Tabs & icons
│   │   │   ├── index.tsx       # Màn hình Tamagui UI + Zustand State
│   │   │   ├── paper.tsx       # Màn hình React Native Paper UI
│   │   │   ├── query.tsx       # Màn hình TanStack Query (Fetch & mutate data)
│   │   │   └── settings.tsx    # Cài đặt theme & tuỳ chọn ứng dụng
│   │   ├── _layout.tsx         # Root Stack Navigator & Provider wrapper
│   │   ├── modal.tsx           # Màn hình Stack Modal
│   │   └── +not-found.tsx      # Màn hình 404 fallback
│   ├── providers/
│   │   └── AppProviders.tsx    # Hợp nhất QueryClient, Tamagui, Paper & Navigation Theme
│   ├── stores/
│   │   └── useAppStore.ts      # Zustand Store quản lý trạng thái toàn cục
│   ├── services/
│   │   ├── queryClient.ts      # Khởi tạo TanStack QueryClient
│   │   └── api/
│   │       └── posts.ts        # Custom hooks & queries gọi REST API
│   └── types/
│       └── declarations.d.ts   # Khai báo TypeScript cho module bổ trợ
├── metro.config.js             # Cấu hình Metro tích hợp withTamagui
├── tamagui.config.ts           # Cấu hình Theme, Tokens & Media Queries của Tamagui
├── app.json                    # Cấu hình Expo Application
└── package.json
```

---

## 🚀 Khởi chạy dự án

1. **Khởi động server phát triển (Expo Metro)**:
   ```bash
   npx expo start
   ```
   - Nhấn `a` để mở trên Android Emulator / thiết bị thật
   - Nhấn `i` để mở trên iOS Simulator
   - Nhấn `w` để mở trên trình duyệt Web

2. **Kiểm tra TypeScript (Typecheck)**:
   ```bash
   npm run typecheck
   ```

3. **Kiểm tra Lint**:
   ```bash
   npm run lint
   ```

4. **Kiểm tra cấu hình dự án (Expo Doctor)**:
   ```bash
   npx expo-doctor
   ```

---

## 🛠️ Hướng dẫn tích hợp & mở rộng

### 1. Tamagui UI
- Cấu hình đặt tại `tamagui.config.ts`.
- Đã được bao bọc trong `src/providers/AppProviders.tsx` với `TamaguiProvider`.
- Sử dụng trực tiếp các thành phần: `YStack`, `XStack`, `Button`, `Card`, `Input`, `Paragraph`, `H2`, etc.

### 2. React Native Paper
- Đã được bọc trong `PaperProvider` tại `src/providers/AppProviders.tsx`.
- Đồng bộ tự động theme Sáng / Tối với hệ điều hành và tuỳ chọn người dùng.

### 3. Zustand Global State
- Store đặt tại `src/stores/useAppStore.ts`.
- Để sử dụng trong component:
  ```tsx
  import { useAppStore } from '@/stores/useAppStore';

  const { counter, increment } = useAppStore();
  ```

### 4. TanStack Query
- `QueryClient` đã cấu hình cache 5 phút và garbage collection 30 phút.
- Quản lý queries/mutations tại `src/services/api/`.
- Sử dụng hook `usePostsQuery()` hoặc `useCreatePostMutation()` trực tiếp trong màn hình.
