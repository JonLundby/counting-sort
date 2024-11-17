import { sleep } from "../controller/controller.js";

export function initView() {
    console.log("hello from VIEW");
}

export function createVisualUnsortedArray(model) {
    const containerValue = document.querySelector("#unsorted-value-container");
    const containerIndex = document.querySelector("#unsorted-index-container");
    containerValue.innerHTML = "";
    containerIndex.innerHTML = "";

    let i = 0;
    for (const element of model) {
        const valueBox = document.createElement("div");
        const indexBox = document.createElement("div");

        valueBox.classList.add("value-box");
        indexBox.classList.add("index-box");
        valueBox.textContent = element;
        indexBox.textContent = i;
        i++;

        containerValue.insertAdjacentElement("beforeend", valueBox);
        containerIndex.insertAdjacentElement("beforeend", indexBox);
    }
}

export function createVisualCountingArray(model) {
    const containerValue = document.querySelector("#counting-value-container");
    const containerIndex = document.querySelector("#counting-index-container");
    containerValue.innerHTML = "";
    containerIndex.innerHTML = "";

    let i = 0;
    for (const element of model) {
        const valueBox = document.createElement("div");
        const indexBox = document.createElement("div");

        valueBox.classList.add("value-box");
        indexBox.classList.add("index-box");
        valueBox.textContent = element;
        indexBox.textContent = i;
        i++;

        containerValue.insertAdjacentElement("beforeend", valueBox);
        containerIndex.insertAdjacentElement("beforeend", indexBox);
    }
}

export function createVisualSortedArray(model) {
    const containerValue = document.querySelector("#sorted-value-container");
    const containerIndex = document.querySelector("#sorted-index-container");
    containerValue.innerHTML = "";
    containerIndex.innerHTML = "";

    let i = 0;
    for (const element of model) {
        const valueBox = document.createElement("div");
        const indexBox = document.createElement("div");

        valueBox.classList.add("value-box");
        indexBox.classList.add("index-box");
        valueBox.textContent = "_";
        indexBox.textContent = i;
        i++;

        containerValue.insertAdjacentElement("beforeend", valueBox);
        containerIndex.insertAdjacentElement("beforeend", indexBox);
    }
}

export function updateVisualCountingArray(model, i) {
    const visualCountingIndexes = document.querySelectorAll("#counting-value-container .value-box");

    // for (let i = 0; i < model.length; i++) {
    visualCountingIndexes[i].textContent = model[i];
    // }
}

export function updateVisualSortedArray(model, i) {
    const visualSortedIndexes = document.querySelectorAll("#sorted-value-container .value-box");
    console.log(i);
    

    // for (let i = 0; i < model.length; i++) {
    visualSortedIndexes[i].textContent = model[i];
    // }
}

export function addHighlight(VisualBox) {}

export function removeHighlight(VisualBox) {}
