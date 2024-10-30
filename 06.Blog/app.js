function attachEvents() {
    const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
  
    let btnLoadPosts = document.getElementById("btnLoadPosts");
    let postsSelect = document.getElementById("posts");
    let btnViewPost = document.getElementById("btnViewPost");
    let postTitle = document.getElementById("post-title");
    let postContent = document.getElementById("post-body");
  
    btnLoadPosts.addEventListener("click", handleLoadPosts);
    btnViewPost.addEventListener("click", handleViewPosts);
  
    let commonData = {};
  
    function handleLoadPosts() {
      fetch(postsUrl)
        .then((res) => res.json())
        .then((data) => addPost(data));
  
      function addPost(data) {
        commonData = data;
        postsSelect.innerHTML = "";
  
        for (let [id, postInfo] of Object.entries(data)) {
          let option = document.createElement("option");
          option.value = id;
          option.textContent = postInfo.title;
          postsSelect.appendChild(option);
        }
      }
    }
  
    function handleViewPosts() {
      let selectedPostId = postsSelect.value; 
      if (!selectedPostId) return;
  
      postTitle.textContent = commonData[selectedPostId].title;
      postContent.textContent = commonData[selectedPostId].body;
  
      fetch(commentsUrl)
        .then((res) => res.json())
        .then((data) => handleComment(data, selectedPostId)); 
  
      function handleComment(data, postId) {
        let commentsUI = document.getElementById("post-comments");
        commentsUI.innerHTML = "";
  
        for (let commentInfo of Object.values(data)) {
          if (commentInfo.postId === postId) { 
            let li = document.createElement("li");
            li.id = commentInfo.id;
            li.textContent = commentInfo.text;
            commentsUI.appendChild(li);
          }
        }
      }
    }
  }
  
  attachEvents();
  