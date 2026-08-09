/* ============================================================
   Aicha Belghiti — Portfolio  ·  script.js
   Scroll progress · reveal-on-scroll · magnetic buttons ·
   portfolio zoom (CSS) · mobile nav · contact form
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- scroll progress bar ---- */
    var prog = document.getElementById('progress');
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (prog) prog.style.width = pct + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- reveal on scroll ---- */
    var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    reveals.forEach(function (el) { el.classList.add('reveal'); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var parent = el.parentElement;
            var sibs = parent ? Array.prototype.slice.call(parent.querySelectorAll(':scope > [data-reveal]')) : [el];
            var i = Math.max(0, sibs.indexOf(el));
            el.style.transitionDelay = (i * 0.08) + 's';
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- magnetic buttons ---- */
    Array.prototype.slice.call(document.querySelectorAll('[data-magnetic]')).forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.35) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0,0)'; });
    });

    /* ---- mobile nav ---- */
    var burger = document.getElementById('hamburger');
    var nav = document.getElementById('main-nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          nav.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ---- contact form (static: no backend) ---- */
    var form = document.getElementById('contact-form');
    var sent = document.getElementById('form-sent');
    var again = document.getElementById('send-again');
    if (form && sent) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.style.display = 'none';
        sent.style.display = 'flex';
      });
    }
    if (again && form && sent) {
      again.addEventListener('click', function () {
        form.reset();
        sent.style.display = 'none';
        form.style.display = 'flex';
      });
    }
  });
})();


/* ============================================================
   Cursor-follower liquid glow
============================================================ */
(function () {
   'use strict';
   if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

 document.addEventListener('DOMContentLoaded', function () {
    var glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

                           var mouseX = 0, mouseY = 0, curX = 0, curY = 0, primed = false;

                           window.addEventListener('mousemove', function (e) {
                              mouseX = e.clientX;
                              mouseY = e.clientY;
                              if (!primed) {
                                 curX = mouseX; curY = mouseY; primed = true;
                                 glow.classList.add('is-active');
                              }
                              var hoverTarget = e.target.closest && e.target.closest('a, button, [data-magnetic], .qual-card, .service-card, .project-card, .social-chip');
                              glow.classList.toggle('is-hover', !!hoverTarget);
                           }, { passive: true });

                           document.addEventListener('mouseleave', function () {
                              glow.classList.remove('is-active');
                           });

                           (function tick() {
                              curX += (mouseX - curX) * 0.16;
                              curY += (mouseY - curY) * 0.16;
                              glow.style.transform = 'translate(' + curX + 'px,' + curY + 'px) translate(-50%,-50%)';
                              requestAnimationFrame(tick);
                           })();
 });
})();
