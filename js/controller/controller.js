"use strict";

import * as view from "../view/view.js";

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
    document.querySelector("#sort-btn").addEventListener("click", countingPhase);

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

    // push nye random værdier mellem 0-7 til det unsortedArr
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

async function countingPhase() {
    // optælling af værdier
    for (let i = 0; i < unsortedArr.length; i++) {
        let countingArrIndex = unsortedArr[i];

        countingArr[unsortedArr[i]]++;

        view.updateVisualCountingArray(countingArr, countingArrIndex);
        await sleep(timer);
    }

    cumulativePhase();
}

async function cumulativePhase() {
    // kumulativ opsummering af countingArr
    for (let i = 1; i < countingArr.length; i++) {
        countingArr[i] += countingArr[i - 1];

        view.updateVisualCountingArray(countingArr, i);
        await sleep(timer);
    }

    sortPhase();
}

async function sortPhase() {
    // sortering af usorterede værdier gennem countingArr og indexes
    for (let i = unsortedArr.length - 1; i >= 0; i--) {
        let countingArrIndex = unsortedArr[i];
        let sortedArrIndex; // bliver senere sat til at være en værdi fra countinArr baseret på en værdi fra unsortedArr, først laves opdatering af modellen

        // finder værdien af et index i counting array baseret på en værdi fra unsorted array
        sortedArr[countingArr[unsortedArr[i]] - 1] = unsortedArr[i];
        // trækker 1 fra værdien i countingArr
        countingArr[unsortedArr[i]] = countingArr[unsortedArr[i]] - 1;
        
        sortedArrIndex = countingArr[unsortedArr[i]];

        view.updateVisualCountingArray(countingArr, countingArrIndex);
        view.updateVisualSortedArray(sortedArr, sortedArrIndex);
        await sleep(timer);
    }
}

// en sleep/helper funktion
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
