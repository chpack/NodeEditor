function CurrentStatus() {
    this.mouse = {
        X: 0,
        Y: 0,
        moved: true,
        update: function (pageX, pageY) {
            this.X = pageX - NE.pad.offset().left;
            this.Y = pageY - NE.pad.offset().top;
        }
    };

    this.scaleindex = 20;
    this.scale = 1;

    this.area = "normal";
    this.minimapRate = 0.1;

}

$(document).ready(function () {
    NE = new NodeEditor();
    CS = new CurrentStatus();

    $(document).mousemove(function (e) {
        // updata mouse position.
        CS.mouse.update(e.pageX, e.pageY);

        // right button to move pad.
        if (e.which == 3) {
            var dx = e.originalEvent.movementX;
            var dy = e.originalEvent.movementY;

            if (dx == 0 && dy == 0)
                CS.mouse.move = false;
            else
                CS.mouse.move = true;

            // move background and pad.
            NE.bg.move(dx, dy);
            NE.pad.move(dx, dy);
        }
    });

    $(window).resize(function () {
        editorViewReset();
    });

    $(document).contextmenu(function (e) {
        if (CS.mouse.moved)
            e.preventDefault();
    });

})


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