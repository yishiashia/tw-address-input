import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import TWAddress from '../../src/twAddress'

describe('twAddress.ts', () => {
  window.customElements.define('tw-address', TWAddress);
  // Render test cases
  test('Must render props.placeholder when passed', () => {
    document.body.innerHTML = `
      <tw-address></tw-address>
    `
    const customElement = document.querySelector('tw-address');
    expect(customElement === null).toBeFalsy();
    if(customElement !== null && customElement.shadowRoot !== null) {
      const cityMenu = customElement.shadowRoot.querySelector('.city-menu')
      expect(cityMenu !== null)
    } else {
      fail("shadow dom not mount")
    }
  });

  test('test unmount customElement', () => {
    document.body.innerHTML = `
    <tw-address></tw-address>
    `
    const customElement = document.querySelector('tw-address') as TWAddress;
    if (customElement !== null) {
      document.body.removeChild(customElement)
    }
  })

  test('test fill in an address', async () => {
    document.body.innerHTML = `
    <tw-address name="deliveryAddr"></tw-address>
    `
    const customElement = document.querySelector('tw-address') as TWAddress;
    if (customElement !== null) {
      if (customElement.shadowRoot !== null) {
        const cityMenu = customElement.shadowRoot.querySelector('.city-menu') as any
        const townMenu = customElement.shadowRoot.querySelector('.town-menu') as any
        const addrInput = customElement.shadowRoot.querySelector('.address-input') as HTMLInputElement
        if (cityMenu !== null) {
          cityMenu.setSelectedOption(5)
          expect(customElement.value.city).toBe('新北市')
          if (townMenu !== null) {
            townMenu.setSelectedOption(5)
            expect(customElement.value.town).toBe('新店區')
            if (addrInput !== null) {
              const testStr = "blablabla"
              addrInput.value = testStr
              await fireEvent.keyUp(addrInput, {
                key: "a",
                code: "KeyA",
                keyCode: 65,
                charCode: 65
              })
              expect(customElement.value.address).toBe(testStr)
            } else {
              fail('address input not existed')
            }
          } else {
            fail('town menu not existed')
          }
        } else {
          fail('city menu not existed')
        }
      } else {
        fail('shadowDOM not mounted')
      }
    }
  })

});
