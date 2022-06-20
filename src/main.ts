
import { TonClient, Address, fromNano } from 'ton';


const client = new TonClient({
  // Using webpack proxy, this will only work in development
  endpoint: '/toncenter',
});

document.addEventListener('DOMContentLoaded', () => {

  const $addressInput = document.getElementById('address-input') as HTMLInputElement;
  const $showBalanceButton = document.getElementById('show-balance-button');
  const $balanceIndicator = document.getElementById('balance-indicator');

  void updateBalance();

  $showBalanceButton.addEventListener('click', () => {
    void updateBalance();
  });


  async function updateBalance() {

    $showBalanceButton.setAttribute('disabled', 'disabled');

    $balanceIndicator.innerText = 'Loading…';

    try {
      const address = Address.parse($addressInput.value);
      const balance = await client.getBalance(address);
      $balanceIndicator.innerText = (
        `${fromNano(balance)} TON`
      );
    } catch (error: any) {
      $balanceIndicator.innerText = `Error: ${error.message || 'unknown'}`;

    } finally {
      $showBalanceButton.removeAttribute('disabled');

    }

  }

});
