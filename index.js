showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let addTextTitle = document.getElementById("addTextTitle");

    if(addTextTitle.value === "" && addText.value === ""){
        addTextTitle.setAttribute("placeholder", "Plese Enter Note Title"); 
        addText.setAttribute("placeholder", "Plese Enter content of note");
        return
    }
    else if(addTextTitle.value === "") {
        addTextTitle.setAttribute("placeholder", "Plese Enter Note Title");
        return 
    }
    else if(addText.value === "") {
        addText.setAttribute("placeholder", "Plese Enter content of note");
        return 
    } 

    addText.removeAttribute("placeholder")
    addTextTitle.removeAttribute("placeholder")

    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();

    let newNote = {
        title: addTextTitle.value,
        content: addText.value,
        date: date,
        time: time
    }

    let notes = localStorage.getItem("notes");
    //* if first note
    if (notes == null) {
        noteStorage = [];
    } else {
        noteStorage = JSON.parse(notes);
    }
    noteStorage.push(newNote);

    localStorage.setItem("notes", JSON.stringify(noteStorage));

    addText.value = ""
    addTextTitle.value = ""
    
    showNotes();
});



// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteStorage = [];
    } else {
        noteStorage = JSON.parse(notes);
    }
    let html = "";
    noteStorage.forEach(function (element, index) {
        html += `
    <div class="noteCard my-2 mx-2 card" style="width: 21.5rem; background-color: rgb(197, 197, 197)); ">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 class="card-title"> ${element.title}</h5>
                            </div>
                            <div class="col">
                                <h6 class="card-title ml-5">Note ${index + 1}</h6>
                            </div>
                        </div>
                            <p class="card-text"> ${element.content}</p>
                            <div class="">
                                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary ">Delete Note</button>
                            </div>
                    </div>
                </div>`;
    });
    let notesEle = document.getElementById("notes");
    if (noteStorage.length != 0) {
        notesEle.innerHTML = html;
    } else {
        notesEle.innerHTML = `<h5>Nothing to show! Use "Add a Note" section above to add notes.</h5>`;
    }
}




// Function to delete a note
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteStorage = [];
    } else {
        noteStorage = JSON.parse(notes);
    }

    //* delete from front
    noteStorage.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteStorage));
    showNotes();
}


let search = document.getElementById('searchText');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();

    //* take array of same class
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})



/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/