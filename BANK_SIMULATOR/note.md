# Bank Simulator — Notes

A simple CLI banking system built with plain JavaScript functions to practice functions, callbacks, and a small request/response pattern (similar to HTTP, but without a real server).

**File:** `bank_simulator.js`  
**Run:** `node BANK_SIMULATOR/bank_simulator.js`

---

## Goal

Practice core JavaScript concepts:

- Plain functions and module-level state
- Callbacks with Node's `readline` (async CLI input)
- A central router that dispatches by `method` + `path`
- Structured responses: `{ status, success, body }`

---

## Architecture

The app runs in a loop from the terminal:

```
main()
  → trylogin()           // prompt username/password, retry on failure
  → choice_handler()     // menu loop after successful login
       → create_request(data, goal)   // build a request object
       → banking_simulator(req)      // route to the right service
       → print response
```

### Layers

| Layer | Functions | Role |
|-------|-----------|------|
| CLI | `main`, `trylogin`, `choice_handler`, `input_handler`, `cli_data` | Read input, show menu, call the simulator |
| Request builder | `create_request` | Turn user action into `{ method, path, body }` |
| Router | `banking_simulator` | Match method + path, call service, return response |
| Services | `login`, `deposite`, `withdraw`, `view_balance`, `get_transaction_history`, `entry_transaction` | Business logic |
| Data | `users`, `balance_info`, `transaction_history`, `current_user` | In-memory storage |

---

## Data

### Users (login)

| Username   | Password     | Starting balance |
|------------|--------------|------------------|
| srikantp09 | Srikant#6861 | 10000            |
| rahul      | Rahul        | 5000             |

- `users` — array of `{ username, password }`
- `balance_info` — object keyed by username: `{ balance }`
- `current_user` — string, set after successful login
- `transaction_history` — array of transaction records pushed by `entry_transaction`

### Transaction record shape

Each deposit/withdraw creates an entry like:

```json
{
  "username": "srikantp09",
  "amount": 500,
  "transaction_type": "deposite",
  "transaction_time": "1710000000000"
}
```

Built via `transaction_schema()` and filled in by `entry_transaction`.

---

## API routes (inside `banking_simulator`)

| Method | Path                   | Handler                  | Status |
|--------|------------------------|--------------------------|--------|
| POST   | `/login`               | `login`                  | Done   |
| POST   | `/deposite`            | `deposite`               | Done   |
| POST   | `/withdraw`            | `withdraw`               | Done   |
| GET    | `/view_balance`        | `view_balance`           | Done   |
| GET    | `/transaction_history` | `get_transaction_history` | Done |

Menu option **4 (transaction)** is still a placeholder — it only prints `"transaction"` and does not call the router yet.

---

## Request & response format

### Request

```json
{
  "method": "POST",
  "path": "/login",
  "body": {
    "username": "srikantp09",
    "password": "Srikant#6861"
  }
}
```

`create_request(data, goal)` builds these. Goals: `"login"`, `"deposite"`, `"withdraw"`, `"view_balance"`, `"transaction_history"`.

### Response

```json
{
  "status": 200,
  "success": true,
  "body": {
    "message": "User logged in.",
    "current_user": "srikantp09"
  }
}
```

Common status codes used:

| Status | Meaning |
|--------|---------|
| 200    | Success |
| 400    | Bad request (e.g. insufficient balance, invalid method) |
| 401    | Not logged in or wrong password |
| 404    | User not found |

---

## CLI menu

After login:

```
1. deposite
2. withdraw
3. view balance
4. transaction          ← not implemented yet
5. transaction histroy
```

- Deposit and withdraw validate amount: must be a positive whole number.
- Withdraw checks `balance_info[current_user].balance` before deducting.
- After most actions, the menu runs again via `choice_handler()`.
- Failed login retries with `trylogin()`.

---

## What works today

- Login with username/password
- Deposit (updates balance + logs transaction)
- Withdraw (insufficient-balance check + logs transaction)
- View balance
- Transaction history (lists past deposits/withdrawals)
- Full menu loop after each action (except menu option 4)

## Still to do

- **Transfer / transaction (menu 4)** — no service or route yet
- **`transaction_schema`** — IIFE does not return a value when `current_user` is empty; timestamp is set once at file load (`Date.now()`), not per transaction
- **`get_transaction_history`** — empty array is truthy, so "no transactions" 404 path never runs; should check `transaction_history.length === 0`
- **Withdraw error handling in CLI** — insufficient balance (400) is not handled separately in the menu; only 401 is checked
- **Logout** — no way to switch users without restarting the process
- **README sync** — root `README.md` still lists deposit/withdraw as todo; update when polishing docs

---

## Learnings (CLI & callbacks)

Getting input from the CLI in Node is not as direct as in some other languages. I use the built-in `readline` module:

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", (name) => {
  // callback runs when user presses Enter — async, not blocking
});
```

`rl.question` is asynchronous: execution continues, and the callback runs later when the user submits input. Nested questions (name, then password) mean nested callbacks. That was the hardest part of this project, but working through it made callbacks much clearer.

`input_handler` wraps the login prompts and passes `(name, passwd)` to a callback so `trylogin` can stay readable.

---

## Quick reference — main functions

```javascript
function main()              // entry: print login message, call trylogin
function create_request()    // { method, path, body } from a goal string
function banking_simulator() // switch on method + path, return structured res
function login()             // validate user, set current_user
function deposite()          // add to balance, log transaction
function withdraw()          // check balance, subtract, log transaction
function view_balance()      // return current balance string
function get_transaction_history() // return all logged transactions
function entry_transaction() // push one record into transaction_history
```
