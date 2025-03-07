# Task Management App

このプロジェクトは **React.js** と **Node.js (Express)** を使って開発されたタスク管理アプリです。  
This project is a task management app developed using **React.js** and **Node.js (Express)**.

## インストール & セットアップ | Installation & Setup

### 1 リポジトリをクローン | Clone the repository

```sh
git clone https://github.com/jdu214843/Intarship.git
cd Intarship
```

### 2 依存関係をインストール | Install dependencies

```sh
# フロントエンド
npm install

# バックエンド
cd ../backend
npm install
```

### 3 開発モードでアプリを実行 | Run the app in development mode

#### **フロントエンドを起動 | Start Frontend**

```sh
cd todo-tasks
npm start
```

**開発用サーバー:** [http://localhost:3001](http://localhost:3001)

#### **バックエンドを起動 | Start Backend**

```sh
cd backend
node server.js
```

**API サーバー:** [http://localhost:3000](http://localhost:3000)

---

## 利用可能なスクリプト | Available Scripts

### ▶️ `npm start`

開発モードでアプリを起動します。

```sh
npm start
```

### `npm test`

インタラクティブなウォッチモードでテストを実行します。

```sh
npm test
```

### `npm run build`

本番環境向けにアプリをビルドします。

```sh
npm run build
```

---

## 📂 フォルダ構成 | Project Structure

```sh
Todo-tasks/
│── backend/              # バックエンド (Node.js + Express)
│   │-- database.js       # データベース接続と管理 (SQLite)
│   │-- mydatabase.db     # SQLiteデータベースファイル
│   │-- server.js         # Expressサーバーのメインエントリーポイント
│── src/                  # フロントエンド (React)
│   ├── components/       # UIコンポーネント
│   ├── api/              # APIリクエスト関連
│   ├── styles/           # CSS & スタイリング
│   ├── App.tsx           # メインアプリ
│   ├── index.tsx         # エントリーポイント
│── public/               # 静的ファイル
│── package.json          # プロジェクトの依存関係とスクリプト
│── README.md             # このファイル (説明書)
```

--

## Backend ファイルの説明 | Backend File Descriptions

- **`server.js`**  
   Express サーバーを起動し、API エンドポイントを提供します。  
  Starts the Express server and provides API endpoints.

- **`database.js`**  
   SQLite データベースとの接続を管理し、データの保存・取得を行います。  
  Manages the connection to the SQLite database and handles data storage and retrieval.

- **`mydatabase.db`**  
   タスクデータを保存する SQLite データベースファイル。  
  SQLite database file where task data is stored.

---

## 使用技術 | Technologies Used

✅ **React.js (TypeScript)** - フロントエンド  
✅ **Node.js + Express.js** - バックエンド  
✅ **SQLite** - 軽量データベース  
✅ **Ant Design & MUI** - UI ライブラリ  
✅ **Axios** - API 通信

---

## Features | 機能

このプロジェクトには以下の機能があります。  
This project includes the following features:

### 1. CRUD (Create, Read, Update, Delete) Operations | CRUD 操作

- **Add New Task | 新しいタスクの追加** – ユーザーは新しいタスクを作成できます。
- **View Tasks | タスクの閲覧** – すべてのタスクがリストビューで表示されます。
- **Edit Tasks | タスクの編集** – 既存のタスクを編集できます。
- **Delete Tasks | タスクの削除** – 不要なタスクを削除できます。

### 2. Categorized Task Management | タスクのカテゴリ管理

- **New Task | 新しいタスク** – 最近追加されたタスク。
- **In Progress | 進行中** – 現在進行中のタスク。
- **Completed | 完了** – 完了したタスク。

### 3. Responsive Design | レスポンシブデザイン

- **Full Desktop Interface | デスクトップ向けの完全なインターフェース** – グリッドレイアウトでタスクを整理。
- **Mobile Carousel View | モバイル向けカルーセルビュー** – モバイル画面ではスライダー形式でタスクを表示可能。

### 4. Color-Coded Categories | カラーコード分類

- **New Task | 新しいタスク** – 赤色のヘッダーで表示。
- **In Progress | 進行中** – 黄色のヘッダーで表示。
- **Completed | 完了** – 緑色のヘッダーで表示。

### 5. Task Detail Modal | タスク詳細モーダル

- **詳細表示機能** – 「内容」をクリックすると、タスクの詳細情報を表示可能。

### 6. Edit & Delete Modals | 編集・削除モーダル

- **Edit Modal | 編集モーダル** – タスクの名前、説明、優先度を変更可能。
- **Delete Confirmation Modal | 削除確認モーダル** – 削除前に確認メッセージが表示される。

### 7. API Integration | API 統合

- **Node.js + Express Backend | Node.js + Express バックエンド** – サーバーを介してタスクデータを取得・保存。
- **API Requests with Axios | Axios を使用した API リクエスト** – フロントエンドとバックエンドを接続。

## 学ぶためのリソース | Learn More

[React 公式ドキュメント](https://reactjs.org/) | [React Documentation](https://reactjs.org/)  
 [Node.js & Express](https://expressjs.com/)  
 [SQLite](https://www.sqlite.org/index.html)  
 [Ant Design](https://ant.design/)  
 [Material UI](https://mui.com/)

**このアプリを改良して、タスク管理をもっと効率的にしましょう！**  
 **Improve this app and make task management more efficient!**
