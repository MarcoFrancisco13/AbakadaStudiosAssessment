let games = []

var app = new function () {

    // Onclick functions to enable the modal screen to appear 
    var addModal = document.getElementById("addModal");
    var editModal = document.getElementById("editModal");
    var addBtn = document.getElementById("addBtn");
    var addCloseBtn = document.getElementById("addCloseBtn");
    var editCloseBtn = document.getElementById("editCloseBtn");

    addCloseBtn.onclick = function () {
        addModal.style.display = "none";
    }

    editCloseBtn.onclick = function () {
        editModal.style.display = "none";
    }

    addBtn.onclick = function () {
        addModal.style.display = "block";

        // Reset text fields when entering a game
        document.getElementById('addName').value = ""
        document.getElementById('addGenre').value = ""
        document.getElementById('addDeveloper').value = ""
        document.getElementById('addPrice').value = ""
        document.getElementById('addStoreLink').value = ""
        document.getElementById('addImageLink').value = ""
        document.getElementById('addReleaseDate').value = ""
    }

    window.onclick = function (event) {
        if (event.target == addModal) {
            addModal.style.display = "none";
        }
        else if (event.target == editModal) {
            editModal.style.display = "none";
        }
    }


    // Counter to keep track of how many games there are in the list 
    this.Count = function (data) {
        var el = document.getElementById('counter');
        var name = 'Wish list is currently empty';


        if (data) {
            if (data == 1) {
                name = 'Game';
            }
            else if (data > 1) {
                name = 'Games'
            }
            el.innerHTML = data + ' ' + name;
        } else {
            el.innerHTML = name;
        }

    };



    this.Add = function () {
        document.getElementById('addModal').style.display = 'none';

        let game = {
            name: document.getElementById('addName').value,
            genre: document.getElementById('addGenre').value,
            developer: document.getElementById('addDeveloper').value,
            price: document.getElementById('addPrice').value,
            storeLink: document.getElementById('addStoreLink').value,
            imageLink: document.getElementById('addImageLink').value,
            releaseDate: document.getElementById('addReleaseDate').value

        }

        games.push(game);
        this.Count();
        this.BuildScreen();

        console.warn('added', { game });
    };

    this.BuildScreen = function () {
        var el = document.getElementById("MainBody");
        var data = ''
        totalPrice = 0;

        // Previous body is cleared out so as to avoid duplicate items
        el.innerHTML = ""

        // For loop used to cycle through each component in the games array and building it with the corresponding data 
        if (games.length > 0) {
            for (i = 0; i < games.length; i++) {
                totalPrice = Number(totalPrice) + Number(games[i].price)
                data += `
                            <hr class="solid">
                            <div id = "game-component" style="display: flex" class = "content">
                                <div style="flex: 1;">
                                    <img class = "image" src="steam_logo.png" alt="Steam Image">
                                </div>
                                <div style="flex: 3;">
                                    <table>
                                        <tr>
                                            <td><h1>Game Title: ${games[i].name}</h1></td>
                                        </tr>
                                        <tr>
                                            <td><p>Genre: ${games[i].genre}<p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Developer: ${games[i].developer}<p></td>
                                        </tr>
                                        <tr>
                                            <td><p class="price">Price in Philippine Peso: Php ${games[i].price}<p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Store Link URL: ${games[i].storeLink}<p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Cover Image URL: ${games[i].imageLink}<p></td>
                                        </tr>
                                        <tr>
                                            <td><p>Release Date: ${games[i].releaseDate}<p></td>
                                        </tr>
                                    </table>
                                    <button class="button" id="myBtn" onclick="app.Edit(${i})">Edit</button>
                                </div>                     
                            </div>
                            `
            }
        }

        // updating the total # of games currently in the array with console messages for debugging
        this.Count(games.length);
        document.getElementById("totalPrice").innerHTML = "Total Price: Php " + totalPrice;
        console.warn('added', { data });
        console.warn('price: ', { totalPrice });
        return el.innerHTML += data;
    };

    this.Edit = function (item) {
        document.getElementById('editModal').style.display = 'block';

        // Prepopulating fields with current game details
        document.getElementById('editName').value = games[item].name
        document.getElementById('editGenre').value = games[item].genre
        document.getElementById('editDeveloper').value = games[item].developer
        document.getElementById('editPrice').value = games[item].price
        document.getElementById('editStoreLink').value = games[item].storeLink
        document.getElementById('editImageLink').value = games[item].imageLink
        document.getElementById('editReleaseDate').value = games[item].releaseDate

        // Overwriting previous game details with the current ones in the input fields
        document.getElementById('saveEdit').onsubmit = function () {
            games[item].name = document.getElementById('editName').value
            games[item].genre = document.getElementById('editGenre').value
            games[item].developer = document.getElementById('editDeveloper').value
            games[item].price = document.getElementById('editPrice').value
            games[item].storeLink = document.getElementById('editStoreLink').value
            games[item].imageLink = document.getElementById('editImageLink').value
            games[item].releaseDate = document.getElementById('editReleaseDate').value

            document.getElementById('editModal').style.display = 'none';
            app.BuildScreen()

        };

        // Delete Function makes use of the index passed into the edit modal 
        document.getElementById('deleteBtn').onclick = function () {
            console.warn('deleted game #', { item });
            games.splice(item, 1)

            document.getElementById('editModal').style.display = 'none';

            app.BuildScreen()

        }

        app.BuildScreen()
    }
}

app.BuildScreen()