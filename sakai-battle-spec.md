# SAKAI'S BATTLE — LP仕様書

**バージョン**: v1.0 draft  
**種別**: ポートフォリオLP / ゲームUI風テーマ / SPA  
**技術**: HTML / CSS / JS（React 可）

---

## 1. 全体コンセプト・デザイン方針

| 項目 | 内容 |
|------|------|
| テーマ | ゲームUI風（にゃんこ大戦争 × RPGステータス画面 ハイブリッド） |
| フォント（見出し） | Press Start 2P（Google Fonts） |
| フォント（本文） | Noto Sans JP |
| フォント（数値・ラベル） | JetBrains Mono |
| 背景 | ダーク基調 / ドット or グリッドのサブテクスチャ（疑似ピクセルアート感） |
| アニメーション | CSSアニメーション中心 / スクロール連動 IntersectionObserver / ホバーでシュバッ系SE風エフェクト |

### カラーパレット

| 役割 | 色名 | カラーコード |
|------|------|-------------|
| アクション | 赤 | `#E24B4A` |
| 警告 | 黄 | `#EF9F27` |
| 情報 | 青 | `#378ADD` |
| 成功 | 緑 | `#1D9E75` |
| 背景 | ダーク | `#0D0D0D` |
| テキスト | オフホワイト | `#F0EDE8` |

---

## 2. グローバルUI要素（常時表示）

### 上部 — 出撃エネルギーバー（XPプログレス）

- **動作**: スクロール量（`scrollY / documentHeight`）に比例し 0〜100 で増加
- **表示**: `BATTLE XP: 042 / 100` テキスト + アニメーション付きバー
- **マイルストーン**: 25 / 50 / 75 / 100 でフラッシュ + 小さなテキストポップ（例: `CHAPTER CLEAR!`）

### 下部固定ナビ — にゃんこ風メニュー

- **配置**: `position: fixed; bottom: 0;` — 全画面幅で横並びボタン4つ
- **ボタン構成**: `[自己紹介]` `[AI観]` `[野望]` `[GitHub]`
- **動作**: クリックで `scrollIntoView({ behavior: 'smooth' })` / 現在セクションをハイライト
- **スタイル**: ゲームボタン風（押し込みシャドウ / ピクセルボーダー風アウトライン）

---

## 3. セクション詳細

### ① CHARACTER DATA（自己紹介）

RPGキャラクターシート風レイアウト

**基本情報テーブル**

| 項目 | 内容 |
|------|------|
| 名前 | 酒井 睦基 |
| 所属 | 千葉工業大学 情報変革科学部 情報工学科 |
| Entertainment | 漫画 / アニメ / 洋画 |
| Languages | C++ / TypeScript / Go / Swift |
| Frameworks | React / Next.js / Spring |

**修練状況ステータス**

- Paiza ランク → レベルバー表示
- AtCoder レート → レベルバー表示
- フレーバーテキスト: 「現在、アルゴリズムの城を攻略中…」（点滅カーソル付き）

---

### ② BATTLE RECORDS（開発実績）

- 「戦利品（リポジトリ）はこちら」ボタンを設置
- GitHubプロフィールへの外部リンク
- ゲームUI風CTAボタン（ホバー時に光るアウトライン）
- **拡張オプション**: GitHub API で Pinned Repos をカード表示（stars / language / 更新日）

---

### ③ THE TEACHER / GURU（AI観）

2カラム構成

**左カラム — AIとは「究極の教師」**

AIへの依頼内容（アイコン付きリスト）:

1. わからないことの質問
2. 認識のすり合わせ
3. 演習問題の生成

> 「答えを教わるのではない、導き方を教わるのだ」

**右カラム — 向き合い方「主導権は渡さない」**

| 比較 | 内容 |
|------|------|
| ❌ 自動操縦 | AIの指示に従うだけ |
| ✅ 実行者 | 自分が主体、AIはツール |

---

### ④ NEXT STAGES（今後の展望）

3つのステージカードで表現。スクロール進入時に「LOCKED → UNLOCKED」アニメーション演出。

| ステージ | タグ | 内容 |
|----------|------|------|
| GAME | `[GAME]` | ブラウザゲーム → Unity / Unreal Engine への進化 |
| APP | `[APP]` | 趣味 → マネタイズを意識したサービス開発へ |
| AI | `[AI]` | APIの壁を突破するための「特化型自作AI」の探求 |

---

## 4. アニメーション仕様

| 対象 | 仕様 |
|------|------|
| スクロール進入 | `IntersectionObserver` で各要素に `.visible` クラス付与 → fade-up + slide-in |
| XPバー | `scroll` イベント → `requestAnimationFrame` でバー幅・数値を更新 |
| ステータスバー | セクション③進入時にバーが 0 → 実値まで伸びるトランジション（0.8s ease-out） |
| NEXT STAGESカード | 進入時に LOCKED グレーアウト → 0.4s後に UNLOCKED カラー化 |
| ナビホバー | `transform: scale(1.08)` + わずかなY軸移動 + `transition 100ms` |

> パフォーマンス: CSS `transform` / `opacity` のみで合成レイヤーを維持。`will-change` は必要最小限に。

---

## 5. 技術スタック候補

### パターンA — Vanilla HTML/CSS/JS（推奨・シンプル）

- Vanilla HTML5
- CSS Variables
- Vanilla JS（ES2022+）
- Google Fonts CDN
- GitHub Pages デプロイ

### パターンB — React + Vite（将来拡張しやすい）

- React 19
- Vite
- Framer Motion
- Tailwind CSS
- GitHub Pages / Vercel

> Paiza / AtCoder の進捗は手動更新（静的JSON）で十分。GitHub API連携はオプション。

---

## 6. ファイル構成（Vanilla版）

```
sakai-battle/
├── index.html
├── style/
│   ├── base.css          # リセット・変数・タイポグラフィ
│   ├── layout.css        # セクション・グリッド
│   ├── components.css    # ボタン・カード・バー・チップ
│   └── animations.css    # keyframes・transition
├── js/
│   ├── xpBar.js          # スクロール連動XPバー
│   ├── nav.js            # 下部ナビ制御
│   ├── observer.js       # IntersectionObserver
│   └── stages.js         # NEXT STAGES アンロック演出
└── assets/
    └── favicon.ico
```

---

## 7. 実装フロー

1. HTML骨格
2. CSS変数 + ダークテーマ
3. グローバルUI（XPバー + ナビ）
4. セクション①〜④
5. スクロールアニメーション
6. レスポンシブ調整
7. GitHub Pages デプロイ
