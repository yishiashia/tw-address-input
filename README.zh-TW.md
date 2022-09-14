# tw-address-input

[![published][wc-image]][wc-url]
[![coverage][coverage-image]][coverage-url]
[![npm](https://img.shields.io/npm/v/tw-address-input.svg?style=flat-square)](https://www.npmjs.com/package/tw-address-input)
[![npm](https://img.shields.io/npm/dm/tw-address-input.svg?style=flat-square)](https://www.npmjs.com/package/tw-address-input)
[![GitHub issues](https://img.shields.io/github/issues/yishiashia/tw-address-input.svg?style=flat-square)](https://github.com/yishiashia/tw-address-input/issues)
![license](https://img.shields.io/npm/l/tw-address-input.svg?style=flat-square)

[![NPM](https://nodei.co/npm/tw-address-input.png?mini=true)](https://www.npmjs.com/package/tw-address-input)

使用政府開放資料平臺縣市鄉鎮資料實作的簡易台灣地址輸入Web元件。

[English](https://github.com/yishiashia/tw-address-input#readme) | 中文

<div style="border: 1px solid #CCC; padding: 20px;">

![demo image](https://yishiashia.github.io/img/demo/tw-address.gif)

</div>

## 安裝

    $ npm install tw-address-input

## 使用語法

```html
<script src="tw-address.js"></script>

<form action="#" method="POST">
    <tw-address name="bill-address"></tw-address>
    <input type="submit" value="submit" />
</form>
```

## Demo 頁面
The demo page: https://yishiashia.github.io/address.html

## 參數

 - [name](#name)
 - [value](#value)

### name
`String` 型態. Form 表單中的 POST 參數名稱。

### value ( getter )
您可以透過 javascript 取得 Web 元件的地址資料，範例如下:

```js
const addrElement = document.querySelector('tw-address')

console.log(addrElement.value)
/*
  將會輸出:
  {
    zip: '220',
    city: '新北市',
    town: '板橋區',
    address: '漢生東路83巷1號'
  }
 */

```


### 事件

#### change 事件
當使用者輸入地址時，會派送 `change` 事件，您可以透過綁定事件 listener 來處理它:

```js
let addrElement = document.querySelector('tw-address')

addrElement.addEventListener('change', function(option) {
  console.log(option.detail)
  /*
    輸出範例:
      {
        zip: "220",
        city: "新北市",
        town: "板橋區",
        address: "漢生東路83巷1號"
      }
   */
})
```

[wc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square
[wc-url]: https://www.webcomponents.org/element/tw-address-input

[coverage-image]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fgist.githubusercontent.com%2Fyishiashia%2Fdee60aefdce58a7559baeb7c5deb3a8b%2Fraw%2Ftw-address-input__heads_master.json
[coverage-url]: https://gist.githubusercontent.com/yishiashia/dee60aefdce58a7559baeb7c5deb3a8b/raw/tw-address-input__heads_master.json

[js-image]: https://img.shields.io/badge/ES-6%2B-ff69b4.svg?style=flat-square
[js-url]: https://www.ecma-international.org/ecma-262/6.0/

[ts-image]: https://img.shields.io/badge/TypeScript-^4.7.4-blue?style=flat-square
[ts-url]: https://www.typescriptlang.org/
