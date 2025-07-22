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
  id: 'welcome',
  title: 'Welcome to main4 Ticketing!',
  text: `This guided tour will help you get familiar with the ticketing system in main4.
You'll learn how to view, filter, and manage tickets efficiently—starting with how to filter tickets by type.

Let’s walk through this key feature so you can get the most out of your workflow. Please wait for the page to load before continuing the tour.`,
  attachTo: null, // No attachment for a centered intro step
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

tour.addStep({
  id: 'filter',
  title: 'Filter by Type',
  text: 'This is where you can filter tickets by type—such as Phone, Support, Network, MSP, and more—to quickly narrow down what youre looking for. Selecting a specific type will narrow down the list and make it easier to focus on the tickets that matter most for you.',
  attachTo: {
    element: '#as_d78b37d66bf51c8c2925d93929ffc9b6-active-scaffold > div.active-scaffold-header > div.actions > select:nth-child(8)',
    on: 'left'
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

let hasSelectedNetwork = false;

tour.addStep({
  id: 'select-network-skill',
  title: 'Filter by Skill',
  text: 'Please select <strong>Network</strong> from the dropdown before continuing.',
  attachTo: {
    element: 'select.action_group[title="Filter by skill"]',
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
        if (hasSelectedNetwork) {
          tour.next();
        } else {
          alert('Please select "Network" from the dropdown before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedNetwork = false;

      const dropdown = document.querySelector('select.action_group[title="Filter by skill"]');
      if (dropdown) {
        dropdown.addEventListener('change', function () {
          const selectedOption = dropdown.options[dropdown.selectedIndex];
          const selectedText = selectedOption.text.trim();
          
          hasSelectedNetwork = (selectedText === 'Network');
        });
      }
    }
  }
});

tour.addStep({
  id: 'filler',
  text: 'Great job! You’ve successfully navigated to the Network tickets. All tickets related to network issues will now be displayed below.',

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

tour.addStep({
  id: 'created ',
  title: 'Customer Wait Time',
  text: 'Customer wait time is one of the most important metrics. This value updates every second, and our goal is to keep it as low as possible to ensure a smooth and responsive experience for customers.',
  attachTo: {
    element: '#as_d78b37d66bf51c8c2925d93929ffc9b6-wait_since-column',
    on: 'right'
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

tour.addStep({
  id: 'filter by type 2',
  title: '',
 text: '<strong>This is where you filter tickets by status.</strong><br><br><ul><li><strong>Open</strong> – These tickets have not been assigned yet and are waiting to be picked up by an agent.</li><li><strong>Pending Customer</strong> – We’re waiting on the customer to reply, provide info, or take action. There’s nothing for us to do until then.</li><li><strong>Pending Support</strong> – We’re waiting on other internal resources:<ul><li>Level 3 escalation (technical or process-related)</li><li>Other teams (e.g., dispatch)</li><li>Development (e.g., tracked in Trello)</li></ul></li><li><strong>Closed</strong> – The ticket has been resolved and closed. No further action is expected unless reopened.</li></ul>',
  attachTo: {
    element: '#as_d78b37d66bf51c8c2925d93929ffc9b6-active-scaffold > div.active-scaffold-header > div.actions > select:nth-child(5)',
    on: 'left'
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

let hasSelectedPendingCustomer = false;
tour.addStep({
  id: 'select-pending-customer',
  title: 'Filter by Status: Pending Customer',
  text: 'Please select <strong>Pending Customer</strong> from the dropdown before continuing.',
  attachTo: {
    element: 'select.action_group[title="Filter Status"]',
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
        if (hasSelectedPendingCustomer) {
          tour.next();
        } else {
          alert('Please select "Pending Customer" from the dropdown before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedPendingCustomer = false;

      const dropdown = document.querySelector('select.action_group[title="Filter Status"]');
      if (dropdown) {
        dropdown.addEventListener('change', function () {
          const selectedOption = dropdown.options[dropdown.selectedIndex];
          const selectedText = selectedOption.text.trim();

          hasSelectedPendingCustomer = (selectedText === 'Pending Customer');
        });
      }
    }
  }
});




tour.addStep({
  id: 'filler',
text: 'Great job! You’ve successfully navigated to all Pending Customer Network tickets. All tickets related to network issues that are awaiting a customer response are now displayed below.',

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




/*
tour.addStep({
  id: 'filter-by-type',
  title: 'Try Filtering by Type',
  text: 'Click this button to filter tickets by type. The tour will continue once you’ve done that.',
  attachTo: {
    element: '#as_d78b37d66bf51c8c2925d93929ffc9b6-active-scaffold > div.active-scaffold-header > div.actions > select:nth-child(8)',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    }
    // No "Next" button – user must click the real button to proceed
  ],
  when: {
    show: () => {
      // Attach a one-time event listener
      const btn = document.querySelector('#as_d78b37d66bf51c8c2925d93929ffc9b6-active-scaffold > div.active-scaffold-header > div.actions > select:nth-child(8)');
      if (btn) {
        const handler = () => {
          btn.removeEventListener('click', handler);
          setTimeout(() => tour.next(), 300); // slight delay to allow UI to update
        };
        btn.addEventListener('click', handler);
      }
    }
  }
});
*/


setTimeout(() => {
tour.start();
},6000);
