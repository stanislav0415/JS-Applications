document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3030";
    const catchesUrl = `${baseUrl}/data/catches`;
    const loginUrl = `${baseUrl}/users/login`;
    const registerUrl = `${baseUrl}/users/register`;
    const logoutUrl = `${baseUrl}/users/logout`;

    // Select elements
    const loginForm = document.querySelector("#login-view form");
    const registerForm = document.querySelector("#register-view form");
    const addForm = document.querySelector("#addForm");
    const loadBtn = document.querySelector(".load");
    const addBtn = document.querySelector(".add");
    const logoutBtn = document.getElementById("logout");
    const catchesContainer = document.getElementById("catches");
    const userSection = document.getElementById("user");
    const guestSection = document.getElementById("guest");
    const emailDisplay = document.querySelector(".email span");

    function updateUI() {
        const authToken = localStorage.getItem("authToken");
        const email = localStorage.getItem("email");
        
        if (authToken) {
            userSection.style.display = "inline";
            guestSection.style.display = "none";
            addBtn.disabled = false;
            emailDisplay.textContent = email || "User";
        } else {
            userSection.style.display = "none";
            guestSection.style.display = "inline";
            addBtn.disabled = true;
            emailDisplay.textContent = "guest";
        }
    }
    updateUI();

    // Register User
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();
        const rePass = formData.get("rePass").trim();

        if (password !== rePass) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("email", data.email);
            updateUI();
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    });

    // Login User
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("email", data.email);
            updateUI();
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    });

    // Logout User
    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(logoutUrl, {
                method: "GET",
                headers: { "X-Authorization": localStorage.getItem("authToken") },
            });
            if (response.ok) {
                localStorage.clear();
                updateUI();
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            alert("Logout failed: " + error.message);
        }
    });

    // Load Catches
    loadBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(catchesUrl);
            if (!response.ok) throw new Error("Failed to load catches.");

            const data = await response.json();
            catchesContainer.innerHTML = ""; // Clear current catches

            data.forEach((catchData) => {
                const catchElement = createCatchElement(catchData);
                catchesContainer.appendChild(catchElement);
            });
        } catch (error) {
            alert(error.message);
        }
    });

    // Create Catch
    addForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(addForm);
        const catchData = {
            angler: formData.get("angler").trim(),
            weight: Number(formData.get("weight")),
            species: formData.get("species").trim(),
            location: formData.get("location").trim(),
            bait: formData.get("bait").trim(),
            captureTime: Number(formData.get("captureTime")),
        };

        try {
            const response = await fetch(catchesUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("authToken"),
                },
                body: JSON.stringify(catchData),
            });
            if (!response.ok) throw new Error("Failed to create catch.");

            loadBtn.click(); // Reload catches
        } catch (error) {
            alert("Failed to add catch: " + error.message);
        }
    });

    // Create Catch Element
    function createCatchElement(catchData) {
        const catchDiv = document.createElement("div");
        catchDiv.className = "catch";

        // Set inner HTML
        catchDiv.innerHTML = `
            <label>Angler</label><input type="text" class="angler" value="${catchData.angler}">
            <label>Weight</label><input type="text" class="weight" value="${catchData.weight}">
            <label>Species</label><input type="text" class="species" value="${catchData.species}">
            <label>Location</label><input type="text" class="location" value="${catchData.location}">
            <label>Bait</label><input type="text" class="bait" value="${catchData.bait}">
            <label>Capture Time</label><input type="number" class="captureTime" value="${catchData.captureTime}">
            <button class="update" data-id="${catchData._id}">Update</button>
            <button class="delete" data-id="${catchData._id}">Delete</button>
        `;

        const updateBtn = catchDiv.querySelector(".update");
        const deleteBtn = catchDiv.querySelector(".delete");

        if (catchData._ownerId !== localStorage.getItem("userId")) {
            updateBtn.disabled = true;
            deleteBtn.disabled = true;
        }

        // Update Catch
        updateBtn.addEventListener("click", async () => {
            const updatedData = {
                angler: catchDiv.querySelector(".angler").value.trim(),
                weight: Number(catchDiv.querySelector(".weight").value),
                species: catchDiv.querySelector(".species").value.trim(),
                location: catchDiv.querySelector(".location").value.trim(),
                bait: catchDiv.querySelector(".bait").value.trim(),
                captureTime: Number(catchDiv.querySelector(".captureTime").value),
            };

            try {
                const response = await fetch(`${catchesUrl}/${catchData._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Authorization": localStorage.getItem("authToken"),
                    },
                    body: JSON.stringify(updatedData),
                });
                if (!response.ok) throw new Error("Failed to update catch.");

                loadBtn.click();
            } catch (error) {
                alert("Update failed: " + error.message);
            }
        });

        // Delete Catch
        deleteBtn.addEventListener("click", async () => {
            try {
                const response = await fetch(`${catchesUrl}/${catchData._id}`, {
                    method: "DELETE",
                    headers: { "X-Authorization": localStorage.getItem("authToken") },
                });
                if (!response.ok) throw new Error("Failed to delete catch.");

                loadBtn.click();
            } catch (error) {
                alert("Delete failed: " + error.message);
            }
        });

        return catchDiv;
    }
});
