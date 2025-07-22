const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: false,
    cancelIcon: {
      enabled: true
    }
  }
});


tour.addStep({
  id: 'intro-step',
  title: 'Welcome!',
  text: 'Let’s get started once the header loads.',
  attachTo: {
    element: '#as_1dfde58336b0a74e37c81ad58f503897-first_name-column',
    on: 'bottom'
  },
  when: {
    show: () => waitForElement('#as_1dfde58336b0a74e37c81ad58f503897-first_name-column')
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
});


let hasSelectedFemale = false;

tour.addStep({
  id: 'select-gender-female',
  title: 'Filter by Gender',
  text: 'Please select <strong>Female</strong> from the Gender filter. The tour will continue automatically after the list loads, or you can click Next once you’ve selected it.',
  attachTo: {
    element: 'select.action_group[title="Filter Gender"]',
    on: 'left'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: function () {
        if (hasSelectedFemale) {
          tour.next();
        } else {
          alert('Please select "Female" from the dropdown before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedFemale = false;

      const dropdown = document.querySelector('select.action_group[title="Filter Gender"]');
      if (dropdown) {
        const handler = function () {
          const selectedText = dropdown.options[dropdown.selectedIndex].text.trim();
          if (selectedText === 'Female') {
            hasSelectedFemale = true;
            dropdown.removeEventListener('change', handler); // prevent duplicate triggers

            setTimeout(() => {
              if (tour.getCurrentStep().id === 'select-gender-female') {
                tour.next();
              }
            }, 500);
          }
        };
        dropdown.addEventListener('change', handler);
      }
    }
  }
});


tour.addStep({
  id: 'test',
  title: 'test!',
  text: `test`,
  attachTo: { 
    element: '#as_1dfde58336b0a74e37c81ad58f503897-tbody',
    on: 'bottom'
  },
  when: {
    show: () => {
      return waitForElement('#as_1dfde58336b0a74e37c81ad58f503897-tbody');
    }
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: tour.next
    }
  ]
});

let hasSelectedExtraView = false;

tour.addStep({
  id: 'select-extra-view',
  title: 'Change Table View',
  text: 'Please select the <strong>Extra</strong> view. The tour will continue automatically once it’s selected, or you can click Next after choosing it.',
  attachTo: {
    element: 'form.table_views',
    on: 'top'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: function () {
        if (hasSelectedExtraView) {
          tour.next();
        } else {
          alert('Please select "Extra" before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedExtraView = false;

      const radios = document.querySelectorAll('input[type="radio"][name="list_view"]');
      radios.forEach(radio => {
        const handler = function () {
          if (radio.value === 'Extra' && radio.checked) {
            hasSelectedExtraView = true;
            radios.forEach(r => r.removeEventListener('change', handler)); // cleanup

            setTimeout(() => {
              if (tour.getCurrentStep().id === 'select-extra-view') {
                tour.next();
              }
            }, 500);
          }
        };

        radio.addEventListener('change', handler);
      });
    }
  }
});



tour.addStep({
  id: 'extra-view-confirmation',
  title: 'Extra View Loaded',
  text: 'You are now in the Extra view.',
  attachTo: { element: '#as_1dfde58336b0a74e37c81ad58f503897-content > table > thead > tr', on: 'bottom' },
  when: {
    show: () => {
        waitForElement('#as_1dfde58336b0a74e37c81ad58f503897-content > table > thead > tr')
    }
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: tour.next
    }
  ]
});




waitForElement('#as_1dfde58336b0a74e37c81ad58f503897-first_name-column')
  .then(() => {
    tour.start(); // now the element exists before Shepherd tries to attach
  })




function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let waited = 0;
    const check = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(check);
        resolve();
      } else if (waited >= timeout) {
        clearInterval(check);
        reject(new Error(`Element "${selector}" not found within ${timeout}ms`));
      }
      waited += interval;
    }, interval);
  });
}

