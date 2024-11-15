"use strict";

import * as view from "../view/view.js";

window.addEventListener("load", initApp);

let unsortedArr = [];
let countingArr = [];
let sortedArr = [];

function initApp() {
    // eventlisteners
    document.querySelector("#create-array-btn").addEventListener("click", createInitialArrayModels);
    document.querySelector("#sort-btn").addEventListener("click", countingSort);
}

function createInitialArrayModels() {
    const size = document.querySelector("#input-array-size").value;
    let maxRandomValue = 0;

    // nulstil arrays
    unsortedArr = [];
    countingArr = [];
    sortedArr = [];

    // push nye random værdier mellem 0-7 til det unsortedArr
    for (let i = 0; i < size; i++) {
        const randomValue = Math.floor(Math.random() * 7);
        unsortedArr.push(randomValue);

        if (randomValue > maxRandomValue) {
            maxRandomValue = randomValue;
        }
    }

    // sætter counting array længde til højeste værdi i unsortedArr og fylder alle index pladser med 0'er
    countingArr.length = maxRandomValue;
    countingArr.fill(0);

    sortedArr.length = unsortedArr.length
    sortedArr.fill("_")

    view.createVisualUnsortedArray(unsortedArr);
    view.createVisualCountingArray(countingArr);
    view.createVisualSortedArray(sortedArr)
}

function countingSort() {
    console.log("sorting");
}
