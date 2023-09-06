document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('section[id]')
  const sectionsY = {}
  for (let i = 0; i < sections.length; i++) {
    sectionsY[sections[i].id] = {}
    sectionsY[sections[i].id].top = sections[i].offsetTop;
    sectionsY[sections[i].id].height = sections[i].offsetHeight;
  }

  document.addEventListener('scroll', function () {
    let visibleSelector = '';
    for (let el in sectionsY) {
      if ((sectionsY[el].top - sectionsY[el].height < window.scrollY)) {
        console.log('sectionsY[el].top , sectionsY[el].height, window.scrollY: ', sectionsY[el].top, sectionsY[el].height, window.scrollY);
        visibleSelector = el;
      }
    }
    if (visibleSelector && (this.body.dataset.active !== visibleSelector)) {
      if (document.body.dataset?.active) {
        document.querySelector(`a[href="#${document.body.dataset.active}"]`)?.classList.remove('active')

        const inactiveLinks = document.querySelectorAll(`a[href="#${document.body.dataset.active}"]`)
        if (inactiveLinks) {
          for (let i = 0; i < inactiveLinks.length; i++) {
            inactiveLinks[i].classList.remove('active')
          }
        }
      }
      document.body.dataset.active = visibleSelector;
      const activeLinks = document.querySelectorAll(`a[href="#${visibleSelector}"]`)
      if (activeLinks) {
        for (let i = 0; i < activeLinks.length; i++) {
          activeLinks[i].classList.add('active')
        }
      }
    }
  })
})