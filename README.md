# 🌿 Owner avatar co2 tracker

> A privacy-preserving, decentralized carbon credit management dApp built on the **Midnight Network** using **Zero-Knowledge (ZK) proofs**. Record and retire carbon credits with full privacy — only you can prove ownership, without ever revealing your private key.

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Midnight Network](https://img.shields.io/badge/network-Midnight-purple)](https://midnight.network)
[![Built with Compact](https://img.shields.io/badge/contract-Compact-blue)](https://docs.midnight.network)

---

## 📋 Contract Address

| Network | Contract Address |
|---------|-----------------|
| Preprod | `Pending` |
| Standalone (Local) | `Pending` |

> **Live Vercel Deployment:** _[Add after Vercel deploy]_

---

## ✨ Features

- 🔒 **Privacy-first credit recording** — Post carbon credits using ZK proofs; your secret key is never revealed on-chain.
- 🌱 **Record Carbon Credits** — Attach a description to a credit (e.g., "Solar farm — 500 tonnes CO₂ offset").
- ♻️ **Retire Carbon Credits** — Only the original owner (proven via ZK) can retire a credit.
- 👁️ **Public ledger transparency** — Credit state (occupied/vacant) and description are publicly visible.
- 🔑 **Private ownership** — Owner identity is proven without revealing the private key.
- 🖼️ **Owner Avatar & Identity Visualizer** — Shows dynamic lock/unlock state avatars depending on ownership.
- 🌐 **Full-stack dApp** — React UI + CLI + TypeScript API + Compact smart contract.
- 🦺 **Wallet integration** — Works with 1AM Wallet browser extension.
- ⚡ **Standalone mode** — Run locally with Docker, no testnet required.

---

## 🗺️ What This Project Does

The Carbon Credit Tracker lets anyone post a carbon credit record on the Midnight blockchain. When you record a credit, the system generates a **ZK proof** that links your private key to the credit without exposing the key. Only the person who originally recorded it (you) can retire it — proven cryptographically.

This solves a real-world problem: carbon credit double-spending and greenwashing. Every credit is uniquely linked to its owner via ZK math, making it impossible to fake ownership or retire someone else's credit.

---

## 🔐 Privacy Model

| Data | Visibility |
|------|-----------|
| Credit description / message | ✅ Public (on-chain) |
| Contract state (VACANT / OCCUPIED) | ✅ Public |
| Sequence counter | ✅ Public |
| Owner public key (derived) | ✅ Public |
| **Owner's private secret key** | ❌ **Never revealed** |
| **Proof of ownership** | ✅ Verified via ZK proof without revealing key |

**What you prove without revealing:** That you know the secret key which derives to the stored public key — using `persistentHash` in the Compact circuit.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Midnight Compact (`.compact`) |
| Blockchain | Midnight Network (Preprod / Standalone) |
| API | TypeScript |
| CLI | Node.js + ts-node |
| Frontend | React 19 + MUI + Vite |
| Wallet | 1AM Wallet (browser extension) |
| ZK Proofs | Midnight Proof Server (Docker) |
| Indexer | Midnight Indexer GraphQL |

---

## 📁 Folder Structure

```
carbonfootprint-midnight/
├── contract/                    # Compact smart contract
│   └── src/
│       ├── carbon-credit.compact    # Main ZK contract
│       ├── managed/             # Compiled contract + ZK keys
│       └── witnesses.ts         # Private state witnesses
├── api/                         # TypeScript contract interaction API
│   └── src/
│       └── index.ts             # CarbonCreditAPI class
├── carbon-credit-cli/           # CLI for deploying & interacting
│   └── src/
│       ├── index.ts             # Main CLI menu
│       ├── config.ts            # Environment config
│       └── launcher/            # standalone.ts, preprod.ts
├── carbon-credit-ui/            # React frontend
│   └── src/
│       ├── components/          # Board.tsx, EmptyCard, etc.
│       ├── contexts/            # BrowserDeployedBoardManager
│       └── main.tsx
├── vercel.json                  # Vercel deployment config
└── README.md
```

---

## ⚙️ Prerequisites

- Node.js v22+
- Docker Desktop (running)
- [1AM Wallet](https://chromewebstore.google.com/detail/1am/abcdef) browser extension
- Midnight Compact Compiler v0.5.1+
- Git

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/S0SP/carbonfootprint-midnight.git
cd carbonfootprint-midnight

# 2. Install all dependencies
npm install
```

---

## 🔨 Build

```bash
# Build all workspaces (contract, api, cli, ui)
npm run build --workspaces
```

---

## ⚙️ Compile the Smart Contract

The Compact compiler must be installed and WSL must be available:

```bash
cd contract
npm run compact
```

This generates:
- `contract/src/managed/carbon-credit/keys/` — ZK prover & verifier keys
- `contract/src/managed/carbon-credit/zkir/` — ZK intermediate representation

---

## 🚀 Running Locally (Standalone Mode — No Testnet Needed)

This is the recommended way to test. It spins up a local Midnight node via Docker.

```bash
# Step 1: Start the CLI in standalone mode
cd carbon-credit-cli
npm run standalone

# Step 2: Select option 1 — "Deploy a new carbon credit tracker contract"
# Step 3: Copy the deployed contract address from the output
```

**Join an existing contract:**
```bash
npm run standalone
# Select option 2 — "Join an existing carbon credit tracker contract"
# Enter the deployed contract address
```

---

## 🌐 Running the UI Locally

```bash
cd carbon-credit-ui
npm run dev
```

Open `http://localhost:5173` in your browser. Connect your **1AM Wallet** extension.

---

## 🔄 Manual Deployment to Preprod Testnet

> ⚠️ Deployment is intentionally left as a manual step. The app is fully wired.

**Step 1:** Fund your wallet from the faucet:  
`https://midnight-tmnight-preprod.nethermind.dev/`

**Step 2:** Deploy the contract:
```bash
cd carbon-credit-cli
npm run preprod-remote
```
Select `1. Deploy a new carbon credit tracker contract`.

**Step 3:** Copy the output address, e.g.:
```
Deployed contract at address: abc123...
```

**Step 4:** Replace `Pending` in the Contract Address table above with your address.

---

## ✅ After Deployment

The only remaining manual steps are:

1. Deploy the Compact contract (see above).
2. Copy the deployed contract address.
3. Update the README Contract Address table.
4. Add screenshots to the Screenshots section below.
5. Update the Vercel live link.

No additional coding is required.

---

## 🖼️ Screenshots

> _Screenshots coming soon — take them from the running app at `http://localhost:5173`_

| Screen | Preview |
|--------|---------|
| Home / Connect Wallet | _[Add screenshot]_ |
| Deploy Contract | _[Add screenshot]_ |
| Record Carbon Credit | _[Add screenshot]_ |
| Retire Carbon Credit | _[Add screenshot]_ |

---

## 🌍 Live Demo (Vercel)

> **Vercel URL:** _[Add after running `vercel --prod` and connecting your wallet]_

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_NETWORK_ID` | Midnight network (`preprod` / `undeployed`) | `preprod` |
| `VITE_LOGGING_LEVEL` | Logging verbosity | `trace` |

Set in `carbon-credit-ui/.env.preprod` for production builds.

---

## 🐛 Troubleshooting

**ZKConfigurationReadError: Failed to read verifier key**
→ Run `npm run compact` inside the `contract/` folder first, then `npm run build --workspaces`.

**Wallet balance shows 0 / faucet not working**
→ Use standalone mode: `npm run standalone`. The public preprod testnet faucet can be slow.

**`npm run standalone` hangs at health check**
→ Make sure Docker Desktop is running. The first run downloads ~500 MB of ZK parameters.

**UI shows "Could not find Midnight Lace wallet"**
→ Install the [1AM Wallet](https://chromewebstore.google.com) Chrome extension and refresh.

**Vercel build fails**
→ Run `npm run build --workspaces` locally first to confirm the build passes, then push.

---

## 💡 Initial Idea

This project was built for the **Midnight Builder Challenge** / **Rise In Level 1 Bootcamp**.  
The idea: a privacy-preserving **Carbon Credit Tracker** where organizations can record verified carbon offset credits on-chain, with ZK proofs ensuring only the original issuer can retire a credit — preventing double-counting and greenwashing.

---

## 📄 License

MIT © Midnight Foundation / Contributors
