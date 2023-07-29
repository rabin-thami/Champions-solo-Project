import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://champineproject-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const champineInDB = ref(database, "endorsement")

const userMessage = document.querySelector("#userMessage")
const senderUser = document.querySelector("#senderInput")
const receiverUser = document.querySelector("#receiverInput")
const endorsementContainer = document.querySelector("#endorsement")
const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", function(){ 
    validatinForm()
})


onValue (champineInDB, function(snapshot){
    if (snapshot.exists()){

        let itemsArray = Object.values(snapshot.val())
        clearEndorsements()

        for(let i = 0; i < itemsArray.length; i ++ ) {
            let currentItem = itemsArray[i]
            //  console.log(currentItem)
            //  console.log(currentItem.message)
             appendItem(currentItem)
             //console.log(currentItem)
        }

    } else {
        endorsementContainer.textContent = "No Item Found, You can Add from above."
    }
})


function clearEndorsements() {
    const endorsement = document.querySelector("#endorsement")
    endorsement.innerHTML = ""
}

function validatinForm() {
    let message = userMessage.value;
    let sender = senderUser.value;
    let receiver = receiverUser.value;

    if (!message && !sender && !receiver) {
        document.getElementById("userMessage").style.border = "1px solid red";
        document.getElementById("senderInput").style.border = "1px solid red";
        document.getElementById("receiverInput").style.border = "1px solid red";
    } else {
        const data = {
            message: message,
            sender: sender,
            receiver: receiver,
        };

        push(champineInDB, data)
        clearInput()
    }
    
}


function clearInput() {
    userMessage.value = "";
    senderUser.value = "";
    receiverUser.value = "";
}

function appendItem(item) {
    const endorsementList = document.querySelector("#endorsement");
    const endorsementItem = document.createElement("li");
    const receiverElement = document.createElement("p");

    receiverElement.classList.add("text-dec");
    receiverElement.textContent = "To " + item.receiver;

    const messageElement = document.createElement("p");
    messageElement.textContent = item.message;

    const creditSection = document.createElement("div");
    creditSection.classList.add("credit");

    const senderElement = document.createElement("span");
    senderElement.classList.add("text-dec");
    senderElement.textContent = "From " + item.sender;

    const likesElement = document.createElement("span");
    likesElement.classList.add("text-dec");
    likesElement.innerHTML = `<i class="fa-solid fa-heart"></i> ${item.likes || 0}`;

    creditSection.appendChild(senderElement);
    creditSection.appendChild(likesElement);
    endorsementItem.appendChild(receiverElement);
    endorsementItem.appendChild(messageElement);
    endorsementItem.appendChild(creditSection);

    endorsementList.appendChild(endorsementItem);
}
