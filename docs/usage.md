# Usage

## Node.js

> [!IMPORTANT]
> Require **Node.js v22 or more**. \
> If you want to use TypeScript, also require **TypeScript v6 or more**.

1. Install dependency with npm.

```
npm install kuromoji.ts
```

Or install with pnpm.

```
pnpm install kuromoji.ts
```

2. Write as below to the module of JavaScript (or TypeScript)

```js
import kuromoji from "kuromoji.ts";
```

3. You can prepare tokenizer like this.

```js
/** Path to dictionary data (dict/) of kuromoji.ts */
const dicPath = "path/to/dictionary/dir/";

kuromoji.builder({ dicPath }).build((err, tokenizer) => {
  // tokenizer is ready
  const path = tokenizer.tokenize("すもももももももものうち");
  console.log(path);
});
```

## Web Browser

If you want to use it directly from a web browser, please use [takuyaa/kuromoji.js](https://github.com/takuyaa/kuromoji.js).

## Vue.js

1. Install dependency with npm.

```
npm install kuromoji.ts
```

Or install with pnpm.

```
pnpm install kuromoji.ts
```

2. Copy to `public/` dir from dictionary data (`dict/`) of kuromoji.ts.

※Please pay attention to the license ([NOTICE.md](/NOTICE.md)).

3. Write as below to the `.vue` file.

### JavaScript

```vue
<script setup>
import Tokenizer from "kuromoji.ts/dist/Tokenizer.js";
import kuromoji from "kuromoji.ts/dist/kuromoji.js";

/** Path to dictionary data (dict/) of kuromoji.ts */
const dicPath = "path/to/dictionary/dir/";

const outputText = ref("");
let tokenizer = undefined;

onMounted(async () => {
  // Create tokenizer and load
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

/** Path to dictionary data (dict/) of kuromoji.ts */
const dicPath = "path/to/dictionary/dir/";

const outputText = ref("");
let tokenizer: Tokenizer | undefined = undefined;

onMounted(async () => {
  // Create tokenizer and load
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
