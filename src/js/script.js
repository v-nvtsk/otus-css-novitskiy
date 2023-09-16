document.addEventListener('DOMContentLoaded', () => {

  function removeClassFromElements(selector, className = 'active') {
    const elemArray = document.querySelectorAll(selector)

    if (elemArray) {
      elemArray.forEach(el => el.classList.remove(className))
    }
  }

  const sections = document.querySelectorAll('section[id]');
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(el => {
    el.addEventListener('click', (ev) => {
      removeClassFromElements('.navigation-link.active');

      ev.target.classList.add('active')
      document.body.dataset.active = ev.target.hash.slice(1);
      document.body.classList.add('scrolling')
    })
  })

  let scrollTimer = null;

  document.addEventListener('scroll', (() => {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer)
    }

    scrollTimer = setTimeout(() => {
      document.body.classList.remove('scrolling')

      let visibleSelector = null;
      sections.forEach(el => {
        const isElementHalfVisible = el.offsetTop < window.scrollY + window.innerHeight * 0.5
        if (isElementHalfVisible) {
          visibleSelector = el.id
        };
      })

      const isVisibleSelectorChanged = document.body.dataset.active !== visibleSelector
      if (visibleSelector && isVisibleSelectorChanged) {
        if (document.body.dataset?.active) {
          removeClassFromElements('.navigation-link.active', 'active');
        }
        document.body.dataset.active = visibleSelector;
        const activeLinks = document.querySelectorAll(`.navigation-link[href="#${visibleSelector}"]`)
        if (activeLinks) {
          for (let i = 0; i < activeLinks.length; i += 1) {
            activeLinks[i].classList.add('active')
          }
        }
      }
    }, 100)

  }))
})
