document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('#dropdown > li');

  menuItems.forEach(function (item) {
    const subMenu = item.querySelector('ul');

    if (subMenu) {
      const link = item.querySelector('a');

      link.addEventListener('click', function () {
        if (subMenu.style.display === '' || subMenu.style.display === 'none') {
          subMenu.style.display = 'block';
        } else {
          subMenu.style.display = 'none';
        }
      });
    }
  });
});