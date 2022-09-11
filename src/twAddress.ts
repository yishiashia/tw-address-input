import 'wc-dropdown'
import addressStyle from './twAddress.scss'

export default class TWAddress extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    if (this.shadowRoot !== null) {
      // DOM
      this.shadowRoot.innerHTML = this.render()

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