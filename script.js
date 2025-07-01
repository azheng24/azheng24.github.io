document.getElementById('start-tour').addEventListener('click', () => {
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      scrollTo: true,
      cancelIcon: { enabled: true },
      classes: 'shadow-md bg-purple-dark',
      buttons: [
        {
          text: 'Back',
          action: Shepherd.back
        },
        {
          text: 'Next',
          action: Shepherd.next
        }
      ]
    }
  });

  tour.addStep({
    id: 'step-title',
    text: 'This is the title of the page.',
    attachTo: {
      element: '#title',
      on: 'bottom'
    }
  });

  tour.addStep({
    id: 'step-paragraph',
    text: 'Here’s some introductory text.',
    attachTo: {
      element: '#intro',
      on: 'bottom'
    }
  });

  tour.start();
});
