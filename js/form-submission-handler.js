document.addEventListener("DOMContentLoaded", function() {
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      } else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      formData[name] = element.value;

      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses";
    formData.formGoogleSendEmail = form.dataset.email || "";

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    if (formData.honeypot) {
      playSound(false);
      return false;
    }

    if (!validateForm(formData.data)) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        playSound(true);
        window.location.href = "thankyou.html";
      } else if (xhr.readyState === 4) {
        playSound(false);
      }
    };

    var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  function validateForm(data) {
    var name = data.name.trim();
    var email = data.email.trim();
    var phone = data.phone.trim();
    var message = data.message.trim();

    if (name === "" || name === null) {
      playSound(false);
      alert("Name must not be empty");
      return false;
    } else if (!validateEmail(email)) {
      playSound(false);
      alert("Please enter a valid e-mail address.\nEmail address must be like xyz@xyz.xyz");
      return false;
    } else if (email === "" || email === null) {
      playSound(false);
      alert("Email should be present.");
      return false;
    } else if (phone === "" || phone === null) {
      playSound(false);
      alert("Phone number is compulsory");
      return false;
    } else if (!validatePhoneNumber(phone)) {
      playSound(false);
      alert("Phone number must be numeric and not exceed 10 characters");
      return false;
    } else if (message === "" || message === null) {
      playSound(false);
      alert("Message must not be empty");
      return false;
    } else if (message.length > 100) {
      playSound(false);
      alert("Message can't exceed 100 characters.");
      return false;
    } else {
      return true;
    }
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePhoneNumber(phone) {
    var re = /^\d{10}$/;
    return re.test(phone);
  }

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  function playSound(success) {
    var audioElement = success ? document.getElementById("success") : document.getElementById("alert");
    if (audioElement) {
      audioElement.play().catch(function(error) {
        console.error("Error playing audio:", error);
      });
    }
  }

  var forms = document.querySelectorAll("form.gform");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", handleFormSubmit, false);
  }
});
