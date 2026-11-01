# microCMS連携設定

## 目的

お知らせ、メニュー、店舗情報をmicroCMSで更新し、Astroの静的ビルド時に取得して公開する。
APIキーはブラウザへ配信せず、ローカル環境とCloudflare Pagesのビルド環境変数にだけ設定する。

## 作成するAPI

| API ID | 形式 | フィールド |
| --- | --- | --- |
| `menus` | リスト形式 | `name`（テキスト）、`price`（テキスト）、`category`（セレクト：たこ焼き／お好み焼き／その他）、`image`（画像）、`image_alt`（テキスト）、`display_order`（数値）、`is_visible`（真偽値） |
| `notices` | リスト形式 | `title`（テキスト）、`body`（複数行テキスト）、`type`（セレクト：お知らせ／休業日）、`publishedAt`（公開日時） |
| `shop` | オブジェクト形式 | `name`、`address`、`access`、`business_hours`、`regular_holiday`、`telephone`、`map_url`（すべてテキスト。`map_url`はGoogle MapsのHTTPS URL） |

`notices.body`は、現行表示に合わせて複数行テキストを使う。HTMLをページへ直接埋め込むリッチテキストは、この段階では使用しない。

## 環境変数

`.env.example`を参照し、実値はGitへ追加しない。

| 変数 | 用途 |
| --- | --- |
| `MICROCMS_ENABLED` | `true`のときだけmicroCMSを取得する。未設定または`false`ならローカル初期データを表示する。 |
| `MICROCMS_SERVICE_DOMAIN` | `https://{サービスドメイン}.microcms.io` のサービスドメイン部分。 |
| `MICROCMS_API_KEY` | GET権限だけを付与したContent APIキー。 |

Cloudflare Pagesへ設定する際は、`MICROCMS_ENABLED=true`と3変数すべてを設定する。`true`なのに値が不足している場合は、誤ったフォールバックを本番公開しないようビルドを失敗させる。

## 画像の扱い

`images.microcms-assets.io`の画像だけを受け入れ、Astroの`<Image>`でビルド成果物に最適化して出力する。閲覧者のブラウザがmicroCMSの画像URLを直接参照する構成にはしない。

## 動作確認

1. `.env`に上記3変数を設定する。
2. `npm run build`を実行する。
3. `dist/`のHTMLにAPIキーが含まれないことを確認する。
4. メニュー・お知らせ・店舗情報がmicroCMSの公開済みデータに置き換わることを確認する。
