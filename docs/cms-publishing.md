# CMS更新の公開自動化

## 目的

microCMSで公開済みコンテンツを更新したときに、Cloudflare Pagesの`main`ブランチのビルドを起動し、成功したビルドだけを公開する。

```
microCMSで公開・更新 → Deploy HookへPOST → Cloudflare Pagesがmainをビルド → 成功時に公開
```

下書き保存では公開ビルドを起動しない。公開・更新、および公開終了時だけを対象にする。

## 事前条件

- Cloudflare PagesプロジェクトがGitHubリポジトリと連携済みで、Production branchが`main`
- Cloudflare Pagesのビルド設定が`npm run build`、出力ディレクトリが`dist`
- Cloudflare Pagesの本番環境変数に次を設定済み
  - `MICROCMS_ENABLED=true`
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`（GET権限のみ）
- microCMSに`menus`、`notices`、`shop`のAPIと公開データがある

## 設定手順

### 1. Cloudflare PagesでDeploy Hookを作成する

1. Cloudflareダッシュボードで対象のPagesプロジェクトを開く。
2. **Settings > Builds > Add deploy hook** を開く。
3. 名前を`microcms-production`、ビルド対象ブランチを`main`にして作成する。
4. 生成されたURLをコピーする。

Deploy Hook URLは認証ヘッダーなしでビルドを起動できる秘密情報である。Git、`.env`、チャット、公開ドキュメントには保存しない。漏えい時はHookを削除して作り直す。

### 2. microCMSでWebhookを設定する

`menus`、`notices`、`shop`の各APIで、**API設定 > Webhook > Cloudflare Pages** を追加する。

- Deploy Hook URL: 手順1で作成したURL
- 通知タイミング: 「公開時・更新時」と「公開終了時」

画像そのものを差し替えた場合は、画像を参照するメニューも保存・公開してWebhookを送る。これによりAstroが新しい画像をビルド成果物へ取り込む。

## 動作確認

1. 初回デプロイが成功し、`main`の公開サイトが表示できることを確認する。
2. `notices`にテスト用のお知らせを公開する。
3. Cloudflare PagesのDeploymentsで、Deploy Hookを起点としたビルドが開始されたことを確認する。
4. ビルド成功後、公開サイトにテスト記事が表示されることを確認する。
5. テスト記事を公開終了にし、同じ手順で非表示になることを確認する。
6. テスト記事を削除する。

## 障害時の扱い

- ビルド失敗時は、Cloudflare PagesのDeploymentsからBuild logを確認する。環境変数、microCMS APIキー、CMSデータ形式を順に確認する。
- microCMSはWebhook送信のネットワークエラーや4xx/5xxに対して自動再送しない。失敗した場合は原因を直した後、対象コンテンツを再公開して再送する。
- 誤った公開が反映された場合は、Cloudflare PagesのDeploymentsから直前の成功済みproduction deploymentへロールバックする。

## 未設定の値

このリポジトリには、Deploy Hook URL、microCMS APIキー、Cloudflare認証情報を保存しない。設定時は各サービスの管理権限を持つ担当者がダッシュボード上で入力する。
