
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  document.querySelectorAll('.netlify-ajax-form').forEach(function (formEl) {
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = formEl.querySelector('.form-status');
      var submitBtn = formEl.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.textContent;
      var formData = new FormData(formEl);
      var body = new URLSearchParams(formData).toString();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function (response) {
        if (response.ok) {
          formEl.reset();
          formEl.querySelectorAll('input, textarea, select, button').forEach(function (el) { el.style.display = 'none'; });
          statusEl.style.display = 'block';
          statusEl.style.color = 'var(--blue)';
          statusEl.style.fontWeight = '700';
          statusEl.textContent = formEl.getAttribute('data-success-message') || 'Thanks! We will get back to you shortly.';
        } else {
          throw new Error('Network response was not ok');
        }
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--magenta)';
        statusEl.textContent = 'Something went wrong. Please call or WhatsApp us instead.';
      });
    });
  });

  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('nav.links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
