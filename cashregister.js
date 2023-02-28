function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100; // Convert to pennies, non-decimal
  let cidTotal = 0;
  // Loop to find out cid, cash in drawer
  for (let elem of cid) {
    cidTotal += elem[1] * 100;
  }
  // To check condition if change > cash in drawer, return insufficient funds
  if (change > cidTotal) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // To check condition change === cidTotal, return closed
  else if (change === cidTotal) {
    return { status: "CLOSED", change: cid };
  }
  // To check condition to check if cid > change & can pay exact amount || cid > change & dont have proper amount of each type of moneys
  else {
    let answer = []; // Create an empty placeholder array
    cid = cid.reverse(); // Reverse array from highest to lowest
    // Create an object to check amount of each type of moneys
    let moneyUnits = {
      "ONE HUNDRED": 10000,
      "TWENTY": 2000,
      "TEN": 1000,
      "FIVE": 500,
      "ONE": 100,
      "QUARTER": 25,
      "DIME": 10,
      "NICKEL": 5,
      "PENNY": 1,
    };
    for (let elem of cid) {
      let holder = [elem[0], 0]; // Create an empty array to store all money units that taken out from drawer
      elem[1] = elem[1] * 100;
      // Loop to calculate amount of exact money units required
      while (change >= moneyUnits[elem[0]] && elem[1] > 0) {
        change -= moneyUnits[elem[0]]; // Deduct change to 0 with money units paid from drawer
        elem[1] -= moneyUnits[elem[0]]; // Deduct money units taken from drawer to pay for change
        holder[1] += moneyUnits[elem[0]]/100; // Pass amount deduct to holder variable and change back to dollar
      }
      // To check condition anything not 0 from holder to be push to answer variable 
      if (holder[1] > 0){
        answer.push(holder);
      }
    }
    // To check condition if theres still balance of change after while-loop 
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: answer };
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
