# Askおじさん拡張機能 - 動作確認ガイド

Chrome拡張機能「Askおじさん」です。このガイドでは、拡張機能のインストールから使用方法までの手順を詳しく説明します。

とりあえずどんなものか動画でみたい方はこちら
See: https://hirobel-sandbox.s3.ap-northeast-1.amazonaws.com/20240923_tsukuaso-webio.mov

---

## 目次

1. [拡張機能の概要](#1-拡張機能の概要)
2. [動作環境](#2-動作環境)
3. [インストール手順](#3-インストール手順)
   - [3.1 ファイルのダウンロード](#31-ファイルのダウンロード)
   - [3.2 拡張機能の読み込み](#32-拡張機能の読み込み)
4. [OpenAI APIキーの設定](#4-openai-apiキーの設定)
5. [拡張機能の使用方法](#5-拡張機能の使用方法)
6. [動作確認のポイント](#6-動作確認のポイント)
7. [よくある質問 (FAQ)](#7-よくある質問-faq)

---

## 1. 拡張機能の概要

**Askおじさん**は、Amazonの商品ページで商品を閲覧中に、購入を思いとどまらせるユーモラスなコメントを提供するChrome拡張機能です。OpenAIのAPIを使用して、商品の情報や現在の月を考慮した説得力のあるコメントをたぶんいい感じに生成します。たぶんね。

---

## 2. 動作環境

- **対応ブラウザ**: Google Chrome（最新バージョン推奨）
- **必要な権限**:
  - 拡張機能の読み込み
  - ストレージアクセス（OpenAI APIキーの保存）
  - アクティブなタブへのアクセス
- **その他**:
  - OpenAI APIキー（利用者自身のOpenAI APIキーをご用意ください。なければ個別に私 hkato.bel@gmail.com までご連絡を。テンポラリのキーを貸し出します。）

---

## 3. インストール手順

### 3.1 ファイルのダウンロード

1. 提供された拡張機能の**ZIPファイル**をダウンロードします。
2. ダウンロードしたZIPファイルを任意の場所に**解凍**します。

   **解凍後のファイル構成**:

   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `options.html`
   - `options.js`
   - `styles.css`

### 3.2 拡張機能の読み込み

1. Chromeブラウザで新しいタブを開き、アドレスバーに`chrome://extensions/`と入力してエンターキーを押します。

2. 右上にある**「デベロッパーモード」**のスイッチを**オン**にします。

3. 左上に表示される**「パッケージ化されていない拡張機能を読み込む」**ボタンをクリックします。

4. 先ほど解凍したフォルダを選択し、**「フォルダの選択」**をクリックします。

   - 拡張機能がリストに追加され、Askおじさんのアイコンがブラウザのツールバーに表示されます。

---

## 4. OpenAI APIキーの設定

拡張機能を使用する前に、OpenAI APIキーを設定する必要があります。

1. ブラウザのツールバーに表示されている**Askおじさんのアイコン**を**右クリック**します。

2. 表示されるメニューから**「拡張機能を管理」**を選択します。

3. Askおじさんの拡張機能の詳細ページが開きます。

4. **「拡張機能のオプション」**をクリックします。

   - **または**、`chrome://extensions/`のページで、Askおじさんの拡張機能のカード内にある**「詳細」**をクリックし、次に**「オプション」**をクリックします。

5. オプションページ（`options.html`）が開きます。

6. **「OpenAI APIキー」**の入力欄に、レビュアー様ご自身の**APIキー**を入力します。

   - APIキーはOpenAIのアカウントページから取得できます。
   - 例: `sk-...`で始まるキー

7. **「保存」**ボタンをクリックします。

   - **「APIキーを保存しました。」**というメッセージが表示されれば完了です。

---

## 5. 拡張機能の使用方法

1. **Amazonの商品ページ**を開きます。

   - 例: 任意の商品ページ（https://www.amazon.co.jp/dp/商品のASIN）

2. ページが完全に読み込まれたことを確認します。

3. ブラウザのツールバーにある**Askおじさんのアイコン**をクリックします。

4. ポップアップウィンドウ（`popup.html`）が表示されます。

5. **「今は時期が悪い？」**ボタンをクリックします。

6. 少し待つと、商品名や商品説明、現在の月を考慮した**「時期が悪い」コメント**が表示されます。

   - コメントはOpenAIのAPIを使用して生成されます。

7. 必要に応じて、ポップアップウィンドウを閉じます。

---

## 6. 動作確認のポイント

- **コメントの内容**:
  - 商品の特徴や現在の月に関連した、ユーモラスで説得力のある「時期が悪い」コメントが表示されるか確認してください。

- **複数の商品でテスト**:
  - いくつか異なるカテゴリーの商品ページで試して、コメントが商品に応じて変化するか確認してください。

- **APIキーの保存**:
  - オプションページでAPIキーを変更・保存し、正しく反映されるか確認してください。

- **エラーハンドリング**:
  - APIキーを未設定または無効なキーにして、適切なエラーメッセージが表示されるか確認してください。

- **コンソールログの確認**:
  - 開発者ツールのコンソールを開き、`[Askおじさん]`というプレフィックスが付いたログが出力されているか確認できます。
  - ログには処理の各ステップが表示され、動作状況を把握できます。

---

## 7. よくある質問 (FAQ)

### Q1. OpenAI APIキーがありません。どうすれば取得できますか？

- **A1**: OpenAIの公式サイト（[https://platform.openai.com/](https://platform.openai.com/)）でアカウントを作成し、APIキーを取得できます。ただし、APIの使用には利用料金が発生する場合があります。

### Q2. コメントが表示されません。どうすればいいですか？

- **A2**:
  - APIキーが正しく設定されているか確認してください。
  - インターネット接続が安定しているか確認してください。
  - コンソールログにエラーメッセージが出ていないか確認してください。
