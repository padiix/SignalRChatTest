function changeBox() {
    function widthListener(x) {
        if (x.matches) {
            if (document.getElementById("listCheckbox").checked == true) {
                anime({
                    targets: '.active-users-panel',
                    transformX: document.getElementById("activeUsersPanel").offsetWidth * 0.8,
                    easing: 'easeInOutQuad'
                });
            }
            else {
                anime({
                    targets: '.active-users-panel',
                    transformX: 0,
                    easing: 'easeInOutQuad'
                });
            }
        } else {
            if (document.getElementById("listCheckbox").checked == true) {
                anime({
                    targets: '.active-users-panel',
                    left: '220px',
                    easing: 'easeInOutQuad'
                });
            }
            else {
                anime({
                    targets: '.active-users-panel',
                    left: '0px',
                    easing: 'easeInOutQuad'
                });
            }
        }
    }

    var x = window.matchMedia("(max-width: 1182px)");
    widthListener(x);
    x.addListener(widthListener);
}