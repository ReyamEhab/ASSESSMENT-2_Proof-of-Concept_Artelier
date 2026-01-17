const API_URL = "http://localhost:5000/api/posts";

// READ
async function getPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();

  document.getElementById("posts").innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">Edit</button>
      <button onclick="deletePost('${post._id}')">Delete</button>
    </div>
  `).join("");
}

// CREATE or UPDATE
async function createOrUpdatePost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const postId = document.getElementById("postId").value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  if (postId) {
    await fetch(`${API_URL}/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
  }

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("postId").value = "";

  getPosts();
}

// LOAD INTO FORM
function editPost(id, title, content) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  document.getElementById("postId").value = id;
}

// DELETE
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  getPosts();
}

getPosts();
