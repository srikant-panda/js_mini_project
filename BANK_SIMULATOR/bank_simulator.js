// /**
//  * To practice the function and all the basic thigs it js
//  * first i build a small project of banking semulator.
//  * features:-
//  *      1.deposite
//  *      2.withdraw
//  *      3.view balance
//  *      4.transaction
//  *      5.transaction histroy
//  *      6.just basic things using functions
//  */

// //-----------------Banking simeulator------------------------

// const date = Date.now();

const balance_info = {
  srikantp09: {
    balance: 10000,
  },
  rahul: {
    balance: 5000,
  },
};
const users = [
  {
    username: "srikantp09",
    password: "Srikant#6861",
  },
  {
    username: "rahul",
    password: "Rahul",
  },
];
const { log, info } = require("console");
// const transaction_schema = {
//   username: get_current_user(),
//   amount: Number,
//   transaction_type: String,
//   transaction_time: date.toString(),
// };

// const transaction_history = [];

let current_user = "";
// const current_user_balance = NaN;

// function get_current_user() {
//   if (current_user == "") {
//     login();
//   }
//   return current_user;
// }
// function get_current_user_balance() {
//   if (current_user == "") {
//     login();
//   }
//   return current_user_balance;
// }

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function login(data) {
  let user = null;
  for (let i of users) {
    if (i.username === data.username) {
      user = i;
    }
    if (user) {
      break;
    }
  }
  if (!user) {
    return {
      status: 404,
      success: false,
      body: {
        message: "User doesnot exist.",
      },
    };
  }
  if (user.password != data.password) {
    return {
      status: 401,
      success: false,
      body: {
        message: "Invalid credentials.",
      },
    };
  }
  current_user = data.username;
  return {
    status: 200,
    success: true,
    body: {
      message: "User logged in.",
      current_user: current_user,
    },
  };
}

// function deposite(amount, username) {
//   current_user = get_current_user();
//   //   if (username != current_user) {
//   //     console.log("You are not logged in.");
//   //     return;
//   //   }
//   balances[current_user].balance += amount;
//   console.log(`Deposited ${amount} successfully.`);
// }

// function withdraw(amount, username) {
//   current_user = get_current_user();
//   //   if (username != current_user) {
//   //     console.log("You are not logged in.");
//   //     return;
//   //   }
//   if (balances[current_user].balance < amount) {
//     console.log("Insufficient balance.");
//     return;
//   }
//   balances[current_user].balance -= amount;
//   console.log(`Withdrawn ${amount} successfully.`);
// }

function view_balance(req) {
  if (current_user != req.username) {
    return {
      status: 401,
      success: false,
      body: {
        message: "You are not logged in.",
      },
    };
  }
  return {
    status: 200,
    success: true,
    body: {
      message: "Fetch balance successfully.",
      balance: 'You have ' + balance_info[current_user].balance + ' in your account.',
    },
  };
}

// function entry_transaction(transaction_schema, amount, transaction_type) {
//   transaction_schema.amount = amount;
//   transaction_schema.transaction_type = transaction_type;
//   transaction_history.push(transaction_schema);
// }
function banking_simulator(req) {
  if (!req) {
    return {
      status: 400,
      success: false,
      body: {
        message: "No request provided.",
      },
    };
  }
  switch (req.method) {
    case "POST":
      if (req.path == "/login") {
        return login(req.body);
      }
      if (req.path == "/view_balance") {
        return view_balance(req.body);
      }
      if (req.path == "/deposite") {
        return deposite(req.body.amount, req.body.username);
      }
      if (req.path == "/withdraw") {
        return withdraw(req.body.amount, req.body.username);
      }
      break;
    default:
      return {
        status: 400,
        success: false,
        body: {
          message: "Invalid request method.",
        },
      };
  }
}

function create_request(data, goal) {
  switch (goal) {
    case "login":
      return {
        method: "POST",
        path: "/login",
        body: {
          username: data.username,
          password: data.password,
        },
      };
    case "view_balance":
      return {
        method: "POST",
        path: "/view_balance",
        body: {
          username: data.username,
        },
      };
  }
}

function input_handler(callback) {
  rl.question("Enter your name: ", (name) => {
    rl.question("Enter your password: ", (passwd) => {
      callback(name, passwd);
      // rl.close();
    });
  });
}

// cli entites
function cli_data() {
  console.log(`
    1. deposite
    2. withdraw
    3. view balance
    4. transaction
    5. transaction histroy
    `);
}

function trylogin() {
  input_handler((name, passwd) => {
    const data = { username: name, password: passwd };
    const login_res = banking_simulator(create_request(data, "login"));
    if (login_res.status === 404 || login_res.status === 401) {
      console.log("---------------", login_res.body.message);
      trylogin();
    } else {
      console.log("---------------", login_res.body.message);
      cli_data();
      rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
          case "1":
            console.log("deposite");
            break;
          case "2":
            console.log("withdraw");
            break;
          case "3":

            const vwb_res = banking_simulator(
              create_request({ username: current_user }, "view_balance"),
            );
            if (vwb_res.status === 401) {
              console.log("---------------", vwb_res.body.message);
            }
            console.log("---------------", vwb_res.body.balance);

            break;
          case "4":
            console.log("transaction");
            break;
          case "5":
            console.log("transaction histroy");
            break;
        }
      });
    }
  });
}

function main() {
  //for login
  console.log(`Login to your account.`);
  trylogin();
}

main();
