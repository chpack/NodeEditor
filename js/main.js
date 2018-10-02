NodeEditor = {};
NE = NodeEditor;

currentStatus = {};
CS = currentStatus

function initNodeEditor() {
    NE.editorArea = this.document.getElementById("editor_area");
    NE.editorView = this.document.getElementById("editor_view");
    NE.minimap = this.document.getElementById("minimap");
    NE.minimapCanvas = this.document.getElementById("minimap_canvas");
    NE.minimapView = this.document.getElementById("minimap_view");
    NE.scaleLevel = [0.25, 0.267943366, 0.287174589, 0.307786103, 0.329876978, 0.353553391, 0.378929142, 0.406126198, 0.435275282, 0.466516496, 0.5, 0.535886731, 0.574349177, 0.615572207, 0.659753955, 0.707106781, 0.757858283, 0.812252396, 0.870550563, 0.933032992, 1, 1.071773463, 1.148698355, 1.231144413, 1.319507911, 1.414213562, 1.515716567, 1.624504793, 1.741101127, 1.866065983, 2, 2.143546925, 2.29739671, 2.462288827, 2.639015822, 2.828427125, 3.031433133, 3.249009585, 3.482202253, 3.732131966, 4, 4.28709385, 4.59479342, 4.924577653, 5.278031643, 5.656854249, 6.062866266, 6.498019171, 6.964404506, 7.464263932, 8, 8.5741877, 9.18958684, 9.849155307, 10.55606329, 11.3137085, 12.12573253, 12.99603834, 13.92880901, 14.92852786, 16, 17.1483754, 18.37917368, 19.69831061, 21.11212657, 22.627417, 24.25146506, 25.99207668, 27.85761803, 29.85705573, 32];

    CS.mouseX = 0;
    CS.mouseY = 0;
    CS.scaleindex = 20;
    CS.scale = 1;
    CS.area = "normal";
    CS.mouseL = false;
    CS.mouseR = false;
    CS.minimapRate = 0.1;
    CS.areaW = 4000;
    CS.areaH = 4000;

    editorViewResize();
    editorViewReplace();
    minimapResize();
    minimapReplace();
}

window.onload = initNodeEditor

function editorViewReplace() {
    NE.editorView.scrollTo(1000, 1000);
}

function editorViewResize() {
    NE.editorView.style.height = window.innerHeight + "px";
    NE.editorView.style.width = window.innerWidth + "px";
}

function minimapResize() {
    NE.minimap.style.width = NE.editorArea.offsetWidth * CS.minimapRate + "px";
    NE.minimap.style.height = NE.editorArea.offsetHeight * CS.minimapRate + "px";
    NE.minimapView.style.width = NE.editorView.offsetWidth * CS.minimapRate / CS.scale + "px";
    NE.minimapView.style.height = NE.editorView.offsetHeight * CS.minimapRate / CS.scale + "px";
}

function minimapReplace() {
    NE.minimapView.style.left = NE.editorView.scrollLeft * CS.minimapRate / CS.scale + "px";
    NE.minimapView.style.top = NE.editorView.scrollTop * CS.minimapRate / CS.scale + "px";
}

function trans(rot, sca) {
    NE.editorArea.style.transform = "rotate(" + rot + "deg) scale(" + sca + "," + sca + ")";
}

function scale(times) {
    var di = times > 0 ? 1 : -1;
    var newIndex = CS.scaleindex + di;
    newIndex = newIndex < 0 ? 0 : newIndex;
    newIndex = newIndex >= NE.scaleLevel.length ? NE.scaleLevel.length - 1 : newIndex;

    var newScale = NE.scaleLevel[newIndex];
    var oldScale = NE.scaleLevel[CS.scaleindex]

    CS.scaleindex = newIndex
    CS.scale = newScale;

    NE.editorArea.style.transform = "scale(" + CS.scale + "," + CS.scale + ")";
    NE.editorView.scrollLeft += (CS.mouseX - CS.areaW / 2) * (newScale - oldScale);
    NE.editorView.scrollTop += (CS.mouseY - CS.areaH / 2) * (newScale - oldScale);
    minimapResize();
    minimapReplace();
}

window.onresize = function () {
    editorViewResize();
    editorViewReplace();
}

// document.addEventListener("keyup", keyEvent)
// document.addEventListener("keydown", keyEvent)

document.addEventListener("mousemove", function (e) {
    CS.mouseX = e.offsetX;
    CS.mouseY = e.offsetY;
    // if ((CS.area == "move") && CS.mouseR) {
    if (e.shiftKey && CS.mouseR) {
        NE.editorView.scrollTop -= e.movementY;
        NE.editorView.scrollLeft -= e.movementX;
        minimapReplace();
    }
})


document.addEventListener('contextmenu', function (e) {
    // if (CS.area != "normal")
    e.preventDefault();
})

document.addEventListener('mousedown', function (e) {
    if (e.button == 0) CS.mouseL = true
    if (e.button == 2) CS.mouseR = true
    e.preventDefault();
})
document.addEventListener('mouseup', function (e) {
    if (e.button == 0) CS.mouseL = false
    if (e.button == 2) CS.mouseR = false
    e.preventDefault();
})

document.addEventListener('wheel', function (e) {
    if (CS.area != "normal")
        e.preventDefault();
    if (e.shiftKey) {
        scale(-e.deltaY)
    }
})