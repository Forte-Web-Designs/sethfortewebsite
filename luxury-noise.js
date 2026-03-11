(function() {
    var svgNoise = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;opacity:0.04;"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>';
    document.body.insertAdjacentHTML('beforeend', svgNoise);
})();
