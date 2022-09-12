import 'wc-dropdown'
import addressStyle from './twAddress.scss'

import cities from './cities'
import towns from './towns'
import zips from './zips'

interface Dropdown extends HTMLElement
{
    get options(): Array<{ name: string; value: string; }>;
    set options(val: Array<{ name: string; value: string; }>);
}

export default class TWAddress extends HTMLElement {
  #cityRef: Dropdown | null
  #townRef: Dropdown | null
  #zipRef: HTMLElement | null

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.cityChosen = this.cityChosen.bind(this)
    this.townChosen = this.townChosen.bind(this)

    this.#cityRef = null
    this.#townRef = null
    this.#zipRef = null
  }

  connectedCallback () {
    if (this.shadowRoot !== null) {
      // DOM
      this.shadowRoot.innerHTML = this.render()
      this.#cityRef = this.shadowRoot.querySelector('.city-menu')
      this.#townRef = this.shadowRoot.querySelector('.town-menu')
      this.#zipRef = this.shadowRoot.querySelector('span.zip')

      if (this.#cityRef !== null) {
        this.#cityRef.options = cities
      }

      // Style
      this.style.display = 'block'
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(addressStyle))
      this.shadowRoot.appendChild(styleElement)
    }

    // Event
    if (this.#cityRef !== null) {
      this.#cityRef.addEventListener('change', this.cityChosen)
    }
    if (this.#townRef !== null) {
      this.#townRef.addEventListener('change', this.townChosen)
    }
  }
  
  disconnectedCallback () {
    if (this.#cityRef !== null) {
      this.#cityRef.removeEventListener('change', this.cityChosen)
    }
    if (this.#townRef !== null) {
      this.#townRef.removeEventListener('change', this.townChosen)
    }
  }

  cityChosen (option: Event) {
    const city = (option as CustomEvent).detail
    if (city.value in towns) {
      if (this.#townRef !== null) {
        this.#townRef.options = towns[city.value as keyof typeof towns]
        if (this.#zipRef !== null) {
          this.#zipRef.classList.add('hidden')
        }
      }
    }
  }

  townChosen (option: Event) {
    const town = (option as CustomEvent).detail
    if (town.value in zips) {
      const zip = zips[town.value as keyof typeof zips]
      if (this.#zipRef !== null) {
        this.#zipRef.textContent = zip
        this.#zipRef.classList.remove('hidden')
      }
    }
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <span class="zip hidden"></span>
          <dropdown-menu
            class="menu city-menu"
            placeholder="請選擇縣市"
            maxitems="5"
          ></dropdown-menu>
          <dropdown-menu
            class="menu town-menu"
            placeholder="請選擇鄉/鎮/市/區"
            maxitems="5"
          ></dropdown-menu>
        </div>
        <div class="section">
          <input type="text" placeholder="里、鄰、道路/街名、號、樓層、室" />
        </div>
      </div>
    `
  }
}