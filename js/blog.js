   // Exlore button functionality //
   document.addEventListener("DOMContentLoaded", () => {
    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    
    readMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
        const content = button.previousElementSibling.querySelector(".Explore");
    
        if (content.style.display === "none" || !content.style.display) {
            content.style.display = "inline";
            button.textContent = "View less";
        } else {
            content.style.display = "none";
            button.textContent = "Explore";
        }
    });
    });
    });