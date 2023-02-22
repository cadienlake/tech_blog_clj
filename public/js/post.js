const addComment = async (event) => {
  event.preventDefault();
  const body = document.querySelector("#comment-body").value.trim();
  if (body) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/post/${id}`, {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    }
  }
};

const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  if (title && body) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update post");
    }
  }
};

function showComment() {
  document.querySelector(".new-comment-form").classList.remove("hidden");
  document.querySelector(".update-post-form").classList.add("hidden");
}

function showUpdate() {
  document.querySelector(".update-post-form").classList.remove("hidden");
  document.querySelector(".new-comment-form").classList.add("hidden");
}

document.querySelector(".new-comment-form").addEventListener("click", addComment);
document.querySelector(".show-comment").addEventListener("click", showComment);

document.querySelector(".update-post-form").addEventListener("click", updatePost);
document.querySelector(".show-update").addEventListener("click", showUpdate);
