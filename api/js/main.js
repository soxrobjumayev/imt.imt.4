const getUsers = () => {
    let users = document.querySelector('.users')
    let html = ``
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                let user = json[i]
                html = `
                    <div class="card" data-user-id="${user.id}">
                        <div class="id">${user.id}</div>
                        <div class="name">${user.name}</div>
                        <div class="username">${user.username}</div>
                        <div class="email">${user.email}</div>
                        <div class="address">
                            <div class="street">${user.address.street}</div>
                            <div class="suite">${user.address.suite}</div>
                            <div class="city">${user.address.city}</div>
                            <div class="zipcode">${user.address.zipcode}</div>
                            <div class="geo">
                                <a href="https://www.google.com/maps/place/${user.address.geo.lat},${user.address.geo.lng}">Посмотреть на карте</a>
                            </div>
                        </div>
                        <div class="phone">${user.phone}</div>
                        <div class="website"><a href="//${user.website}">${user.website}</a></div>
                        <div class="company">
                            <div class="name">${user.company.name}</div>
                            <div class="catchPhrase">${user.company.catchPhrase}</div>
                            <div class="bs">${user.company.bs}</div>
                        </div>
                    </div>
                `
                users.innerHTML += html
            }
        }).finally(()=>{
        users.querySelectorAll('.card').forEach(element => {
            element.addEventListener('click', (e) => {
                let userId = e.currentTarget.getAttribute('data-user-id')
                getPost(userId)
            })
        })
    });

}
const getPost = (id) => {
    let posts = document.querySelector('.posts')
    let comments = document.querySelector('.comments')
    comments.innerHTML = ``
    posts.innerHTML = ``
    let html = ``
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                let post = json[i]
                html = `
                <div class="card" data-post-id="${post.id}">
                    <div class="title">${post.title}</div>
                    <div class="body">${post.body}</div>
                </div>
            `
                posts.innerHTML += html
            }
        }).finally(() => {
        posts.querySelectorAll('.card').forEach(element => {
            console.log(element)
            element.addEventListener('click', (e) => {
                let postsId = e.currentTarget.getAttribute('data-post-id')
                getComments(postsId)
            })
        })
    });
}

const getComments = (id) => {
    let comments = document.querySelector('.comments')
    comments.innerHTML = ``
    let html = ``
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                let comment = json[i]
                html = `
                <div class="card" data-comments-id="${comment.id}">
                    <div class="name">${comment.name}</div>
                    <div class="email">${comment.email}</div>
                    <div class="body">${comment.body}</div>
                </div>
            `
                comments.innerHTML += html
            }
        });
}

document.addEventListener('DOMContentLoaded', function () {
    getUsers()
});

