document.querySelector('#nav-bar').addEventListener('click', (item) => {
   
    const link = item.target.closest(".nav-item");

    if(link) {
        window.location.href = link.dataset.page + ".html";
    }

});