# Development to Production Flow

### Branches

- `main`
  - branch `main` is the base branch for current development
  - every feature branch should be merged into `main` via pull request
- `stage-live`
  - base for running the staging environment that is running on the live chain
  - stage-live website is building based on the current status of the branch `stage-live`
  - changes from `main` should be merged into the `stage-live` in batches using PR
  - person QAing stage environment should be the one to accept and merge the PR - merging the PR means the staging environment will rebuild and manual tests can be started
- `stage-fork`
  - state of the branch `stage-fork` should be always the same as `stage-live`
  - base for building the staging environment that is running on the chain fork
  - stage-fork website is building based on the current status of the branch `stage-fork`
  - changes on `stage-live` should be auto-merged to the `stage-fork` by the Github Action
  - accepting the PR to `stage-live` means stage-fork website will rebuild as well as stage-live website
- `release`
  - changes from `stage-live` branch should be opening the PR to `release` branch
  - batch of changes from the PR should be tested manually on staging environments and then PR to release should be accepted and merged by QA
  - production environment is building based on the current status of the branch `release`

### Environments

- [app](https://app.taho.xyz/) or [release](https://release--taho-development.netlify.app/) - production env based on branch `release`
- [stage fork](https://stage-fork--taho-development.netlify.app/) - staging env based on branch `stage-fork`
  - running on Tenderly fork of Arbitrum
  - can reset the fork by clicking a few times in the logo
  - to be used together with special build of the Taho wallet 
- [stage live](https://stage-live--taho-development.netlify.app/) - staging env based on branch `stage-live`
  - running on live chain
  - to be used with production version of the Taho wallet
- [main](https://main--taho-development.netlify.app/) - development build based on `main`
  - no need to do QA here
  - running on chain fork
  - can be used to preview most recent development

### Hotfix flow

If production needs a quick fix then:

- create a feature branch from `main`
- fix it as usual, merge back to `main`
- cherry-pick the fix to separate branch
- create a separate PR to `stage-live` 
- merge it so fix will be added to the current batch of chages from staging env
- QA on staging
- merge PR `stage-live -> release`


```mermaid
---
title: "Dapp Lifecycle"
---
flowchart
	609277{"main\nbranch"} -->|"Auto PR"| 140433{"stage-live \nbranch\n"}
	style 609277 fill:#8fe465
	style 140433 fill:#64e3db
	609277 -->|"Hotfix PR"| 140433
	linkStyle 1 stroke:#dc2a2a
	609277 <-->|"PR"| 788810{"feature\nbranch"}
	linkStyle 2 stroke:#f103d0
	style 788810 fill:#64e3db
	788810 -->|"Auto deploy"| 588961(("PR-preview"))
	style 588961 fill:#e3c464
	140433 -->|"Auto deploy"| 836305(("stage-live\n"))
	style 836305 fill:#e3c464
	809682{"stage-fork\nbranch"} -->|"Auto deploy"| 490721(("stage-fork\n"))
	style 809682 fill:#64e3db
	style 490721 fill:#e36464
	804724{"release\nbranch"} -->|"Auto deploy"| 389165(("app.taho.xyz"))
	style 804724 fill:#8fe465
	style 389165 fill:#e36464
	140433 -->|"Auto PR\n"| 804724
	140433 -->|"Auto merge"| 809682

%% Mermaid Flow Diagram Link
%% Keep this link to make future edits to your diagram
%% https://www.mermaidflow.app/flowchart#N4IgZgNg9g7iBcoB2UAmBTAzgg2qGAlqgC4AWCAjAAwBsANCKegQOanGUAsAnA0QiBpVuAJgDsYkAwAOUTAWIEoSBKAAeCUQDoKADk4ia3Gof3cAzLxABPBGICsVLUZG7dl+-ZH2KAXwaoAIbEgaogEIEARugQAgC2gQRIADpIkQBOgUgAxuQMmMTWEFi44AQQEPAAxLpg6Jw09iAAugyZSADWmAAimTAqiP4g0oHp6EjEAEpZHQhUAX0AyoXFCGCBEJjoQ4XS6ALppFBxkQCumAByaPv5MejZxOioaxtbC4EsLEksL5voMnIFEokABBSKYKAQU6PMIaeDaPQGIwmGhmSwMWzwBxOFxuDxeHy+fz4IhkSi0BhMVjsLhWfjwEC6KicMQiThSYaAxTKWEITi6Cg6cQ0MRuewOcz2fQYhDmahaLwNHz2bhS8UUGhDIIhMIRaKxBljYqBLapDJZXIcgpFErwHBlCrVWr1RotNozHp9AbAIYjMYTaadObvGDLG2-LY7ax7A5HE7nK4YDmyeTc0HgyHQ-aIEBw-mCijC0W6cX2SXSmyy+WKxoUFVqsQaoZbYoPJ4R-4gVCZT7fDvEkCEEjkeAUaiU5hsDijnx8Z4MiicZnmczJrnA3nwfk0LSSzxUTxicwHkQyrHmXRaAUa1zcXTGAzcLXBUI5vUxAQFD7oAC0EAIABu6AAARmu0uSpFaKy2vaYDlJUVQ0Jw6DmKgkRuiA7RdL0gT9KovqjOMUwzMGXZLNB-YMLs2aYXGZyXNcVp3G287rH87y9kgPzwGxbycqmwJghCUIwjmea6Due6OIex5eGeR6XteJj3veSEiE+A5DmSo5ULoE7UtOdbzCA9KMsIqIiGuAk8mJCA0IuWhiJwDQGK4PCuKelbwJ45hXl4wjMmyJZOc+OpvlEH4Ml+LC-mAUDpB0YEWnkIDWsU2B2g6CFIShaEYVhnq4d6BH+sRQbwMZ3a4WGqw8a82xUdGNGHMc9GJjcqXMY8rH1RxXxcR2ALWemwlZpu9mcI5zlqW5oi6J5mI+X5IgBQY-LipwRJ0CSw7kvQjCTjSo48HOAjFgKVBWUCNnqAg-lntQ4iha+oDvga4DoMEpxjElOQpWlMFZdUOWoehrSYR6OF4YMMiEQGJEVSGNXZrxDUgNRsatQmjFDddI2ZqJt3eStD1UE9tytt1g1kR8-XcajmmkiOhbmPpU6UCIrMmfOIAXtwGpNLjaabvNC2yiIIjPbqEXvYE0jSFoIRHFoajWAAXlBNoZbB8HVChSFIflkNevhsOlYGsyIzToYUXVfxRjGDLZAQ6TZMU7VMZT7Z23xVWcfTvX8XjQkE9mROi2e5gS1tO3adQ+1UuzOn7aZPBUKyFBXcLtk6Qizk3hLor2CKZ7ir53BUBQljmPZjSNvYUvhfqn4hDFf6AegkH5NB2tA1U+suUbnSFdDPpm0RFukVVNvhj7aMY07Ltu+gHsU-cVNz31fab0HaYhyJYe5uSeecAX4gliXXll1oFdVxYtfqg3jO7TpekHQZ5Jv6Z7g0LJWcbjnfQxlMQSE1AEF80tm5RVbrFeKiUVDdy1qUOCjp+7mGyIPcGBUobFXHvDcqlVyKzwZo1R2IBnau3djjTqXsersRpv7amKZg4ZgPiLJc8kxCamfnHCgVhE5HTHHSHmUpVKZyFgA8OckvLUAaI3V6MsBAAAVJg-mkGMACBB0BwEQelZBus0EYMNlg42RVTbDDhmVS2hDqq2xIejJqAgKHL1XjQ9e3tUZbwGjvZhe9WFjUAdIzEsjuHgyeDFbWoAF7kPOMQY4HIEgJXQOkZYoxpwgCgHsBBIBEkdGSQAUSQDzWQSQOB8AmMkwIDxgQAHUmYIBJqlW2oACjpCgHkupL8-D5CgN9bINEhCiAkFaXprt0AAAksioFqiAcR6NRgxXSYuZcq4qILPQMQSZRSZmWVOgycJv5jzHlPu4HyugORZAIAkDeniuwQJzADUorT2noGqJECg7zIg0Awm9Tp2kKxvXGYdacbI+CYHyagIE3jblvQECCaEUBgIqJAM2LqHj6oDmidkWJ8SGC5OSak9I6TMnjASaMPJ6RCnFKgKUjkpTKnVOUH8kcjTHkPOIG0jp9T4CeUhZgaQERMQmSQP+JA+xmyjP6QIQZ4hJA9L6RMqZMy5khHSIsgQyzOArg5KqxZWzpk0TmaZA5P4LDMgPM5FUEkLlICucEdF9DtQvSabPe0zy8nVFQNkEQgQfU-JlsyzQXNAXAoaZwMFEKoUB3obChk4yoDEDgmoJFkwUVrxYpRKJjinY4riGSpJKTVXpJKRMfNFKqUCBLWU4VjxMiMqQIGnlxk2UtI5S8xt3TUqSoGcIWVIyFX6p2Tq9Z6TzrUGHWqjZg7DV0p5iamuPgLxmA2jau1NzA5OrCGyt1baPVVDANQVCl1wa-O5ZwewDAQ0fx5eGky4LIWKG8Ry04nZY0gGRai2hCBn0NSzWQ7FBRcU5PJQSotAgSXZPxZSoplaaWlvKbWqpaZG2suaU0zl6AO0SoVWdNwF1+1jOnRqid6qGSiOMCqkdRGFyzoECarwlgmQiDHOe75DBLnXIdb7e5rbXXoZeW8j5HzvknoDdyscnkr1J1BXeyNj7o18TffCuJwEMACqgLYT97i6GRm2g4-9uay2gbSeBrJRnoPUtpQhhlyHuWodnq2jDWH5VjI1UuLVqyu0DqVTRXZ8zJ3pJ-n-NZAXqOzNo-s1AbdVSslZJ4OufmOP2p052Td7K+PuteVUT5wn-X6g7YWS9MsgXXpkwQe9UbqZKYRap9A6nNPpvXfbPTWLDN4pA4WkzDIIPmYrQyKtdKKl1tsy-eztVHPtvE9h1zDImTGHmgR-pYW-O6o2QINOGcSNTp8wIPzxqou-iXAu483gl2rs4yl8BYVeO1R3RhwTnyRNFfy+Jwr4RiuhpvRGh928YWKIZMpxFanoANbcRmuemLs0xMA3m9rBbCXErM3D8tMH+twerfS4btS7PNrQ5l5zXmZtmRZGyRbirtm+a2+kvmAsqfLYiyAE1Tl078m8GIe+53kvUzSzd7Md2BPZaE18vLMQCuSY+6V295W5O-cDtVlTwONNprB013Tf6aIAbibD4D8OwPdaRzrlHln4M1ps9j0buOHP8a5V06bUqFzue1S5pbO2aMhdI8T1k7J3fbYp7thnTPZFjgkqfVEnPVepZ4y6271uss5eF6Jl7L8AUS+k1Lir8mqv-ZAIDlNkEtPg5IerpxbXDfGaJaZ0lyOCmo85FZ03WOmU490YffHU3neGsd55iE3m-du-8x7ubFk6eu5AHtudB2fyWDrHKIwtAw-sdtRd7nUft2x4e7lxPovxPCGezEErafvuVZ3vLxFcRkkxWVy2bT-ZwaaO0bICvOdmNOEcOYVkbIhAakbG-TETIhSNh1g8CWD8zzQMBqxQDxIVSORsjcBHih5arcAGDFxbRdgEAfCZBxAACyGygQ3QUekKYw9aAgAAKgAEIchgBtITBYHBC1phCKDEAzLdDoEsCYHAQkEKCrBaguzrwdzazgzZDHDn4TACEMBuwmhbACFDDS5qCP7EBKJZAxAADyZm8AP6DALA0AkQGwEKMUJB2aoAqApwGwVWSQ6ABhZCwk-ADABytBBalhNEA24hkI8UAgguj2yuWhUAOhEA7UjhDBUOziVCSYLh0A6Q7hVAUR0RHIOh2QHQbBvSRSAAwq4REQyIYoPAwJEPFBgOkKkeEZEdEVEbEbkckiQaQAQPEWKpgBlF2v+M8GCvgZgEwClkSEAA

```
