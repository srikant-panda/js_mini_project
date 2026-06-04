# JavaScript Mini Projects

A personal collection of small JavaScript projects built to practice core concepts—functions, callbacks, CLI input, and simple request/response patterns—without frameworks.

## Projects

**In Progress** Bank Simulator · *(more projects will be added here as they are started)*

| Status        | Project         | Folder            |
|---------------|-----------------|-------------------|
| In Progress   | Bank Simulator  | `BANK_SIMULATOR/` |

---

## Bank Simulator

**Status:** In Progress  
**Path:** `BANK_SIMULATOR/`

CLI-based banking simulator written in plain JavaScript. It mimics a small HTTP-style flow: build a request object, pass it through a central handler, and return a structured response.

### Planned features

1. Deposit  
2. Withdraw  
3. View balance  
4. Transaction  
5. Transaction history  

### What works today

- Login with username and password (structured `status` / `success` / `body` response)
- View balance after login
- CLI menu via `readline` (callbacks for user input)

### Still to do

- Deposit and withdraw (handler routes exist; logic is commented out)
- Transaction and transaction history (menu placeholders only)
- Full menu loop after each action

### Run

```bash
node BANK_SIMULATOR/bank_simulator.js
```

### Notes

See `BANK_SIMULATOR/note.md` for architecture notes and learnings (CLI input, `readline`, callbacks).

### Sample users (for testing)

| Username     | Password        |
|--------------|-----------------|
| srikantp09   | Srikant#6861    |
| rahul        | Rahul           |

---

## Adding a new project

1. Create a folder (e.g. `MY_PROJECT/`).  
2. Add your code and a short `note.md` if helpful.  
3. Update the **Projects** line and table in this README with the project name and status (`Planned`, `In Progress`, or `Completed`).
