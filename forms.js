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

let hasClickedNewButton = false;

tour.addStep({
  id: 'click-new-button',
  title: 'Create a New Record',
  text: 'Click the <strong>New</strong> button to create a new student record. The tour will continue once you click it.',
  attachTo: {
    element: '#as_1dfde58336b0a74e37c81ad58f503897-new--link',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: function () {
        if (hasClickedNewButton) {
          tour.next();
        } else {
          alert('Please click the Green "+" button before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasClickedNewButton = false;

      const button = document.querySelector('#as_1dfde58336b0a74e37c81ad58f503897-new--link');
      if (button) {
        const handler = function () {
          hasClickedNewButton = true;
          button.removeEventListener('click', handler); // clean up

          // optional: auto-advance after delay
          setTimeout(() => {
            if (tour.getCurrentStep().id === 'click-new-button') {
              tour.next();
            }
          }, 500);
        };

        button.addEventListener('click', handler);
      }
    }
  }
});

tour.addStep({
  id: 'form',
  title: 'This is a form',
  text: `test`,
  attachTo: { 
    element: '#as_1dfde58336b0a74e37c81ad58f503897-create--form > h4',
    on: 'bottom'
  },
  when: {
    show: () => {
      return waitForAllSpinnersToDisappear();
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


let hasEnteredCorrectValue = false;

tour.addStep({
  id: 'enter-view-name',
  title: 'Enter First Name',
  text: 'Type <strong>John</strong> into the box to continue.',
  attachTo: {
    element: '#record_first_name_1dfde58336b0a74e37c81ad58f503897',
    on: 'right'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasEnteredCorrectValue) {
          tour.next();
        } else {
          alert('Please type "John" in the box before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasEnteredCorrectValue = false;

      const input = document.querySelector('#record_first_name_1dfde58336b0a74e37c81ad58f503897');
      if (input) {
        const handler = () => {
          const value = input.value.trim();
          if (value.toLowerCase() === 'john') {
            hasEnteredCorrectValue = true;
            input.removeEventListener('input', handler);

            // Optional delay before auto-advance
            setTimeout(() => {
              if (tour.getCurrentStep().id === 'enter-view-name') {
                tour.next();
              }
            }, 500);
          }
        };

        input.addEventListener('input', handler);
      }
    }
  }
});


hasEnteredCorrectValue = false;

tour.addStep({
  id: 'enter-view-name2',
  title: 'Enter Last Name',
  text: 'Type <strong>Doe</strong> into the box to continue.',
  attachTo: {
    element: '#record_last_name_1dfde58336b0a74e37c81ad58f503897',
    on: 'right'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasEnteredCorrectValue) {
          tour.next();
        } else {
          alert('Please type "Doe" in the box before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasEnteredCorrectValue = false;

      const input = document.querySelector('#record_last_name_1dfde58336b0a74e37c81ad58f503897');
      if (input) {
        const handler = () => {
          const value = input.value.trim();
          if (value.toLowerCase() === 'doe') {
            hasEnteredCorrectValue = true;
            input.removeEventListener('input', handler);

            // Optional delay before auto-advance
            setTimeout(() => {
              if (tour.getCurrentStep().id === 'enter-view-name2') {
                tour.next();
              }
            }, 500);
          }
        };

        input.addEventListener('input', handler);
      }
    }
  }
});

let hasSelectedFemale = false;

tour.addStep({
  id: 'select-gender-female-radio',
  title: 'Choose Gender',
  text: 'Please select <strong>Female</strong> to continue.',
  attachTo: {
    element: '#record_gender_1dfde58336b0a74e37c81ad58f503897-female',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasSelectedFemale) {
          tour.next();
        } else {
          alert('Please select "Female" before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasSelectedFemale = false;

      const femaleRadio = document.querySelector('#record_gender_1dfde58336b0a74e37c81ad58f503897-female');
      if (femaleRadio) {
        const handler = () => {
          if (femaleRadio.checked) {
            hasSelectedFemale = true;
            femaleRadio.removeEventListener('change', handler);

            setTimeout(() => {
              if (tour.getCurrentStep().id === 'select-gender-female-radio') {
                tour.next();
              }
            }, 500);
          }
        };

        femaleRadio.addEventListener('change', handler);
      }
    }
  }
});



let hasPressedCreateButton = false;

tour.addStep({
  id: 'press-create-button',
  title: 'Create the Record',
  text: 'Click the <strong>Create</strong> button to continue.',
  attachTo: {
    element: '#as_1dfde58336b0a74e37c81ad58f503897-create--form > p > input',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasPressedCreateButton) {
          tour.next();
        } else {
          alert('Please click the "Create" button before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasPressedCreateButton = false;

      const button = document.querySelector('#as_1dfde58336b0a74e37c81ad58f503897-create--form > p > input');
      if (button) {
        const handler = () => {
          hasPressedCreateButton = true;
          button.removeEventListener('click', handler);

          setTimeout(() => {
            if (tour.getCurrentStep().id === 'press-create-button') {
              tour.next();
            }
          }, 500);
        };

        button.addEventListener('click', handler);
      }
    }
  }
});


let hasPressedCancelButton = false;

tour.addStep({
  id: 'press-cancel-button',
  title: 'Cancel the Action',
  text: 'Click the <strong>Cancel</strong> button to go back or stop the current process.',
  attachTo: {
    element: '#as_1dfde58336b0a74e37c81ad58f503897-nested--row > td > div > a',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasPressedCancelButton) {
          tour.next();
        } else {
          alert('Please click the "Cancel" button before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasPressedCancelButton = false;

      const cancelBtn = document.querySelector('#as_1dfde58336b0a74e37c81ad58f503897-nested--row > td > div > a');
      if (cancelBtn) {
        const handler = () => {
          hasPressedCancelButton = true;
          cancelBtn.removeEventListener('click', handler);

          setTimeout(() => {
            if (tour.getCurrentStep().id === 'press-cancel-button') {
              tour.next();
            }
          }, 500);
        };

        cancelBtn.addEventListener('click', handler);
      }
    }
  }
});

let hasClickedEditButton = false;

tour.addStep({
  id: 'click-edit-button',
  title: 'Edit Student',
  text: 'Click the <strong>Edit</strong> button to update this student\'s record.',
  attachTo: {
    element: '#as_1dfde58336b0a74e37c81ad58f503897-edit-2-link',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Back',
      action: tour.back
    },
    {
      text: 'Next',
      action: () => {
        if (hasClickedEditButton) {
          tour.next();
        } else {
          alert('Please click the "Edit" button before continuing.');
        }
      }
    }
  ],
  when: {
    show: () => {
      hasClickedEditButton = false;

      const editButton = document.querySelector('#as_1dfde58336b0a74e37c81ad58f503897-edit-2-link');
      if (editButton) {
        const handler = () => {
          hasClickedEditButton = true;
          editButton.removeEventListener('click', handler);

          setTimeout(() => {
            if (tour.getCurrentStep().id === 'click-edit-button') {
              tour.next();
            }
          }, 500);
        };

        editButton.addEventListener('click', handler);
      }
    }
  }
});










waitForElement('#as_1dfde58336b0a74e37c81ad58f503897-first_name-column')
  .then(() => {
    tour.start(); // now the element exists before Shepherd tries to attach
  }
)


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
    const interval = 100;

    const check = setInterval(() => {
      const spinners = document.querySelectorAll('.loading-indicator');

      const allGone = Array.from(spinners).every(spinner => {
        return (
          spinner.style.visibility === 'hidden' ||
          spinner.style.display === 'none' ||
          spinner.offsetParent === null // covers display: none and DOM removal
        );
      });

      if (allGone || spinners.length === 0) {
        clearInterval(check);
        setTimeout(() => {
          resolve();
        }, 250); // wait an extra 250ms for good measure
      }
    }, interval);
  });
}
