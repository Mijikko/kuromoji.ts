# 使用方法

## Node.js

> [!IMPORTANT]
> **Node.js v22以上**が必要です。 \
> TypeScriptも使用する場合は、**TypeScript v6以上**も必要になります。

1. npmでインストールします。

```
npm install kuromoji.ts
```

もしくはpnpmを用いてインストールします。

```
pnpm install kuromoji.ts
```

2. JavaScript（もしくはTypeScript）のモジュール内に以下のように記述します。

```js
import kuromoji from "kuromoji.ts";
```

3. 以下のようにtokenizerを構成します。

```js
/** kuromoji.tsの辞書データ（dict/）へのディレクトリパス */
const dicPath = "path/to/dictionary/dir/";

kuromoji.builder({ dicPath }).build((err, tokenizer) => {
  // tokenizerが使用可能になった際のコード
  const path = tokenizer.tokenize("すもももももももものうち");
  console.log(path);
});
```

## Browser

Webブラウザーから直接使用する場合は[takuyaa/kuromoji.js](https://github.com/takuyaa/kuromoji.js)を使用してください。

<!-- ### Browser

You only need the build/kuromoji.js and dict/\*.dat.tgz files

Install with Bower package manager:

    bower install kuromoji

Or you can use the kuromoji.js file and dictionary files from the GitHub repository.

In your HTML:

    <script src="url/to/kuromoji.js"></script>

In your JavaScript:

    kuromoji.builder({ dicPath: "/url/to/dictionary/dir/" }).build(function (err, tokenizer) {
        // tokenizer is ready
        var path = tokenizer.tokenize("すもももももももものうち");
        console.log(path);
    }); -->

## Vue.js

1. npmでインストールします

```
npm install kuromoji.ts
```

もしくはpnpmを用いてインストールします。

```
pnpm install kuromoji.ts
```

2. kuromoji.tsの辞書データ（`dict/`）をpublicディレクトリにコピーします。

※ライセンス（[NOTICE.md](/NOTICE.md)）に注意してください。

3. `.vue`ファイル内に以下のように記載します。

### JavaScript

```vue
<script setup>
import Tokenizer from "kuromoji.ts/dist/Tokenizer.js";
import kuromoji from "kuromoji.ts/dist/kuromoji.js";

/** kuromoji.tsの辞書データ（dict/）へのディレクトリパス */
const dicPath = "path/to/dictionary/dir/";

const outputText = ref("");
let tokenizer = undefined;

onMounted(async () => {
  // tokeniserの生成・読み込み
  await kuromoji
    .builder({ dicPath: dicPath })
    .buildBrowser((err, _tokenizer) => {
      tokenizer = _tokenizer;
    });

  const tokens = tokenizer.tokenize("すもももももももものうち");
  outputText.value = JSON.stringify(tokens);
});
</script>

<template>
  <div class="output">{{ outputText }}</div>
</template>
```

### TypeScript

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Tokenizer from "kuromoji.ts/dist/Tokenizer.js";
import kuromoji from "kuromoji.ts/dist/kuromoji.js";

/** kuromoji.tsの辞書データ（dict/）へのディレクトリパス */
const dicPath = "path/to/dictionary/dir/";

const outputText = ref("");
let tokenizer: Tokenizer | undefined = undefined;

onMounted(async () => {
  // tokeniserの生成・読み込み
  await kuromoji
    .builder({ dicPath: dicPath })
    .buildBrowser((err, _tokenizer) => {
      tokenizer = _tokenizer;
    });

  const tokens = tokenizer?.tokenize("すもももももももものうち");
  outputText.value = JSON.stringify(tokens);
});
</script>

<template>
  <div class="output">{{ outputText }}</div>
</template>
```
