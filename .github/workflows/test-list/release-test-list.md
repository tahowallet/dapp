# Release checklist

This release checklist should be performed before release is published.

- if something is not working please create an issue and link it here. Checkbox
  should be checked only if everything was fine
- in case of serious issues or doubts you should ask the team first

**Approve the PR when the checklist is finished ✅**

**Merge the PR when it is approved and we want to update the production
environment 🚀**

## Manual tests

1. Connect to wallet with $TAHO
   - [ ] you see the Portal is Open message
   - [ ] you can see the map after entering
   - [ ] you see your address connected

2. Connect to wallet that previously staked
   - [ ] you see your address connected
   - [ ] you see the name of your realm
   - [ ] you can navigate to other realms but not stake in them
   - [ ] you can stake more TAHO in that realm if you're not fully staked
   - [ ] you can unstake

3. Connect to wallet that hasn't staked but has $TAHO
   - [ ] you see your address connected
   - [ ] you don't see a realm name beside that
   - [ ] you can explore realms and stake into one

4. Connect to wallet that has NO $TAHO (& no $VETAHO)
   - [ ] you see the portal is closed message and the wait list button
   - [ ] wait list redirect works as expected
   - [ ] you can't see the map

5. Switch connected wallet in the extension
   - [ ] dapp reloads and shows the portal screen
   - [ ] reloads with Connect Wallet button if you go to a wallet that's not
         connected
   - [ ] reloads with that address connected if that's a connected website for
         the address: if it's an eligible address, you see Access Granted &
         Enter the portal
   - [ ] reloads with that address connected if that's a connected website for
         the address: if it's an inelligible address, you see the portal is
         closed message and wait list button

6. Helper Tool (note: this might be hard to test since with new releases, the
   cache will always be fresh and these results may not be true)
   - [ ] doesn't pop up automatically for users who have visited before and
         closed it
   - [ ] doesn't pop up automatically for staked users
   - [ ] does come up with the correct message when you click it (standard
         "hope you're enjoying...")
   - [ ] does come up properly for a user connecting for the first time and
         running through onboarding

7. Population
   - [ ] shows on each realm (how we test that it's accurate, not sure but it
         should show)
   - [ ] shows on the bottom bar

8. Quests/Questline
   - [ ] shows on each realm as expected

9. Disconnect from dapp
   - [ ] click disconnect on address drop down and it disconnects and shows the
         portal screen

10. Connect Wallet
   - [ ] with Taho installed and default wallet
   - [ ] with Taho installed and not default
   - [ ] with Taho not installed and no other
   - [ ] with Taho not installed and MM installed
