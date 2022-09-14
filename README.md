# tw-address-input

[![published][wc-image]][wc-url]
[![coverage][coverage-image]][coverage-url]
[![npm](https://img.shields.io/npm/v/tw-address-input.svg?style=flat-square)](https://www.npmjs.com/package/tw-address-input)
[![npm](https://img.shields.io/npm/dm/tw-address-input.svg?style=flat-square)](https://www.npmjs.com/package/tw-address-input)
[![GitHub issues](https://img.shields.io/github/issues/yishiashia/tw-address-input.svg?style=flat-square)](https://github.com/yishiashia/tw-address-input/issues)
![license](https://img.shields.io/npm/l/tw-address-input.svg?style=flat-square)

[![NPM](https://nodei.co/npm/tw-address-input.png?mini=true)](https://www.npmjs.com/package/tw-address-input)

A simple Taiwan address input WebComponent.

English | [中文](https://github.com/yishiashia/tw-address-input/blob/master/README.zh-TW.md)

<div style="border: 1px solid #CCC; padding: 20px;">

![demo image](https://yishiashia.github.io/img/demo/tw-address.gif)

</div>

## Install

    $ npm install tw-address-input

## Syntax

```html
<script src="tw-address.js"></script>

<form action="#" method="POST">
    <tw-address name="bill-address"></tw-address>
    <input type="submit" value="submit" />
</form>
```

## Demo page
The demo page: https://yishiashia.github.io/address.html

## Usage

 - [name](#name)
 - [value](#value)

### Attributes

#### name
`String` typs. The name of input, it would be the POST parameter name.

#### value ( getter )
You can get the value of address input component by javascript, for example:

```js
const addrElement = document.querySelector('tw-address')

console.log(addrElement.value)
/*
  It will output:
  {
    zip: '220',
    city: '新北市',
    town: '板橋區',
    address: '漢生東路83巷1號'
  }
 */

```


### Event

#### change event
When user fill an address, a `change` event will be dispatch, and you can bind an event listener to handle it:

```js
let addrElement = document.querySelector('tw-address')

addrElement.addEventListener('change', function(option) {
  console.log(option.detail)
  /*
    output example:
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
