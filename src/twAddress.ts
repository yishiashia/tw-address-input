import 'wc-dropdown'
import addressStyle from './twAddress.scss'

import cities from './cities'

interface Dropdown extends HTMLElement
{
    get options(): Array<{ name: string; value: string; }>;
    set options(val: Array<{ name: string; value: string; }>);
}
export default class TWAddress extends HTMLElement {
  #rootRef: HTMLElement | null
  #cityRef: Dropdown | null
  #townRef: Dropdown | null

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.#rootRef = null
    this.#cityRef = null
    this.#townRef = null
  }

  connectedCallback () {
    if (this.shadowRoot !== null) {
      // DOM
      this.shadowRoot.innerHTML = this.render()
      this.#cityRef = this.shadowRoot.querySelector('.city-menu')
      this.#townRef = this.shadowRoot.querySelector('.town-menu')

      if (this.#cityRef !== null) {
        this.#cityRef.options = cities
      }

      // Style
      this.style.display = 'block'
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(addressStyle))
      this.shadowRoot.appendChild(styleElement)
    }
  }

  disconnectedCallback () {
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <span class="zip">234</span>
          <dropdown-menu
            class="menu city-menu"
            placeholder="請選擇縣市"
            maxitems="5"
          ></dropdown-menu>
          <dropdown-menu
            class="menu town-menu"
            placeholder="請選擇鄉/鎮/市/區"
          ></dropdown-menu>
        </div>
        <div class="section">
          <input type="text" placeholder="里、鄰、道路/街名、號、樓層/室等詳細地址" />
        </div>
      </div>
    `
  }
}