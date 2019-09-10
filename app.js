// Variables
const addNewClient = document.querySelector('#new-client-form'),
    clientLists = document.querySelector('#client-lists')

// Event Listeners
loadAllEvents()
function loadAllEvents() {
    addNewClient.addEventListener('click', addClient)
    clientLists.addEventListener('click', deleteClient)
}

// Functions

// Get client image
const inpFile = document.querySelector('.inpFile'),
    clientImg = document.querySelector('.img-prev')
inpFile.addEventListener('change', function () {
    const file = this.files[0]

    if (file) {
        const reader = new FileReader()

        reader.addEventListener('load', function () {
            clientImg.setAttribute('src', this.result)
        })

        reader.readAsDataURL(file)
    }
})

function addClient(e) {
    // Add client by delegation
    if (e.target.classList.contains('add-client')) {
        // Client Information
        const clientInfo = e.target.parentElement.previousElementSibling

        // Client Information Function
        getClientInfo(clientInfo)

        // Reset form
        clientImg.setAttribute('src', '')
        document.querySelector('#name').value = ''
        document.querySelector('#designation').value = ''
        document.querySelector('#cellNumber').value = ''
        document.querySelector('#address').value = ''
    }

}

// Client Information
function getClientInfo(clientInfo) {
    // Client information object
    const clientInfoObj = {
        image: clientInfo.querySelector('.img-prev').src,
        name: clientInfo.querySelector('#name').value,
        designation: clientInfo.querySelector('#designation').value,
        cellNumber: clientInfo.querySelector('#cellNumber').value,
        address: clientInfo.querySelector('#address').value
    }

    // Add client to the lists
    addClientToLists(clientInfoObj)
}

// Add client to the lists
function addClientToLists(clientInfoObj) {
    // Add information to the column
    clientLists.insertAdjacentHTML('afterbegin', `
        <div class="col-md-3 mt-5 animate">
            <div class="card">
                <img src="${clientInfoObj.image}" class="card-img-top img-fluid">
                <div class="card-body py-2 text-center">
                    <h5 class="card-title">${clientInfoObj.name}</h5>
                    <p class="card-text">${clientInfoObj.designation}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Cell No:</strong> ${clientInfoObj.cellNumber}</li>
                    <li class="list-group-item"><strong>Address:</strong> ${clientInfoObj.address}</li>
                </ul>
                <div class="card-body p-0">
                    <a href="#" class="card-link p-1 bg-light text-center d-block text-danger delete">Delete</a>
                </div>
            </div>
        </div>
    `)
}

// Delete Client
function deleteClient(e) {
    e.preventDefault()
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.classList.add('animate-delete')
        setTimeout(() => {
            e.target.parentElement.parentElement.parentElement.remove()
        }, 300)
    }
}