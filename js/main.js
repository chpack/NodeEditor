NodeEditor = {};
NE = NodeEditor;

currentStatus = {};
CS = currentStatus

function initNodeEditor() {
    NE.view = $("#editor_view");
    NE.bg = $("#background")
    NE.pad = $("#pad")

    NE.map = {}
    NE.map.view = $("#map");
    NE.map.pad = $("#map_pad");
    NE.map.bg = $("#map_background");

    NE.scaleLevel = [0.25, 0.267943366, 0.287174589, 0.307786103, 0.329876978, 0.353553391, 0.378929142, 0.406126198, 0.435275282, 0.466516496, 0.5, 0.535886731, 0.574349177, 0.615572207, 0.659753955, 0.707106781, 0.757858283, 0.812252396, 0.870550563, 0.933032992, 1, 1.071773463, 1.148698355, 1.231144413, 1.319507911, 1.414213562, 1.515716567, 1.624504793, 1.741101127, 1.866065983, 2, 2.143546925, 2.29739671, 2.462288827, 2.639015822, 2.828427125, 3.031433133, 3.249009585, 3.482202253, 3.732131966, 4, 4.28709385, 4.59479342, 4.924577653, 5.278031643, 5.656854249, 6.062866266, 6.498019171, 6.964404506, 7.464263932, 8, 8.5741877, 9.18958684, 9.849155307, 10.55606329, 11.3137085, 12.12573253, 12.99603834, 13.92880901, 14.92852786, 16, 17.1483754, 18.37917368, 19.69831061, 21.11212657, 22.627417, 24.25146506, 25.99207668, 27.85761803, 29.85705573, 32];

    CS.mouse = {}
    CS.mouse.X = 0;
    CS.mouse.Y = 0;
    CS.mouse.move = true;

    CS.mouseL = false;
    CS.mouseR = false;

    CS.scaleindex = 20;
    CS.scale = 1;

    CS.area = "normal";
    CS.minimapRate = 0.1;

    editorViewReset();
    minimapReset();

    $(document).contextmenu(function (e) {
        if (CS.mouse.move)
            e.preventDefault();
    });

    $(document).mousemove(function (e) {
        // updata mouse position.
        CS.mouse.X = e.pageX - NE.pad.offset().left;
        CS.mouse.Y = e.pageY - NE.pad.offset().top;

        // right button to move pad.
        if (e.which == 3) {
            var dx = e.originalEvent.movementX;
            var dy = e.originalEvent.movementY;

            // if (dx == 0 && dy == 0)
            //     CS.mouse.move = false;
            // else
            //     CS.mouse.move = true;
            // move background.
            NE.bg.css("background-position", function (i, v) {
                x = parseInt(v.split(" ")[0], 10) + dx;
                y = parseInt(v.split(" ")[1], 10) + dy;
                return x + "px " + y + "px";
            })

            // move pad
            NE.pad.css({
                "left": function (i, v) {
                    return parseInt(v, 10) + dx + "px";
                },
                "top": function (i, v) {
                    return parseInt(v, 10) + dy + "px";
                }
            })
        }
    });

    $(document).resize(function () { 
        editorViewReset()
    });

}

$(document).ready(initNodeEditor)

// Reset editor View.
function editorViewReset() {
    NE.view.height(window.innerHeight)
    NE.view.width(window.innerWidth)
}

// Reset minimap's width and height.
function minimapReset() {
    // CS.miniW = NE.editorArea.offsetWidth * CS.minimapRate;
    // CS.miniH = NE.editorArea.offsetHeight * CS.minimapRate;

    // NE.minimap.style.width = CS.miniW + "px";
    // NE.minimap.style.height = CS.miniH = "px";
    // NE.map.width
    // (NE.area.width() 
    // * CS.minimapRate)
    // NE.map.height(NE.area.height() * CS.minimapRate)

}

// // Reset minimap view scale and position.
// function minimapViewReset() {
//     NE.minimapView.style.width = CS.miniW * CS.areaW / CS.windowW / CS.scale + "px";
//     NE.minimapView.style.height = CS.miniH * CS.areaH / CS.windowH / CS.scale + "px";

//     NE.minimapView.style.left = NE.editorView.scrollLeft * CS.minimapRate + "px";
//     NE.minimapView.style.top = NE.editorView.scrollTop * CS.minimapRate + "px";
// }

// // Scale editor area.
// function scale(times) {
//     var di = times > 0 ? 1 : -1;
//     var newIndex = CS.scaleindex + di;
//     newIndex = newIndex < 0 ? 0 : newIndex;
//     newIndex = newIndex >= NE.scaleLevel.length ? NE.scaleLevel.length - 1 : newIndex;

//     var newScale = NE.scaleLevel[newIndex];
//     var oldScale = NE.scaleLevel[CS.scaleindex]

//     CS.scaleindex = newIndex
//     CS.scale = newScale;
//     NE.editorArea.style.transform = "scale(" + CS.scale + "," + CS.scale + ")";

//     NE.editorView.scrollLeft += (CS.mouseX - CS.areaW / 2) * (newScale - oldScale);
//     NE.editorView.scrollTop += (CS.mouseY - CS.areaH / 2) * (newScale - oldScale);

//     minimapViewReset();
// }



// document.addEventListener("mousemove", function (e) {
//     console.log(NE.editorView.scrollLeft, NE.editorView.scrollTop)
//     CS.mouseX = e.offsetX;
//     CS.mouseY = e.offsetY;
//     // if ((CS.area == "move") && CS.mouseR) {
//     if (e.shiftKey && CS.mouseR) {
//         NE.editorView.scrollTop -= e.movementY;
//         NE.editorView.scrollLeft -= e.movementX;
//         minimapViewReset();
//     }
// })


// document.addEventListener('wheel', function (e) {
//     if (CS.area != "normal")
//         e.preventDefault();
//     if (e.shiftKey) {
//         scale(-e.deltaY)
//     }
//     e.preventDefault();
// })

// document.addEventListener("show", function (e) {
//     e.preventDefault();
// })