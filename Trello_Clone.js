document.addEventListener("DOMContentLoaded", (event) => {
  dragAndDrop();
});

function dragAndDrop() {
  function handleDragStart(e) {
    this.style.opacity = "0.4";

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";

    items.forEach(function (item) {
      item.classList.remove("over");
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }

  function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.

    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }

    return false;
  }

  let items = document.querySelectorAll(".lists .list");
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("drop", handleDrop);
  });
}

function addNewList() {
  const divAddList = document.getElementById("addList");

  divAddList.innerHTML = `
    <form>
      <input id="listName" type="text" placeholder="Enter List Title..." />
      <button class="addList-btn" type="submit" onclick="addList(this)">Add list</button>
      <a href="#" onclick="cancelAddList(this)">X</a>
    </form>`;
}

function cancelAddList(btnCancelAddList) {
  btnCancelAddList.parentElement.outerHTML =
    '<button id="btn-add" type="submit" onclick="addNewList()">+ Add a list...</button>';
}

function addList(btnAddList) {
  const container = document.querySelector(".lists");
  var name = document.getElementById("listName").value;

  container.innerHTML += `
    <div draggable="true" class="list">
      <h3>${name}</h3>
      <div class="cardContainer"></div>
      <div>
        <button onclick="addNewCard(this)" class="btn">+ Add a card...</button>         
      </div>
    </div>`;

  cancelAddList(btnAddList.nextElementSibling);
}

function addNewCard(btnAddNewCard) {
  /*
  const list = event.target.closest(".list");
  const contenedor = list.querySelector(".contenedor");
  
  const contenedor = element.parentElement.previousElementSibling;
  */

  btnAddNewCard.outerHTML = `
  <form>
    <input type="text" placeholder="Enter Card Title..." />
    <button class="addList-btn" onclick="addCard(this)">Add card</button>
    <a href="#" onclick="cancelAddCard(this)">X</a>
  </form>`;
}

function cancelAddCard(btnCancelAddCard) {
  btnCancelAddCard.parentElement.outerHTML =
    '<button onclick="addNewCard(this)" class="btn">+ Add a card...</button>';
}

function addCard(btnAddCard) {
  const cardName = btnAddCard.previousElementSibling.value;

  const container = btnAddCard.closest(".list").querySelector(".cardContainer");

  container.innerHTML += `<div draggable="true" class="card">${cardName}</div>`;

  cancelAddCard(btnAddCard.nextElementSibling);
}
