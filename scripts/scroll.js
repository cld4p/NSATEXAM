document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector('.year-selector-container');
    var track = document.querySelector('.year-track');
    var items = document.querySelectorAll('.year-item');

    if (!container || !track || items.length === 0) return;

    var currentIndex = 0;
    var isAnimating = false;

    function updateCarousel() {
        var itemHeight = 70; 
        var middleIndex = (items.length - 1) / 2;
        
        var offset = (middleIndex - currentIndex) * itemHeight;

        track.style.transform = 'translateY(' + offset + 'px)';

        for (var i = 0; i < items.length; i++) {
            if (i === currentIndex) {
                items[i].classList.add('active');
            } else {
                items[i].classList.remove('active');
            }
        }
    }

    var textBodies = document.querySelectorAll('.text-body');

    container.addEventListener('wheel', function(e) {
        e.preventDefault(); 

        if (isAnimating) return;


        if (e.deltaY > 0 && currentIndex < items.length - 1) {
            currentIndex++; 
        } else if (e.deltaY < 0 && currentIndex > 0) {
            currentIndex--; 
        } else {
            return; 
        }

        updateCarousel();

        isAnimating = true;
        setTimeout(function() {
            isAnimating = false;
        }, 600);

    }, { passive: false });

    updateCarousel();
});