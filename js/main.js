const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const inputTitleNode = document.getElementById('titleInput');
const inputTextNode = document.getElementById('textInput');
const publicBtnNode = document.getElementById('publicBtn');
const validationMessageNode = document.getElementById('validationMessage');
const postsNode = document.getElementById('posts');

publicBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
});

inputTitleNode.addEventListener('input', validation);
inputTextNode.addEventListener('input', validation);

function validation() {
    const titleLength = inputTitleNode.value.length;
    const textLength = inputTextNode.value.length;

    if (titleLength > TITLE_VALIDATION_LIMIT) {
        validationMessageNode.innerText = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`;
        validationMessageNode.classList.remove('validationHidden');
        publicBtnNode.disabled = true;
        return;
    };

    if (textLength > TEXT_VALIDATION_LIMIT) {
        validationMessageNode.innerText = `Пост больше ${TEXT_VALIDATION_LIMIT} символов`;
        validationMessageNode.classList.remove('validationHidden');
        publicBtnNode.disabled = true;
        return;
    };

    validationMessageNode.classList.add('validationHidden');
    publicBtnNode.disabled = false;
};

function getPostFromUser() {
    title = inputTitleNode.value;
    text = inputTextNode.value;

    return {
        title,
        text
    };
};

function addPost({title, text}) {
    const currentDate = new Date();
    const dt = `${currentDate.toLocaleDateString()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    posts.push ({
        currentDate,
        dt,
        title,
        text
    });
};

function getPosts() {
    return posts;
};

function renderPosts() {
    const posts = getPosts();

    postsNode.innerHTML = '';

    const currentDate = new Date();

    posts.forEach(post => {

    let minute = ((currentDate - post.currentDate) / 1000 / 60)
    let seconds = ((currentDate - post.currentDate) / 1000)

    const postItem = document.createElement('div');
    const postTime = document.createElement('p');
    const postTitle = document.createElement('p');
    const postText = document.createElement('p');

    postItem.className = 'post-item';
    postTime.className = 'post-time';
    postTitle.className = 'post-title';
    postText.className = 'post-text';

    postTime.innerText = `${Math.round(seconds)} сек. назад`;
    postTitle.innerText = post.title;
    postText.innerText = post.text;

    postsNode.appendChild(postItem);
    postItem.appendChild(postTime);
    postItem.appendChild(postTitle);
    postItem.appendChild(postText);

    postTime.addEventListener('mouseover', function() {
        postTime.innerText = `${post.dt}`
    })

    postTime.addEventListener('mouseout', function() {
        if (seconds >= 60) {
            postTime.innerText = `${Math.round(minute)} мин. назад`
        } else {
            postTime.innerText = `${Math.round(seconds)} сек. назад`
        }
    });    


    if (seconds >= 60) {
        postTime.innerText = `${Math.round(minute)} мин. назад`
    }
    
    });
}