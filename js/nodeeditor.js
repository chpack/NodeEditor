function NodeEditor() {
    this.view = $("#editor_view");
    // Reset editor View.
    this.view.reset = function () {
        this.height(window.innerHeight)
        this.width(window.innerWidth)
    }
    this.view.back = function () {
        NE.pad.moveTo(NE.view.width() / 2, NE.view.height() / 2)
    }

    this.pad = $("#pad");
    this.pad.move = function (dx, dy) {
        this.css({
            "left": function (i, v) { return parseInt(v, 10) + dx + "px"; },
            "top": function (i, v) { return parseInt(v, 10) + dy + "px"; }
        });
    };
    this.pad.moveTo = function (x, y) {
        this.css({
            "left": function (i, v) { return x + "px"; },
            "top": function (i, v) { return y + "px"; }
        });
    };

    this.bg = $("#background");
    this.bg.move = function (dx, dy) {
        this.css("background-position", function (i, v) {
            var x = parseInt(v.split(" ")[0], 10) + dx;
            var y = parseInt(v.split(" ")[1], 10) + dy;
            return x + "px " + y + "px";
        });
    };
    this.bg.moveTo = function (x, y) {
        this.css("background-position", function (i, v) {
            return x + "px " + y + "px";
        });
    };

    this.map = { view: $("#map"), pad: $("#map_pad"), bg: $("#map_background") };
    this.scaleLevel = [0.25, 0.267943366, 0.287174589, 0.307786103, 0.329876978, 0.353553391, 0.378929142, 0.406126198, 0.435275282, 0.466516496, 0.5, 0.535886731, 0.574349177, 0.615572207, 0.659753955, 0.707106781, 0.757858283, 0.812252396, 0.870550563, 0.933032992, 1, 1.071773463, 1.148698355, 1.231144413, 1.319507911, 1.414213562, 1.515716567, 1.624504793, 1.741101127, 1.866065983, 2, 2.143546925, 2.29739671, 2.462288827, 2.639015822, 2.828427125, 3.031433133, 3.249009585, 3.482202253, 3.732131966, 4, 4.28709385, 4.59479342, 4.924577653, 5.278031643, 5.656854249, 6.062866266, 6.498019171, 6.964404506, 7.464263932, 8, 8.5741877, 9.18958684, 9.849155307, 10.55606329, 11.3137085, 12.12573253, 12.99603834, 13.92880901, 14.92852786, 16, 17.1483754, 18.37917368, 19.69831061, 21.11212657, 22.627417, 24.25146506, 25.99207668, 27.85761803, 29.85705573, 32];
    this.view.reset();
}