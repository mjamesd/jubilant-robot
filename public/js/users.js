const loginFormHandler = async (event) => {
  event.preventDefault();

  const body = {
    email: $('#email-login').val().trim(),
    password: $('#password-login').val().trim(),
  };

  if (body.email && body.password) {
    const response = await fetch(`/api/users/login`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  if (comparePasswords) {
    const body = {
      name: $('#name-signup').val().trim(),
      email: $('#email-signup').val().trim(),
      password: $('#password-signup').val().trim(),
    };

    if (body.name && body.email && body.password) {
      const response = await fetch(`/api/users/add`, {
        method: `POST`,
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify(body),
      });


      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(`Failed to sign up... Maybe the username or email address is already being used? Your password must be at least 8 and no more than 64 characters. Please check your information and try again.`);
      }
    } else {
      alert(`All fields are required. Please check your information and try again.`);
    }
  } else {
    alert(`The passwords you entered do not match. Please check your information and try again.`);
  }
  return false;
};

const comparePasswords = () => {
  const pass1 = $('#password-signup');
  const pass2 = $('#password2-signup');

  if (pass1.val() == "" || pass2.val() == "") {
    return true;
  }

  if (pass1.val() !== pass2.val()) {
    $('#passwordNotMatch').show();
    pass1.addClass('invalid');
    pass2.addClass('invalid');
  } else {
    $('#passwordNotMatch').hide();
    pass1.removeClass('invalid');
    pass2.removeClass('invalid');
    if ($('#users-add')[0].checkValidity() === false) {
      pass1.addClass('invalid');
      pass2.addClass('invalid');
    }
  }
};

// Event handlers
$('#passwordNotMatch').hide();
$('#users-login').submit(loginFormHandler);
$('#users-add').submit(signupFormHandler);
$('#password-signup').keyup(comparePasswords);
$('#password2-signup').keyup(comparePasswords);