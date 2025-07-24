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
    element: '#as_customers-active-scaffold > div.active-scaffold-header > h2',
    on: 'bottom'
  },
  when: {
    show: () => waitForElement('#as_customers-active-scaffold > div.active-scaffold-header > h2')
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
});


let hasSelectedDiamond = false;

tour.addStep({
  id: 'select-diamond-customers',
  title: 'Filter by Tier',
  text: 'Please select <strong>Diamond</strong> from the customer filter dropdown. The tour will continue automatically after loading, or you can click Next once it’s selected.',
  attachTo: {
    element: 'select.action_group[title="Choose by Recent, MRC, Active, MPLS, Cloud, or All"]',
    on: 'left'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasSelectedDiamond) {
          tour.next();
        } else {
          alert('Please select "Diamond" from the dropdown before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedDiamond = false;

      const dropdown = document.querySelector('select.action_group[title="Choose by Recent, MRC, Active, MPLS, Cloud, or All"]');
      if (dropdown) {
        const handler = () => {
          const selectedText = dropdown.options[dropdown.selectedIndex].text.trim();
          if (selectedText === 'Diamond') {
            hasSelectedDiamond = true;
            dropdown.removeEventListener('change', handler);

            setTimeout(() => {
              if (tour.getCurrentStep().id === 'select-diamond-customers') {
                tour.next();
              }
            }, 500); // wait briefly after selection
          }
        };

        dropdown.addEventListener('change', handler);
      }
    }
  }
});

tour.addStep({
  id: 'diamond-loaded',
  title: 'Diamond Customers Loaded',
  text: 'Now you’re viewing only Diamond-tier customers. Let’s proceed!',
  attachTo: {
    element: '#as_customers-table--body', // Update this selector to a visible part of the table
    on: 'top'
  },
  when: {
    show: () => waitForAllSpinnersToDisappear()
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


tour.start();



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

function waitForAllSpinnersToDisappear() {
  return new Promise((resolve) => {
    // Wait 0.25 seconds before starting the check loop
    setTimeout(() => {
      const interval = 100;

      const check = setInterval(() => {
        const spinners = document.querySelectorAll('.loading-indicator');

        const allGone = Array.from(spinners).every(spinner =>
          spinner.style.visibility === 'hidden' ||
          spinner.style.display === 'none' ||
          spinner.offsetParent === null
        );

        if (allGone || spinners.length === 0) {
          clearInterval(check);
          setTimeout(resolve, 250); // Optional: wait another 0.25s after disappearance
        }
      }, interval);
    }, 250); // Initial delay before checking
  });
}
