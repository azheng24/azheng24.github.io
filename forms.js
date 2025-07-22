const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: false,
    cancelIcon: {
      enabled: true
    }
  }
});

let hasSelectedFemale = false;

tour.addStep({
  id: 'select-gender-female',
  title: 'Filter by Gender',
  text: 'Please select <strong>Female</strong> from the Gender filter before continuing.',
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
        dropdown.addEventListener('change', function () {
          const selectedOption = dropdown.options[dropdown.selectedIndex];
          const selectedText = selectedOption.text.trim();
          hasSelectedFemale = (selectedText === 'Female');
        });
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


setTimeout(() => {
tour.start();
},6000);




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