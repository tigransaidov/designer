window.addEventListener('load', function() {
    // Modals
    const modalLinks = document.querySelectorAll('.modal-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding')

    let unlock = true;
    const modalTime = 800;

    // Fetch all modal-buttons and add them eventlistener
    if (modalLinks.length > 0) {
        for (let i = 0; i < modalLinks.length; i++) {
            const modalLink = modalLinks[i];
            modalLink.addEventListener("click", function(e) {
                const modalName = modalLink.getAttribute('href').replace('#', '');
                const currentModal = document.getElementById(modalName);
                modalOpen(currentModal);
                e.preventDefault();
            });
        };
    };
    // all clossing buttons in document 
    const modalCloseIcons = document.querySelectorAll('.close-modal');
    if (modalCloseIcons.length > 0) {
        for (let i = 0; i < modalCloseIcons.length; i++) {
            const modalCloseIcon = modalCloseIcons[i]; 
            modalCloseIcon.addEventListener('click', function(e) {
                modalClose(modalCloseIcon.closest('.modal'))
                e.preventDefault();
            });
        };
    };
    // Check cursor position 
    function checkCursor(e) {
        if (!e.target.closest('.modal__dialog') && !e.target.closest('.message')) {
            body.classList.add('cursor-close');
        } else {
            body.classList.remove('cursor-close');
        }
    };
    // Open modal screen
    function modalOpen(currentModal) {
        if (currentModal && unlock) {
            const modalActive = document.querySelector('.modal.open');
            if (modalActive) {
                modalClose(modalActive, false);
            } else {
                bodyLock(modalTime);
            } 
            currentModal.classList.add('open');
            currentModal.addEventListener('click', function (e) {
                if (!e.target.closest('.modal__dialog')) {
                    modalClose(e.target.closest('.modal'))
                }
            });
            body.addEventListener('mousemove', checkCursor, false);
            
            // we need slideWork to switch between all works, but we need to check, if modal that opened now is WORK-ITEM and not resume or something else.
            // so we schould define a child in div work check if it exists.
            const workItemChildren = document.querySelectorAll('.modal-work');
            for (i = 0; i < workItemChildren.length; i++) {
                if (currentModal.contains(workItemChildren[i])) {
                    slideWork(currentModal);
                    break;
                }
            }
        };
    };
    // close modal screen
    function modalClose(modalActive, doUnlock = true) {
        if (unlock) {
            modalActive.classList.remove('open');
            body.removeEventListener('mousemove', checkCursor, false);
            body.classList.remove('cursor-close');

            // clear all input fields if you close the modal screen
            if (modalActive.getAttribute('id') == 'contact') {
                const form = modalActive.querySelector('.modal-contact__form');
                form.reset();
            }

        } if (doUnlock) {
            bodyUnlock(modalTime);
        }
    };

    var width = window.screen.width;
    var innerWidth = window.innerWidth;
    // Add padding by open/close modal-screens/navs 
    function bodyLock(timeout) {
        var lockPaddingNum = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
        const lockPaddningValue = lockPaddingNum + 'px';
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddningValue; 
            };   
        };
        body.style.paddingRight = lockPaddningValue;
        body.classList.add('lock');
        
        const width = window.screen.width;
        const innerWidth = window.innerWidth;
        // add padding for state messages, 10 is initial padding  
        if (innerWidth > 767) {
            messageSuccess.style.right = lockPaddingNum + 10 + 'px';
            messageError.style.right = lockPaddingNum + 10 + 'px';
        // tablet verssion and smaller. position left.
        } else {
            messageSuccess.style.left = innerWidth * .5 + 'px';
            messageError.style.left = innerWidth * .5 +'px';
        }
        // don't close/open two or more windows in the same time!
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    };
    
    // Remove padding by open/close modal-screens/navs
    function bodyUnlock(timeout) {
        setTimeout(function() {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';

            const width = window.screen.width;
            const innerWidth = window.innerWidth;
            // return everything back 
            if (innerWidth > 767) {
                messageSuccess.style.right = '10px';
                messageError.style.right = '10px';
            // tablet version and smaller. position left.
            } else {
                messageSuccess.style.left = width * .5 - (width - innerWidth) * .5 + 'px';
                messageError.style.left = width * .5 - (width - innerWidth) * .5 + 'px';
            }

            body.classList.remove('lock');
        }, timeout);
        
        // dont't close/open two or more windows at the same time!
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    };

    // press ESC to close modal screen
    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const modalActive = document.querySelector('.modal.open');
            modalClose(modalActive);
        };
    });


    //== Mobile Nav Control =================================================
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    let isMenuOpen = false;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (!isMenuOpen) {
                // activate mobile-menu
                menuBtn.classList.add('active');
                nav.classList.add('active');
                // Padding-Control by actived or disabled mobile-menu
                bodyLock(200)
                isMenuOpen = true;
            } else {
                // disable mobile menu 
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
                isMenuOpen = false;
                bodyUnlock(200);
            };
        });
    };

    // close mobile-menu after click on items in it
    const navLinks = document.querySelectorAll('.nav__link');
    if (navLinks.length > 0) {
        for (let i = 0; i < navLinks.length; i++) {
            let navLink = navLinks[i];
            navLink.addEventListener('click', function() {
                if (isMenuOpen) {
                    menuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    isMenuOpen = false;
                    // except all modal-links. we don't need to unlock body for them
                    if (navLink.classList.contains('modal-link')) {
                        return;
                    }
                    bodyUnlock(200);
                };
            });
        };
    };


    //== Works Slider =================================================
    // function to open previous work
    function prevCommand(modal) {
        const currentModalNumber = parseInt(modal.getAttribute('id').replace('work-', ''));
        const prevModalNumber = currentModalNumber - 1;
        if (prevModalNumber > 0) {
            var prevModal = document.getElementById(`work-${prevModalNumber}`);
        } else {
            var prevModal = document.getElementById(`work-${6}`);
        }
        modalOpen(prevModal);
    
    }
    // function to open next work
    // 6 is number of works-modals
    function nextCommand(modal) {
        const currentModalNumber = parseInt(modal.getAttribute('id').replace('work-', ''));
        const nextModalNumber = currentModalNumber + 1;
        if (nextModalNumber < 7) {
            var nextModal = document.getElementById(`work-${nextModalNumber}`);
        } else {
            var nextModal = document.getElementById(`work-${1}`);
        }
        modalOpen(nextModal);
    }

    // eventlistener for Previous -- Next Buttons of a modal 
    function slideWork(modal) {
        let prevBtn = modal.querySelector('.modal-work__btn--prev');
        let nextBtn = modal.querySelector('.modal-work__btn--next');
        prevBtn.addEventListener('click', (e) => prevCommand(modal), false);
        nextBtn.addEventListener('click', (e) => nextCommand(modal), false);
    }


    //== News Blog Animation =================================================
    const title = document.querySelectorAll('.articles__title');
    const readMoreBtn = document.querySelectorAll('.articles .btn');
    const articlesHeader = document.querySelectorAll('.articles__header');

    const articlesDate = document.querySelectorAll('.articles__date');

    // if those items exist...
    if (title.length > 0 || readMoreBtn.length > 0 || articlesDate.length > 0 || articlesHeader.length > 0) {
        for (i = 0; i < title.length; i++) {
            let currentArticlesDate = articlesDate[i];
            title[i].addEventListener('mouseover', (e) => mOver(currentArticlesDate), false);
            title[i].addEventListener('mouseout', (e) => mOut(currentArticlesDate), false);
            readMoreBtn[i].addEventListener('mouseover', (e) => mOver(currentArticlesDate), false);
            readMoreBtn[i].addEventListener('mouseout', (e) => mOut(currentArticlesDate), false);
            articlesHeader[i].addEventListener('mouseover', (e) => mOver(currentArticlesDate), false);
            articlesHeader[i].addEventListener('mouseout', (e) => mOut(currentArticlesDate), false);
        }
    }
    function mOver(item) {
        item.classList.add('hover');
    }
    
    function mOut(item) {
        item.classList.remove('hover');
    }


    //== State Message ==========================================================

    // By click on hire button 
    const hireBtn = document.querySelector('.modal-contact__form .btn');
    if (hireBtn) {
        hireBtn.addEventListener('click', (e) => checkInputs(e), false)
    }

    // Check all inputs and class showMessage function, that show needed message
    const inputs = document.querySelectorAll('.modal-contact__input');
    const messageSuccess = document.getElementById('message-success');
    const messageError = document.getElementById('message-error');
    function checkInputs(e) {
        e.preventDefault();
        if (modalContact.classList.contains('open')) {
            var isFilled = true;
            for (i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    isFilled = false;
                    break;
                }
            }
            if (isFilled) {
                showMessage(messageSuccess);
            } else {
                showMessage(messageError);
            }
        }
    }

    // hide all other messages, activate needed and close modal if we need it.
    // it's necessary to control left position, when we close or open modal, we set body a padding;
    // so we need to compensate it by changing our absolute position 
    const modalContact = document.getElementById('contact');
    function showMessage(msg) {
        const messages = document.querySelectorAll('.message');
        messages.forEach((message) => {
            if (message.classList.contains('open')) {
                message.style.display = 'none';
                message.classList.remove('open');
            }
        });
        msg.classList.add('open');
        msg.style.display = "flex";
        if (msg.getAttribute('id') === 'message-success') {
            modalClose(modalContact);
        } 
        setDelay(messages);
    };

    // Auto hidebar messages. And clean up it all to avoid wrong working of Timeout function 
    function setDelay(messages) {
        const delay = setTimeout(function() {
            messages.forEach((message) => {
                if (message.classList.contains('open')) {
                    message.classList.remove('open');
                }
            });
            return () => clearTimeout(delay);
        }, 4000);
    }

    //  Find close message button and add it eventlistener
    const msgCloseBtn = document.querySelectorAll('.close-message');
    if (msgCloseBtn.length > 0) {
        for (i = 0; i < msgCloseBtn.length; i++) {
            let currentBtn = msgCloseBtn[i];
            currentBtn.addEventListener('click', () => msgClose(currentBtn), false);
        }
    }

    // close message after 
    function msgClose(btn) {
        if (messageSuccess.contains(btn)) {
            messageSuccess.classList.remove('open');
        } else {
            messageError.classList.remove('open');
        }
    }
});
