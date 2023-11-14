# XP distribution

### On chain allocation

Allocation is done using the script from the [contracts](https://github.com/tahowallet/contracts) repository, please use [documentation](https://github.com/tahowallet/contracts/blob/main/merkle/README.adoc) written for the script there. This documentation assumes you've already generated all the files and the drop already happened. The only thing left to do is to provide the dapp source merkle tree data for given allocation.

#### Prepare merkle tree source file:

In the contracts repository create a file with XP allocations in the format:
   ```
   [
     {
       "account": "0x...", // account address, normalized - lower case letters
       "amount": "0x" // XP amount, 18 decimal places
     },
   ]
   ```

#### Generate merkle trees and allocate XP

Generate merkle trees and do the allocations. There are 2 scripts that can be used:
   1. Do the allocation on a single realm using `merkle:allocate-xp`
   2. Do the allocation on multiple realms using `merkle:multi-allocate-xp`

### Providing XP data in the dapp

1. In the `src/assets/xp-data.json` find out where is the folder for the realm that you did the XP drop on. Should be `assets/xp/<realm-name>/`

Update leaderboard 

2. Copy the `leaderboard.json` file from `contracts` repo that was just created by the allocation script. 
   
3. If we already had leaderbord file (`assets/xp/<realm-name>/leaderboard.json`) then let's replace the leaderboard file with the new one. Leaderboard data will sum xp amounts from previous drops so it should be replaced with updated data. 
   
4. In the `src/assets/xp-data.json` make sure leaderboard file name got updated if needed. If this is the first drop on a given realm then please update it to (`leaderboard` field):
```json
 "<realm-id>": {
     "rootFolder": "/assets/xp/<realm-name>",
     "claimsFolder": "/assets/xp/<realm-name>/claims",
     "xpGlossary": [],
     "leaderboard": "leaderboard.json"
 },
```

Upload XP drop glossary 

5. Copy the main file with XP drop data from the contracts. Make sure this is correct file - it should contain `glossary` field and `merkleDistributor` 

6. Paste that file into `assets/xp/<realm-name>/` folder 
   
7. Update `src/assets/xp-data.json` with the glossary file name (`xpGlossary` field). If this is first drop then the `xpGlossary` array will be empty, if not then add new file name to the end of the array. Each file is named with the merkle root value.
```json
    "<realm-id>": {
        "rootFolder": "/assets/xp/<realm-name>",
        "claimsFolder": "/assets/xp/<realm-name>/claims",
        "xpGlossary": ["0x<merkle-root>.json", "0x<merkle-root>.json"],
        "leaderboard": "leaderboard.json"
    },
```

Upload XP claim files

8. Copy all files from the `contracts` repo that were created in the `claims` folder for a given XP drop
9. Paste them into the `"src/assets/xp/<realm-name>/claims` folder. Don't remove existing files if this is not the first drop.
10. Look into the glossary file (`/assets/xp/<realm-name>/0x<merkle-root>.json`) and confirm it is referring to the same files you just pasted into the `claims` folder.

Testing

11. Run app locally or build it on Netlify PR preview to make sure you can see correct XP values in the claim banner and XP leaderboard. Confirm you are able to claim XP if possible on a given environment. 
