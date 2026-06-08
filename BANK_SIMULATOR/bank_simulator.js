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

const date = Date.now();

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
// const { log, info } = require("console");
// const transaction_schema = {
//   username: current_user,
//   amount: Number,
//   transaction_type: String,
//   transaction_time: date.toString(),
// };
const transaction_schema = (() => {
  if (current_user) {
    return {
      username: current_user,
      amount: Number,
      transaction_type: String,
      transaction_time: date.toString(),
    };
  }
})

const transaction_history = [];

let current_user = '';
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

function deposite(req) {
  if (current_user != req.username) {
    return {
      status: 401,
      success: false,
      body: {
        message: "You are not logged in.",
      },
    };
  }
  balance_info[current_user].balance += req.amount;
  entry_transaction(transaction_schema(), req.amount, 'deposite');
  return {
    status: 200,
    success: true,
    body: {
      message: "Deposited successfully.",
      balance: 'You have ' + balance_info[current_user].balance + ' in your account.'
    },
  };
}

function withdraw(req) {
  if (current_user != req.username) {
    return {
      status: 401,
      success: false,
      body: {
        message: "You are not logged in.",
      },
    };
  }
  if (balance_info[current_user].balance < req.amount) {
    return {
      status: 400,
      success: false,
      body: {
        message: "Insufficient balance.",
      },
    };
  }
  balance_info[current_user].balance -= req.amount;
  entry_transaction(transaction_schema(), req.amount, 'withdraw');
  return {
    status: 200,
    success: true,
    body: {
      message: "Withdrawn successfully.",
      balance: 'You have ' + balance_info[current_user].balance + ' in your account.'
    },
  };
}

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
function get_transaction_history() {
  if (!transaction_history) {
    return {
      status: 404,
      success: false,
      body: {
        message: "No transaction occurred."
      }
    }
  }
  return {
    status: 200,
    success: true,
    body: {
      message: "Transacion fetched.",
      history: transaction_history
    }
  }
}

function entry_transaction(transaction_schema, amount, transaction_type) {
  transaction_schema.amount = amount;
  transaction_schema.transaction_type = transaction_type;
  transaction_history.push(transaction_schema);
}
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

      if (req.path == "/deposite") {
        return deposite(req.body);
      }
      if (req.path == "/withdraw") {
        return withdraw(req.body);
      }
      break;
    case "GET":
      if (req.path == "/view_balance") {
        return view_balance(req.body);
      }
      if (req.path === '/transaction_history'){
        return get_transaction_history()
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
      // break;
    case "view_balance":
      return {
        method: "GET",
        path: "/view_balance",
        body: {
          username: data.username,
        },
      };
      // break;
    case "deposite":
      return {
        method: "POST",
        path: "/deposite",
        body: {
          username: data.username,
          amount: data.amount,
        },
      };
      // break;
    case "withdraw":
      return {
        method: "POST",
        path: "/withdraw",
        body: {
          username: data.username,
          amount: data.amount,
        },
      };
    // break;
    case "transaction_history":
      return {
        method: "GET",
        path: "/transaction_history",
        body: {
          username : current_user
        }
      };
      // break;
    default:
      console.log('--------------','Invalid request')

  }
};

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
        (function choice_handler() {
          rl.question("Enter your choice: ", (choice) => {
            switch (choice) {
              case "1":
                rl.question("Enter the amount to deposite: ", (amount) => {
                  amount = Number(amount);
                  const is_valid = !isNaN(amount) && amount > 0 && amount % 1 === 0;
                  if (!is_valid) {
                    console.log("---------------", "Invalid amount.");
                    choice_handler();
                  }
                  else {
                    const deposite_res = banking_simulator(
                      create_request({ username: current_user, amount: Number(amount) }, "deposite"),
                    );
                    if (deposite_res.status === 401) {
                      console.log("---------------", deposite_res.body.message);
                    } else {
                      console.log("---------------", deposite_res.body.message, deposite_res.body.balance);
                      choice_handler();
                    }
                  }
                });
                break;
              case "2":
                rl.question("Enter the amount to withdraw: ", (amount) => {
                  amount = Number(amount);
                  const is_amount_valid = !isNaN(amount) && amount > 0 && amount % 1 === 0;
                  if (!is_amount_valid) {
                    console.log("---------------", "Invalid amount.");
                    choice_handler();
                  }
                  else {
                    const withdraw_res = banking_simulator(
                      create_request({ username: current_user, amount: Number(amount) }, "withdraw"),
                    );
                    if (withdraw_res.status === 401) {
                      console.log("---------------", withdraw_res.body.message);
                    } else {
                      console.log("---------------", withdraw_res.body.message, withdraw_res.body.balance);
                      choice_handler();
                    }
                  }
                });
                break;
              case "3":
                const vwb_res = banking_simulator(
                  create_request({ username: current_user }, "view_balance"),
                );
                if (vwb_res.status === 401) {
                  console.log("---------------", vwb_res.body.message);
                } else {
                  console.log("---------------", vwb_res.body.message, vwb_res.body.balance);
                }
                choice_handler();
                break;
              case "4":
                console.log("transaction");
                break;
              case "5":
                const trs_res = banking_simulator(
                  create_request({username:current_user},"transaction_history")
                );
                if (trs_res.status === 404){
                  console.log("---------------", trs_res.body.message);
                }else{
                  console.log("---------------", trs_res.body.message,trs_res.body.history);
                }
                choice_handler()
                break;
              default:
                console.log('--------------','Invalid chooice')
                choice_handler()

            }
          });
        })();
      }
    });
  }



  function main() {
    //for login
    console.log(`Login to your account.`);
    trylogin();
  };

  main();