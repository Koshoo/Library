let myLibrary = [];
const bookTable = document.querySelector(".book-table");
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector("#form");
let index = 0;

function Book(author, title, pages, isRead) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.isRead = isRead;
	this.index = index;
	index++;
}

let lotr = new Book("J.R.R Tolkien", "Lord of The Rings", 490, "Yes");
createBookRow(lotr);

//creating a book row and adding to book to the library
function createBookRow(book) {
	myLibrary.push(book);
	tableRow = document.createElement("tr");
	tableRow.className = index - 1;

	for (let prop in book) {
		if (prop != "index") {
			if (prop == "isRead") {
				tableData = document.createElement("td");
				tableData.className = "read-" + (index - 1)
				tableData.textContent = book[prop];
				tableRow.appendChild(tableData);
			} else {
				tableData = document.createElement("td");
				tableData.textContent = book[prop];
				tableRow.appendChild(tableData);
			}
		}
	}
	addDeleteBtn(tableRow);
	addClearBtn(tableRow);
	appendRow(tableRow);
}

function appendRow(tableRow) {
	bookTable.appendChild(tableRow);
}

function addDeleteBtn(tableRow) {
	let deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete Book";
	deleteBtn.setAttribute("data-index", index - 1);

	addDeleteBtnListener(deleteBtn);
	tableRow.appendChild(deleteBtn);

}

function addClearBtn(tableRow) {

	let changeReadbtn = document.createElement("button")
	changeReadbtn.textContent = "Change read status"
	changeReadbtn.setAttribute("data-index", index - 1)

	addReadBtnListener(changeReadbtn)
	tableRow.appendChild(changeReadbtn)
}



function addDeleteBtnListener(deleteBtn) {

	deleteBtn.addEventListener("click", function (e) {
		let bookPop = myLibrary.pop();
		let currentEle = document.getElementsByClassName(e.path[0].attributes[0].textContent);
		bookTable.removeChild(currentEle[0]);

		for (let i = 0; i < myLibrary.length; i++) {
			if (bookPop.index != e.path[0].attributes[0].textContent) {
				myLibrary.push(bookPop);
				bookPop = myLibrary.pop();
			}
		}
	});
}

function addReadBtnListener(changeReadbtn) {
	changeReadbtn.addEventListener("click", function (e) {
		console.log("k")
		let readTextEle = document.querySelector(".read-" + e.path[0].attributes[0].value)
		console.log(readTextEle)
		if(readTextEle.textContent == "Yes"){
			readTextEle.textContent = "No"
		}else{
			readTextEle.textContent = "Yes"
		}
	})
}

//Show form on button click
newBookBtn.addEventListener("click", () => {
	form.style.display = "block";
});

//Getting input when submiting
form.addEventListener("submit", (e) => {
	let author = form.elements[0].value;
	let title = form.elements[1].value;
	let pages = form.elements[2].value;
	let read = form.elements[3].checked ? "Yes" : "No";
	let book = new Book(author, title, pages, read);

	form.style.display = "none";
	e.preventDefault();
	e.target.reset();
	createBookRow(book);
});