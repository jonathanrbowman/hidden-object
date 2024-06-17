document.addEventListener("DOMContentLoaded", function() {
    randomizeHiddenObjects();

    let hiddenCount = 0;
    const svgContainer = document.getElementById("svg-container");
    const svgElement = svgContainer.querySelector("svg");
    const hiddenCountEl = document.getElementById("hidden-count");
    const jsConfetti = new JSConfetti();
    const loadingEl = document.getElementById("loading-container");
    const statusBarText = document.getElementById("status-bar__text");
    const hiddenElements = svgElement.querySelectorAll(".hidden");

    setTimeout(function() {
        loadingEl.classList.add("off-screen");
        setTimeout(function() {
            loadingEl.remove();
        }, 1600);
    }, 5000);

    const panZoomInstance = Panzoom(svgElement, {
        contain: "outside",
        center: true,
        panOnlyWhenZoomed: true,
        minScale: 1,
        maxScale: 8,
    });

    svgContainer.addEventListener("touchstart", panZoomInstance.handleTouchStart, { passive: true });
    svgContainer.addEventListener("touchmove", panZoomInstance.handleTouchMove, { passive: true });
    svgContainer.addEventListener("touchend", panZoomInstance.handleTouchEnd, { passive: true });

    hiddenElements.forEach(function(element) {
        hiddenCount ++;
        
        element.addEventListener("click", function() {
            const isHiddenEl = element.classList.contains("hidden");
            const alreadyFound = element.classList.contains("found");

            if (isHiddenEl && !alreadyFound) {
                element.classList.add("found");
                element.style.fill = "#00b4d8";
                hiddenCount --;
                hiddenCountEl.textContent = hiddenCount;
            }

            if (hiddenCount == 0) {
                statusBarText.textContent = "You Win!!!"

                jsConfetti.addConfetti({
                    confettiNumber: 250,
                });

                setInterval(function() {
                    jsConfetti.addConfetti({
                        confettiNumber: 250,
                    });
                }, 1800);
            }
        });
    });

    hiddenCountEl.textContent = hiddenCount;
});

function handleReset() {
    if (confirm("Really start over?")) {
        location.reload();
    }
}

function randomizeHiddenObjects() {
    const objectsToMake = 15;
    const hiddenObjects = document.querySelectorAll("#hidden-objects > g");
    const svg = document.querySelector("#svg-container > svg");
    const svgWidth = svg.viewBox.baseVal.width;
    const svgHeight = svg.viewBox.baseVal.height;
    const minSize = 0.85;
    const maxSize = 1.25;
    let iterator = 0;

    while (iterator < objectsToMake) {
        iterator ++;
        const
    }

    hiddenObjects.forEach(object => {
        const bbox = object.getBBox();
        const randomScale = Math.random() * (maxSize - minSize) + minSize;
        const scaledWidth = bbox.width * randomScale;
        const scaledHeight = bbox.height * randomScale;
        const maxX = svgWidth - scaledWidth;
        const maxY = svgHeight - scaledHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        object.setAttribute("transform", `translate(${randomX}, ${randomY})`);
    });
}
