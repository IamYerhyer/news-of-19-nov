# IamYerhyer/news-of-19-nov
[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/IamYerhyer/news-of-19-nov/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/IamYerhyer/news-of-19-nov/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

**The Daily Ledger — Thursday 19 November 2026.** One square image, one whole day: a broadsheet front page that sums up the world news of Thursday 19 November 2026. Six verified stories of that day, five real photographs with captions and credits, an "Also Thursday" briefs row, and the date named in the dateline and the footer. The third edition of the series, after [17 Nov](https://github.com/IamYerhyer/news-of-17-nov) and [18 Nov](https://github.com/IamYerhyer/news-of-18-nov).

## The six stories

1. **The 13-year wait ends: GTA VI takes the world** — Grand Theft Auto VI went on sale at midnight local time on Thursday 19 Nov, rolling out from New Zealand for PlayStation 5 and Xbox Series X|S, the first new GTA since 2013. Metacritic 99 from 150+ reviews, tying Zelda: Ocarina of Time as the joint-highest-rated game ever; Sensor Tower estimated ~17 million copies and ~$1.65 billion in sales before launch day began. (Reuters, Moneycontrol)
2. **Three presidents, one table in Shenzhen** — the first-ever Trump–Xi–Putin trilateral, held at the Kylin Villa on the APEC sidelines on Thursday: ~90 minutes on Ukraine and nuclear arms, a joint statement that "a nuclear war cannot be won and must never be fought", and agreement to open a dialogue on reducing nuclear risks. Photograph: the actual summit photo, The White House. (Wall Street Journal, Nikkei Asia, Channel NewsAsia)
3. **Anthropic's $81 billion debut stuns Wall Street** — priced Wednesday at $83 (980 million shares, ~$81.3 billion raised, the largest IPO on record, ~$1.5 trillion valuation), Anthropic opened on the Nasdaq as ANT at $111.50 on Thursday and closed at $97.17, up 17%, briefly a $2 trillion company. Photo: CEO Dario Amodei, file photo from 2023, captioned as such. (Reuters, Investopedia, CNN)
4. **Third cyclone in a month bears down on India** — Severe Cyclonic Storm Akvan in the Bay of Bengal: the IMD's 19 Nov bulletin placed it ~420 km east-southeast of Narsapur, forecasting landfall near Gopalpur, Odisha around noon Friday with winds of 90–100 km/h gusting to 110; Odisha evacuated ~50,000 people under red warnings for extreme rain. Satellite image: VIIRS/NOAA-21. (The Hindu, Down To Earth)
5. **William and Kate wrap up India tour** — the Prince and Princess of Wales closed their three-day tour (their first joint overseas trip in four years) with talks with PM Narendra Modi in New Delhi, after the Earthshot Prize awards night in Mumbai and cricket with Sachin Tendulkar. Photo: PMO India. (Reuters wire)
6. **World Court: Myanmar committed genocide** — on Thursday the International Court of Justice ruled that Myanmar's government committed genocide against the Rohingya in 2017, a landmark judgment in the case brought by The Gambia in 2019. (NDTV, Foreign Exchanges)

Briefs: Wells Fargo lifted its GTA VI sales forecast from 35 million to 65 million copies; Trump left China without the floated Kim Jong Un meeting; the IEA warned the Iran conflict and Hormuz disruption pose a historic threat to energy security.

## How it is made

`image-source.html` is the front page (HTML/CSS, set in Georgia/Playfair-style serif on off-white paper); `entry.png` is its 1024×1024 headless-Chrome render. All photographs are real, downloaded from Wikimedia Commons into `photos/`, grayscaled and cropped to fit the broadsheet feel, and captioned with credits — no hotlinks, and no Rockstar artwork, logos or screenshots (the lead photo is the PlayStation 5 hardware the game launched on). `main.ts` validates the image (PNG/JPEG magic bytes, IHDR/SOF dimensions, ≤1024×1024, ≤1 MiB), copies it to the output path, and verifies the copy byte-for-byte with a SHA-256 fingerprint.

## Run it

```sh
node main.ts                        # writes /output/entry.png
MAKEFUN_OUTPUT_DIR=out node main.ts # or a directory of your choice
```

Requires Node 20+ (runs the TypeScript directly). No dependencies.

## Licence

MIT — see `LICENSE`.

---

Built for [make.fun](https://make.fun/?ref=cfpg3p8n) — bounty [news-image-20261119](https://make.fun/bounty/news-image-20261119).
