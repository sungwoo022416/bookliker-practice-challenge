const URL = "http://localhost:3000/books";
const listPanel = document.querySelector("#list-panel");
const showPanel = document.querySelector("#show-panel");

document.addEventListener("DOMContentLoaded", () => {
    fetch(URL)
    .then(res => res.json())
    .then(bookArray => renderBooks(bookArray))

});

function renderBooks(bookArray) {
    bookArray.forEach(book => renderBook(book));
}

function renderBook(book) {
    let li = document.createElement("li");
    li.dataset.id = book.id;

    let titleNode = document.createElement("text");
    titleNode.textContent = book.title;

    listPanel.appendChild(li);
    li.appendChild(titleNode);

    li.addEventListener("click", event => {
        event.preventDefault();

        renderBookDetail(book);
    });

}
function renderBookDetail(book) {
    showPanel.innerHTML = "";
    
    let imageNode = document.createElement("img");
    imageNode.src = book.img_url;

    let titleNode = document.createElement("h2");
    titleNode.textContent = book.title;

    let subtitleNode = document.createElement("h2");
    subtitleNode.textContent = book.subtitle;

    let authorNode = document.createElement("h2");
    authorNode.textContent = book.author;

    let descriptionNode = document.createElement("p");
    descriptionNode.textContent = book.description;

    let userNode = document.createElement("ul");
    userNode.classList.add("users-list");
    
        book.users.forEach(user => {
        let userListNode = document.createElement("li");
        userListNode.dataset.id = user.id;
        userListNode.textContent = user.username;

        userNode.append(userListNode);
       
        });
    let buttonNode = document.createElement("button");
    buttonNode.textContent = "LIKE";

    showPanel.append(imageNode, titleNode, subtitleNode, authorNode, descriptionNode, userNode, buttonNode);

    buttonNode.addEventListener("click", event => {
        event.preventDefault();

        increaseLike(book, userNode);
    })
}

    function increaseLike (book, userNode) {
        const id = book.id;
        let users = book.users;
        users.push({"id":1, "username":"pouros"});

        const newUsers = {
            users
        }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUsers)
    }

    fetch(URL + `/${id}`,configObj)
    .then(res => res.json())
    .then(obj => {
        let userListNode = document.createElement("li");
        userListNode.dataset.id = obj.users[obj.users.length -1].id;
        userListNode.textContent = obj.users[obj.users.length -1].username;

        userNode.append(userListNode)})
    }
