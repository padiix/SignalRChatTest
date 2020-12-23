function changeBox() {
    function widthListenerMobile(x) {
        if (x.matches) {
            //If the max width is lesser than 767px
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
            if (window.matchMedia(("(min-width: 768px) and (max-width: 1024px)")).matches == true) {
                if (document.getElementById("listCheckbox").checked == true) {
                    //if the arrow was clicked
                    var userList = anime({
                        targets: '#usersBox',
                        opacity: 0,
                        easing: 'easeInOutQuad'
                    });
                    var wholeUsersPanel = anime({
                        targets: '#wholeActiveUsersPanel',
                        left: window.innerWidth * 0.15 + 'px',
                        easing: 'easeInOutQuad'
                    });
                }
                else {
                    //if the arrow was not clicked
                    var userList = anime({
                        targets: '#usersBox',
                        opacity: 1,
                        easing: 'easeInOutQuad'
                    });
                    var wholeUsersPanel = anime({
                        targets: '#wholeActiveUsersPanel',
                        left: '0px',
                        easing: 'easeInOutQuad'
                    });
                }
            }
            else
            {
                //If the max width is bigger than 767px
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
    }


    var mobile = window.matchMedia("(max-width: 767px)");
    var mediumToLarge = window.matchMedia("(min-width: 1200px)");
    widthListenerMobile(mobile);
    mobile.addListener(widthListenerMobile);
}