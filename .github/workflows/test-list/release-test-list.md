# Release checklist

This release checklist should be performed before release is published.

- if something is not working please create an issue and link it here. Checkbox
  should be checked only if everything was fine
- in case of serious issues or doubts you should ask the team first

**Approve the PR when the checklist is finished ✅**

**Merge the PR when it is approved and we want to update the production
environment 🚀**

## Manual tests

Many of these tests can be combined with each other as you're testing. I suggest
looking through the whole checklist first then executing tests in a way that
allows you to check off multiple items at once. Some suggestions are provided.

1. Connect to wallet that previously staked

   - [ ] you see the Portal is Open message
   - [ ] you can see the map after entering and the Beta has ended modal
   - [ ] you see the Claim your NFT and Get Updates
   - [ ] you see your address connected
   - [ ] you see the name of your realm
   - [ ] you can navigate to all realms but not stake in any of them
   - [ ] you can unstake

2. Connect to wallet that hasn't staked but has $TAHO

   - [ ] you see the Portal is Open message
   - [ ] you can see the map after entering and the Beta has ended modal
   - [ ] you see the Claim your NFT and Get Updates
   - [ ] you see your address connected
   - [ ] you don't see a realm name beside that
   - [ ] you can navigate to all realms but not stake in any of them

3. Connect to wallet that has NO $TAHO (& no $VETAHO)

   - [ ] you see the Portal is Open message, but no buttons to join Beta or
         enter the map
   - [ ] you can't see the map

4. Switch connected wallet in the extension (it's easy to check these off along
   with the above while you're switching accounts)

   - [ ] dapp reloads and shows the portal screen
   - [ ] reloads with Connect Wallet button if you go to a wallet that's not
         connected
   - [ ] reloads with that address connected if that's a connected website for
         the address: if it's an eligible address, you see Access Granted &
         Enter the portal
   - [ ] reloads with that address connected if that's a connected website for
         the address: if it's an ineligible address, you see the Portal is Open
         message and Join Beta button

5. Helper Tool

   - [ ] doesn't pop up automatically for users who have visited before and
         closed it
   - [ ] doesn't pop up automatically for staked users
   - [ ] does come up with the correct message when you click it (standard
         "hang in there, Nomad...")
   - [ ] does not show up for a user connecting for the first time

6. Population (this is easily tested with the above when you're unstaking -
   verify the population changes and then you've combined these tests with that)

   - [ ] shows on each realm
   - [ ] shows on the bottom bar
   - [ ] is updated appropriately if a new account stakes/unstakes

7. Challenges

   - [ ] are not shown anywhere in the dapp

8. Disconnect from dapp

   - [ ] click disconnect on address drop down and it disconnects and shows the
         portal screen

9. Connect Wallet

   - [ ] with Taho and MM installed and Taho set as a default wallet - only Taho
         connection should be possible
   - [ ] with Taho and MM installed and Taho not set as a default - only Taho
         connection should be possible
   - [ ] with Taho not installed and MM installed - should show both options -
         Taho directs to the Chrome store, MM opens the connection method screen
         and allows connecting
   - [ ] with Taho not installed and no other - should show both options - Taho
         directs to the Chrome store, MM opens the connection method screen and
         directs to the Chrome store

10. XP

   - [ ] an account with XP to claim sees that under Claimable Rewards on the
         Realm modal (in pre-prod we can see this on stage-live but might be
         easiest to only test this when we're testing XP drops)
   - [ ] account can claim XP and sees the wallet balance of VETAHO change
         accordingly (requires that the account earned XP and hasn't claimed it
         yet so this could be hard to test on each release but when we're
         testing XP drops, we should do this)
   - [ ] leaderboard shows the top 10 earners in the realm - the connected
         account is shown at the top with their place on the board shown
