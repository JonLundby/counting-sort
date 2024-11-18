"use strict";
import * as view from "../view/view.js";

export { timer };

window.addEventListener("load", initApp);

let unsortedArr = [];
let countingArr = [];
let sortedArr = [];
let maxRandomValue = 0;
let timer;

function initApp() {
    // eventlisteners
    document.querySelector("#create-array-btn").addEventListener("click", createInitialArrayModels);
    document.querySelector("#sort-btn").disabled = true;
    document.querySelector("#sort-btn").addEventListener("click", () => {
        document.querySelector("#sort-btn").disabled = true;
        countingPhase();
    });

    timer = document.querySelector("#timer-input").value;
    document.querySelector("#timer-input").addEventListener("change", () => {
        timer = document.querySelector("#timer-input").value;
    });
}

function createInitialArrayModels() {
    const size = document.querySelector("#input-array-size").value;
    const inputValueMax = Number(document.querySelector("#max-number-value").value) + 1;
    maxRandomValue = 0;

    // nulstil arrays
    unsortedArr = [];
    countingArr = [];
    sortedArr = [];

    // push nye random værdier til det unsortedArr
    for (let i = 0; i < size; i++) {
        const randomValue = Math.floor(Math.random() * inputValueMax);
        unsortedArr.push(randomValue);

        if (randomValue > maxRandomValue) {
            maxRandomValue = randomValue;
        }
    }

    // sætter counting array længde til højeste værdi i unsortedArr og fylder alle index pladser med 0'er
    countingArr.length = maxRandomValue + 1;
    countingArr.fill(0);

    sortedArr.length = unsortedArr.length;
    sortedArr.fill("_");

    view.createVisualUnsortedArray(unsortedArr);
    view.createVisualCountingArray(countingArr);
    view.createVisualSortedArray(sortedArr);

    document.querySelector("#sort-btn").disabled = false;
}

// optælling af værdier
async function countingPhase() {
    for (let i = 0; i < unsortedArr.length; i++) {
        let countingArrIndex = unsortedArr[i];

        countingArr[unsortedArr[i]]++;

        view.updateVisualCountingArray(countingArr, countingArrIndex);
        await sleep(timer);
    }

    cumulativePhase();
}

// kumulativ opsummering af countingArr
async function cumulativePhase() {
    for (let i = 1; i < countingArr.length; i++) {
        countingArr[i] += countingArr[i - 1];

        view.updateVisualCountingArray(countingArr, i);
        await sleep(timer);
    }

    sortPhase();
}

// sortering af usorterede værdier gennem countingArr og indexes
async function sortPhase() {
    for (let i = unsortedArr.length - 1; i >= 0; i--) {
        let countingArrIndex = unsortedArr[i];
        let sortedArrIndex = countingArr[unsortedArr[i]] - 1;

        sortedArr[countingArr[unsortedArr[i]] - 1] = unsortedArr[i];
        countingArr[unsortedArr[i]] = countingArr[unsortedArr[i]] - 1;

        view.updateVisualCountingArray(countingArr, countingArrIndex);
        view.updateVisualSortedArray(sortedArr, sortedArrIndex);
        await sleep(timer);
    }
}

// en sleep/helper funktion
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
