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

function getStrAttribute (element: TWAddress, attr: string) {
  if (element.hasAttribute(attr)) {
    return String(element.getAttribute(attr))
  } else {
    return ''
  }
}

export default class TWAddress extends HTMLElement {
  #cityRef: Dropdown | null
  #townRef: Dropdown | null
  #zipRef: HTMLElement | null
  #inputRef: HTMLInputElement | null
  #realInput: HTMLInputElement | null

  #zip: string
  #city: { name: string, value: string } | null
  #town: { name: string, value: string } | null
  #address: string

  #props: {
    name: string;
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.cityChosen = this.cityChosen.bind(this)
    this.townChosen = this.townChosen.bind(this)
    this.inputChange = this.inputChange.bind(this)

    this.#cityRef = null
    this.#townRef = null
    this.#zipRef = null
    this.#inputRef = null
    this.#realInput = document.createElement('input')
    this.#realInput.type = 'hidden'

    this.#zip = ''
    this.#city = null
    this.#town = null
    this.#address = ''
    this.#props = {
      name: ''
    }
  }

  connectedCallback () {
    if (this.shadowRoot !== null) {
      // 0. Setup props
      this.#props.name = getStrAttribute(this, 'name')

      // 1. DOM
      this.shadowRoot.innerHTML = this.render()
      this.#cityRef = this.shadowRoot.querySelector('.city-menu')
      this.#townRef = this.shadowRoot.querySelector('.town-menu')
      this.#zipRef = this.shadowRoot.querySelector('span.zip')
      this.#inputRef = this.shadowRoot.querySelector('input.address-input')

      // Real input element
      if (this.#realInput !== null) {
        this.#realInput.name = this.#props.name
        this.appendChild(this.#realInput)
      }

      // Init cities options
      if (this.#cityRef !== null) {
        this.#cityRef.options = cities
      }

      // 2. Style
      this.style.display = 'block'
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(addressStyle))
      this.shadowRoot.appendChild(styleElement)
    }

    // 3. Event
    if (this.#cityRef !== null) {
      this.#cityRef.addEventListener('change', this.cityChosen)
    }
    if (this.#townRef !== null) {
      this.#townRef.addEventListener('change', this.townChosen)
    }
    if (this.#inputRef !== null) {
      this.#inputRef.addEventListener('keyup', this.inputChange)
    }
  }

  disconnectedCallback () {
    if (this.#cityRef !== null) {
      this.#cityRef.removeEventListener('change', this.cityChosen)
    }
    if (this.#townRef !== null) {
      this.#townRef.removeEventListener('change', this.townChosen)
    }
    if (this.#inputRef !== null) {
      this.#inputRef.removeEventListener('keyup', this.inputChange)
    }
  }

  cityChosen (option: Event) {
    const city = (option as CustomEvent).detail
    if (city.value in towns) {
      if (this.#townRef !== null) {
        this.#townRef.options = towns[city.value as keyof typeof towns]
        this.#city = city
        this.#town = null
        this.#zip = ''
        this.valueChange()
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
      this.#town = town
      this.#zip = zip
      this.valueChange()
      if (this.#zipRef !== null) {
        this.#zipRef.textContent = zip
        this.#zipRef.classList.remove('hidden')
      }
    }
  }

  inputChange () {
    if (this.#inputRef !== null) {
      this.#address = this.#inputRef.value
      this.valueChange()
    }
  }

  valueChange () {
    if (this.#realInput !== null) {
      this.#realInput.value = [
        this.#zip,
        this.#city === null ? '' : this.#city.name,
        this.#town === null ? '' : this.#town.name,
        this.#address
      ].join(' ')
      const evt = new CustomEvent('change', {
        detail: {
          zip: this.#zip,
          city: this.#city === null ? '' : this.#city.name,
          town: this.#town === null ? '' : this.#town.name,
          address: this.#address
        }
      })
      this.dispatchEvent(evt)
    }
  }

  get value () {
    return {
      zip: this.#zip,
      city: this.#city === null ? '' : this.#city.name,
      town: this.#town === null ? '' : this.#town.name,
      address: this.#address
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
          <input class="address-input" type="text" placeholder="里、鄰、巷弄、道路/街名、號、樓層、室" />
        </div>
      </div>
    `
  }
}