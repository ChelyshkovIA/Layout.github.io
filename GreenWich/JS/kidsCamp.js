window.addEventListener('DOMContentLoaded', function() {
   const width = document.documentElement.clientWidth;
   
   if (width <= 1050) {
      const openMenu = document.querySelector('.mobile__burger .icon-menu');
      const closeMenu = document.querySelector('.mobile__burger .icon-back');
      const nav = document.querySelector('.mobile-nav');

      openMenu.addEventListener('click', function() {
         this.classList.add('mobile-menu__icon--hidden');
         nav.classList.add('mobile-nav--active');
         closeMenu.classList.remove('mobile-menu__icon--hidden');
      });

      closeMenu.addEventListener('click', function() {
         this.classList.add('mobile-menu__icon--hidden');
         nav.classList.remove('mobile-nav--active');
         openMenu.classList.remove('mobile-menu__icon--hidden');
      });
   }

   if(width) {
      let contacts = document.querySelector('.contacts');
      let contactsIcons = document.querySelectorAll('.contacts__item--social');
      let showContacts = document.querySelector('.contacts__item--starter');
      let imgStarter = document.querySelector('.contacts__img--starter');
      showContacts.addEventListener('click', function() {
         if(showContacts.classList.contains('contacts__back')){
            for(let i = 0; i < contactsIcons.length; i++) {
               contactsIcons[i].classList.remove('contacts--active');
               showContacts.classList.remove('contacts__back');
               imgStarter.src = 'images/call.png';
               setTimeout(() => {
                  contacts.classList.remove('active');
               }, 200);
            }
            return;
         }

         for(let i = 0; i < contactsIcons.length; i++) {
            contacts.classList.add('active');
            contactsIcons[i].classList.add('contacts--active');
            showContacts.classList.add('contacts__back');
            imgStarter.src = 'images/return.png';
         }
      });
   }
});