function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } 
    else {
      return false;
    }
  }

function ValidateDate(input) {
    const splitDate = input.split(/[/,.]/);
    const allInts = splitDate.every(element => /^[0-9]+$/.test(element));
    return (
        splitDate.length == 3 &&
        allInts &&
        0 < parseInt(splitDate[0]) <= 31 &&
        0 < parseInt(splitDate[1]) <= 12 &&
        new Date().getFullYear() <= parseInt(splitDate[2]) &&
        0 < splitDate[2].length <= 4 
    )

}


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');

    var toggled = false;
    if(window.innerWidth >767) {
        toggled = true;
    }
    menuToggle.addEventListener('click', function() {
        toggled = !toggled;
        console.log(toggled);
        navbar.classList.toggle('open');
        if(toggled) {
            setHeaderBg(toggled);
            menuToggle.textContent = 'X'
        }
        else {
            header.classList.remove('navbar-scrolled');
            menuToggle.textContent = '☰'
        }
    });

    function setHeaderBg(toggled) {
        if ((window.scrollY > window.innerHeight*0.8) && toggled) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    }
    window.onscroll = () => {
        setHeaderBg(toggled);
    };

    const form = document.getElementById('form');
    form.reset();
    form.addEventListener('submit', function (event) {
        const labels = form.querySelectorAll('label');
        var correct = true;
  
        labels.forEach(function (label) {
            const inputId = label.getAttribute('for');
            const input = document.getElementById(inputId);
            const inputValue = input.value;
            if (input && inputValue.trim() === '') {
                correct = false;
            }
            if (correct && inputId == 'email') {
                const isCorrect = ValidateEmail(inputValue);
                if (isCorrect) {
                    alert('E-mail is good!');
                }
                else {
                    correct = false;
                    alert('E-mail is not good!');
                }
            }
            if (correct && inputId == 'appointment') {
                const isCorrect = ValidateDate(inputValue);
                if (isCorrect) {
                    alert('Date is good!');
                }
                else {
                    correct = false;
                    alert('Date is not not not not good!');
                }
            }
        });
        
        if(correct === true) {
            alert('All good!');
            form.reset();
        }

        if (!correct) {
            event.preventDefault(); // Prevent the form from submitting
            alert('Please fill in all the required fields.');
        }
    });
  });