This is an BOB Dev SDK project bootstrapped with `npx bob-dev-sdk create my-bitcoin-dapp`.

## Getting Started

Open the project in [Visual Studio Code](https://code.visualstudio.com/).

## Installation

The application is split into two directories, `frontend`, and `contracts`; for the frontend and smart contracts respectively.

The recommended way to use the IDE for this setup is to open a new [split terminal](https://code.visualstudio.com/docs/terminal/basics#:~:text=Multiple%20terminals%20can%20be%20placed,tab%20on%20the%20terminal%20panel.)
inside your VS Code window; one for each directory.
This way, you can work simultaneously on the frontend and smart contracts.

First, install the dependencies for each directory. See the sections below for more information:

1. [frontend](#frontend) - setup the frontend for your Bitcoin Dapp
2. [contracts](#contracts) - setup the smart contracts

### frontend

```bash
# 1. Change directory to the frontend folder
cd frontend

# 2. Install dependencies
yarn

# 3. Start the frontend
yarn dev
```

### contracts

```bash
# 1. Change directory to the contracts folder
cd contracts

# 2. Install dependencies
yarn

# 3. Build the contracts (optional)
yarn build
```

You'll now be able to view your frontend at [http://localhost:3000](http://localhost:3000).
