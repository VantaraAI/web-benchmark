May 16 - 7:04pm
```
  Test case default, scenario KitchenSinkWithoutVantaraScenario passed with 10 runs.
┌───────────┬────────────────────────────────┬───────────────────────────────────┐
│ (index)   │ KitchenSinkWithVantaraScenario │ KitchenSinkWithoutVantaraScenario │
├───────────┼────────────────────────────────┼───────────────────────────────────┤
│ lcp       │ '4689.78 ms'                   │ '4259.60 ms'                      │
│ cls       │ '1.55 ms'                      │ '2.06 ms'                         │
│ fid       │ '24.17 ms'                     │ '26.62 ms'                        │
│ tbt       │ '6228.20 ms'                   │ '6377.89 ms'                      │
│ cpu       │ '42.04 %'                      │ '42.38 %'                         │
│ memoryAvg │ '219.8 MB'                     │ '230.05 MB'                       │
│ memoryMax │ '547.65 MB'                    │ '650.21 MB'                       │
│ netTx     │ '6.91 MB'                      │ '817.74 kB'                       │
│ netRx     │ '174.62 MB'                    │ '173.05 MB'                       │
└───────────┴────────────────────────────────┴───────────────────────────────────┘
```

Not receiving signup confirmation emails at all in incognito mode.


```
Request ID: 9a8365da-53f4-49b4-a036-9e112c3afbdd

{
    "data": {
        "sendCode": {
            "emailSent": true,
            "provider": "Gmail",
            "link": "https://mail.google.com/mail/u/admin%40vantara.ai/#search/from%3A(hello%40gamma.app)+in%3Aanywhere+newer_than%3A1h",
            "__typename": "SendCodeResponse"
        }
    }
}
```

from vantara.staging.

Using Playwright to run scenarios repeatedly s/t we have statistically significant results

Started to received 'FORBIDDEN' errors from the API on sign in

Other notes:
Noticed long email delays. When tried to sign up again, received 'Account already exists', when we could just take the user to set password screen.

Cloudflare denials get stuck in infinite loop


76bb4fe6-3dff-4008-9a63-be490ebac556
```
{
    "errors": [
        {
            "message": "Invalid email or password",
            "code": "FORBIDDEN"
        }
    ],
    "data": null
}
```