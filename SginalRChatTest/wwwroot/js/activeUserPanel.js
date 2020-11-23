function changeBox() {
    function widthListener(x) {
        if (x.matches) {
            //If the max width is lesser than 1182px
            if (document.getElementById("listCheckbox").checked == true) {
                //If arrow was clicked
                var chatBox = anime({
                    targets: '.typing-messages-box',
                    opacity: 0,
                    duration: 100,
                    easing: 'linear'
                });

                var userPanel = anime({
                    targets: '#wholeActiveUsersPanel',
                    left: '-8px',
                    zIndex: {
                        value: 3
                    },
                    duration: 100,
                    easing: 'easeInOutQuad'
                });

                var userList = anime({
                    targets: '#usersBox',
                    opacity: 1,
                    easing: 'easeInOutQuad'
                });
            }
            else {
                //If arrow was not clicked
                var chatBox = anime({
                    targets: '.typing-messages-box',
                    opacity: 1,
                    duration: 100,
                    easing: 'linear'
                });

                var userPanel = anime({
                    targets: '#wholeActiveUsersPanel',
                    left: '-8px',
                    zIndex: {
                        value: 1
                    },
                    duration: 100,
                    easing: 'easeInOutQuad'
                });

                var userList = anime({
                    targets: '#usersBox',
                    opacity: 0,
                    easing: 'easeInOutQuad'
                });
            }
        } else {
            //If the max width is bigger than 1182px
            if (document.getElementById("listCheckbox").checked == true) {
                //If arrow was clicked
                anime({
                    targets: '#wholeActiveUsersPanel',
                    left: '220px',
                    easing: 'easeInOutQuad'
                });
            }
            else {
                //If arrow was not clicked
                anime({
                    targets: '#wholeActiveUsersPanel',
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