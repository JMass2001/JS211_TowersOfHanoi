"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// "STACKS" \\
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// "PRINT STACKS" \\

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// "MOVING STACKS" \\

const movePiece = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    let popped = stacks[startStack].pop();

    stacks[endStack].push(popped);
    console.log(`${popped} has been moved from ${startStack} to ${endStack}`);
    printStacks();
  }
};

// "ILLEGAL/LEGAL MOVES" \\

const isLegal = (startStack, endStack) => {
  const startStackArray = stacks[startStack];
  const endStackArray = stacks[endStack];

  if (startStackArray.length === 0) {
    console.log("The start stack is empty, no number to move.");
    return false;
  }

  const valueToMove = startStackArray[startStackArray.length - 1];

  if (
    endStackArray.length === 0 ||
    valueToMove <= endStackArray[endStackArray.length - 1]
  ) {
    return true;
  } else {
    console.log(
      `Illegal move: You cannot place ${valueToMove} on top of ${
        endStackArray[endStackArray.length - 1]
      }`
    );
    return false;
  }
};

// "CHECKING FOR WIN" \\
const checkForWin = () => {
  const numOfDisks = stacks.a.length + stacks.b.length + stacks.c.length;

  if (stacks.b.length === numOfDisks || stacks.c.length === numOfDisks) {
    console.log("Congratulations! You've won!");
    return true;
  }
  return false;
};

const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
};

const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// "TESTS" \\

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
