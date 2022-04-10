let currentPage = 1

const usersPerPage = 5

function deleteUser(userId) {
    users = users.filter(user => {
        return user.id !== userId
    })
    if(currentPage > Math.ceil(users.length / usersPerPage)) changePage(currentPage-1)
    render()
}

function getTotalPages() {
    return Math.ceil(users.length / usersPerPage)
}

function getCurrentPageUsers() {
    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    return users.slice(startIndex, endIndex)
}

// function createCardInfo(user) {
//     const cardInfo = document.createElement('td')
//     cardInfo.classList.add('user-card-info')

//     const userName = document.createElement('td')
//     userName.textContent = user.first_name + ' ' + user.last_name

//     const userEmail = document.createElement('td')
//     userEmail.textContent = user.email

//     const userCreationData = document.createElement('p')
//     userCreationData.textContent = user.created_at

//     cardInfo.appendChild(userName)
//     cardInfo.appendChild(userEmail)
//     cardInfo.appendChild(userCreationData)

//     return cardInfo

// }

function createButtonElement(textContent) {
    const ButtonElement = document.createElement('button')
    ButtonElement.type = 'button'
    ButtonElement.textContent = textContent

    return ButtonElement
}

// function createCardActions(user) {
//     const cardActions = document.createElement('td')
//     cardActions.classList.add('user-card-actions')

//     const editButton = createButtonElement('editar')
//     editButton.classList.add('edit-button')

//     const deleteButton = createButtonElement('excluir')
//     deleteButton.classList.add('delete-button')
//     deleteButton.addEventListener('click', () =>  deleteUser(user.id))


//     cardActions.appendChild(editButton)
//     cardActions.appendChild(deleteButton)

//     return cardActions
// }


function createHeaderRow() {
    const headerRow = document.createElement('tr')

    const headerName = document.createElement('th')
    headerName.textContent = 'Nome'

    const headerEmail = document.createElement('th')
    headerEmail.textContent = 'Email'

    const headerCreationData = document.createElement('th')
    headerCreationData.textContent = 'Cadastrado em'

    const headerEditButton = document.createElement('th')

    const headerDeleteButton = document.createElement('th')

    headerRow.appendChild(headerName)
    headerRow.appendChild(headerEmail)
    headerRow.appendChild(headerCreationData)
    headerRow.appendChild(headerEditButton)
    headerRow.appendChild(headerDeleteButton)

    return headerRow
}

function createUserRow(user) {
    const userCard = document.createElement('tr')
    userCard.id = user.id
    userCard.classList.add('user-row')

    const userName = document.createElement('td')
    userName.textContent = user.first_name + ' ' + user.last_name

    const userEmail = document.createElement('td')
    userEmail.textContent = user.email

    const userCreationData = document.createElement('td')
    userCreationData.textContent = user.created_at

    const userEditButton = document.createElement('td')
    const editButton = createButtonElement('editar')
    editButton.classList.add('edit-button')
    userEditButton.appendChild(editButton)

    const userDeleteButton = document.createElement('td')
    const deleteButton = createButtonElement('excluir')
    deleteButton.classList.add('delete-button')
    deleteButton.addEventListener('click', () =>  deleteUser(user.id))
    userDeleteButton.appendChild(deleteButton)
    

    userCard.appendChild(userName)
    userCard.appendChild(userEmail)
    userCard.appendChild(userCreationData)
    userCard.appendChild(userEditButton)
    userCard.appendChild(userDeleteButton)
    

    return userCard
}

function createUsersRows(usersData) {
    return usersData.map(createUserRow);
}

function renderUsers() {
    const usersData = getCurrentPageUsers()
    const usersCards = createUsersRows(usersData)
    const headerRow = createHeaderRow()

    const usersContainer = document.querySelector('.users-table')

    usersContainer.replaceChildren();

    console.log(usersCards)

    usersContainer.appendChild(headerRow)

    usersCards.forEach(userCard => {
        usersContainer.appendChild(userCard)
    })
}

function changePage(newPage) {
    const totalPages = getTotalPages()
    if(newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage
        render()
    }
}

function createPrevPageButton() {
    const prevPageButton = createButtonElement('<<')
    prevPageButton.addEventListener('click', () => {
        changePage(currentPage - 1)
    })

    return prevPageButton
}

function createNextPageButton() {
    const nextPageButton = createButtonElement('>>')
    nextPageButton.addEventListener('click', () => {
        changePage(currentPage + 1)
    })

    return nextPageButton
}

function createPaginationButton(page) {
    const paginationButton = createButtonElement(page)
    if(page == currentPage) paginationButton.classList.add('active')
    paginationButton.addEventListener('click', () => changePage(page))

    return paginationButton;
}

function renderPagination(totalPages) {
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()

    if(totalPages) {
        const prevPageButton = createPrevPageButton()
        pagination.appendChild(prevPageButton)

        for(let page = 1; page <= totalPages; page++) {
            const paginationButton = createPaginationButton(page)
            pagination.appendChild(paginationButton)
        }

        const nextPageButton = createNextPageButton()
        pagination.appendChild(nextPageButton)
    }
}

function render() {
    const totalPages = getTotalPages()
    renderUsers()
    renderPagination(totalPages)
}

render();