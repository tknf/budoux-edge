<!-- markdownlint-disable MD014 -->
# @tknf/budoux

BudouX uses `jsdom` for DOM manipulation and will not work in Edge environments such as Cloudflare Workers.  
This package provides `budoux/edge` tuned to work in Edge environments by omitting methods that manipulate DOM.

## Install

```shellsession
$ npm install budoux @tknf/budoux
```

## Usage on Edge

**Japanese:**

```javascript
import { loadDefaultJapaneseParser } from '@tknf/budoux';
const parser = loadDefaultJapaneseParser();
console.log(parser.parse('今日は天気です。'));
// ['今日は', '天気です。']
```

**Simplified Chinese:**

```javascript
import { loadDefaultSimplifiedChineseParser } from '@tknf/budoux';
const parser = loadDefaultSimplifiedChineseParser();
console.log(parser.parse('是今天的天气。'));
// ['是', '今天', '的', '天气。']
```

**Traditional Chinese:**

```javascript
import { loadDefaultTraditionalChineseParser } from '@tknf/budoux';
const parser = loadDefaultTraditionalChineseParser();
console.log(parser.parse('是今天的天氣。'));
// ['是', '今天', '的', '天氣。']
```


## Copyright
Copyright (c) 2023 TKNF LLC. See LICENSE.md ofr further details.
