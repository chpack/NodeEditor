$(document).ready(function () {
    NE = new NodeEditor();
    CS = NE.cs;

    $(document).mousemove(function (e) {
        // updata mouse position.
        CS.mouse.update(e.pageX, e.pageY);

        // right button to move pad.
        if (e.which == 3)
            NE.view.moveE(e);
    });

    $(document).mousedown(function (e) {
        if (e.which == 1)
            NE.cursor.move(CS.mouse.X, CS.mouse.Y)
    });

    $(window).resize(function () {
        NE.view.reset();
    });

    $(document).contextmenu(function (e) {
        if (CS.mouse.moved)
            e.preventDefault();
    });
})