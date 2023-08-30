const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const inputTitleNode = document.getElementById('titleInput');
const inputTextNode = document.getElementById('textInput');
const publicBtnNode = document.getElementById('publicBtn');
const validationMessageNode = document.getElementById('validationMessage');
const postsNode = document.getElementById('posts');
const titleCounter = document.getElementById('titleCounter');
const textCounter = document.getElementById('textCounter');

publicBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    checkInputLength();

    renderPosts();

    clearInput();
});

inputTitleNode.addEventListener('input', validation);
inputTextNode.addEventListener('input', validation);

function validation() {
    const titleLength = inputTitleNode.value.length;
    const textLength = inputTextNode.value.length;
    const titleCount = TITLE_VALIDATION_LIMIT - inputTitleNode.value.length;
    const textCount = TEXT_VALIDATION_LIMIT - inputTextNode.value.length;
    titleCounter.innerText = `Осталось ${titleCount} символов`;
    textCounter.innerText = `Осталось ${textCount} символов`;

    if (titleCount < 0) {
        titleCounter.style.color = 'red';
    } else {
        titleCounter.style.color = 'black';
    };

    if (textCount < 0) {
        textCounter.style.color = 'red';
    } else {
        textCounter.style.color = 'black';
    };

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

function checkInputLength() {
    if (inputTitleNode.value === "" || inputTextNode.value.length === 0) {
        publicBtnNode.disabled = true;   
    };
}

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
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    // const dt = `${currentDate.toLocaleDateString()} ${currentDate.getHours()}:${currentDate.getMinutes('default', options)}`;

    posts.push ({
        currentDate,
        // dt,
        options,
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

    let minute = ((currentDate - post.currentDate) / 1000 / 60);
    let seconds = ((currentDate - post.currentDate) / 1000);

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
        postTime.innerText = `${post.currentDate.toLocaleDateString('default', post.options)}`;
    });

    postTime.addEventListener('mouseout', function() {
        if (seconds >= 60) {
            postTime.innerText = `${Math.round(minute)} мин. назад`
        } else {
            postTime.innerText = `${Math.round(seconds)} сек. назад`
        }
    });    


    if (seconds >= 60) {
        postTime.innerText = `${Math.round(minute)} мин. назад`
    };
    
    });
};

function clearInput() {
    inputTitleNode.value = '';
    inputTextNode.value = '';

    const titleCount = TITLE_VALIDATION_LIMIT - inputTitleNode.value.length;
    const textCount = TEXT_VALIDATION_LIMIT - inputTextNode.value.length;

    titleCounter.innerText = `Осталось ${titleCount} символов`;
    textCounter.innerText = `Осталось ${textCount} символов`;
}