// Settings panel popover toggled by the masthead `#settings-button`.
//
// Persistence:
//   - Dark mode  -> reuses the existing `skin-state` cookie owned by skins.html.
//   - Prefill    -> cookie `settings-prefill-selection` ('true' / 'false', default 'true').
//   - ESC mode   -> cookie `settings-esc-behavior` ('close' | 'clear-then-close'
//                  | 'close-and-clear', default 'close').
//
// Consumers:
//   - navigation.js reads the prefill + ESC cookies on demand at event time.
//   - The dark-mode checkbox here just forwards the click to `#skin-button`
//     so we do not duplicate skin-state logic.

(function () {
  var PREFILL_KEY = 'settings-prefill-selection';
  var ESC_KEY = 'settings-esc-behavior';

  function readBool(name, fallback) {
    var v = getCookie(name, String(fallback), true);
    return v === 'true' || v === true;
  }

  function init() {
    var btn = document.getElementById('settings-button');
    var panel = document.getElementById('settings-panel');
    if (!btn || !panel) return;

    var closeBtn = document.getElementById('settings-panel-close');
    var darkChk = document.getElementById('settings-dark-mode');
    var prefillChk = document.getElementById('settings-prefill-selection');
    var escRadios = document.querySelectorAll('input[name="settings-esc-behavior"]');
    var skinBtn = document.getElementById('skin-button');

    // Initialize control values from cookies.
    prefillChk.checked = readBool(PREFILL_KEY, true);
    var currentEsc = getCookie(ESC_KEY, 'close', true);
    escRadios.forEach(function (r) { r.checked = (r.value === currentEsc); });

    function syncDarkCheckbox() {
      // Defer reading the skin cookie -- skins.html owns it.
      if (typeof getCookie === 'function')
        darkChk.checked = getCookie('skin-state', 'light', true) === 'dark';
    }
    syncDarkCheckbox();

    function positionPanel() {
      // Make the panel measurable (it is scale(0) otherwise).
      panel.style.visibility = 'hidden';
      panel.classList.add('visible');

      var btnRect = btn.getBoundingClientRect();
      var panelWidth = panel.offsetWidth;

      // The panel is position: fixed -- use viewport coordinates only,
      // no window.scrollY needed.
      var ARROW_HALF = 10; // matches $tooltip-arrow-half-size in _variables.scss
      var top = btnRect.bottom + ARROW_HALF;

      // Right-anchor the panel to the settings button.
      var left = btnRect.right - panelWidth;
      var minLeft = 8;
      if (left < minLeft) left = minLeft;

      panel.style.top = top + 'px';
      panel.style.left = left + 'px';

      // Arrow points up at the centre of the settings button.
      var btnCenterX = btnRect.left + btnRect.width / 2;
      var arrowLeft = btnCenterX - left - ARROW_HALF;
      var minArrow = ARROW_HALF;
      var maxArrow = panelWidth - 3 * ARROW_HALF;
      if (arrowLeft < minArrow) arrowLeft = minArrow;
      if (arrowLeft > maxArrow) arrowLeft = maxArrow;
      panel.style.setProperty('--tooltip-arrow-left', arrowLeft + 'px');

      panel.style.visibility = '';
    }

    function openPanel() {
      syncDarkCheckbox();
      positionPanel();
      // `.visible` is the theme's tooltip show class (opacity + scale).
      panel.classList.add('visible');
    }
    function closePanel() {
      panel.classList.remove('visible');
    }
    function isOpen() { return panel.classList.contains('visible'); }
    function togglePanel() { isOpen() ? closePanel() : openPanel(); }

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      togglePanel();
    });
    closeBtn.addEventListener('click', closePanel);

    // Click-outside-to-close.
    document.addEventListener('click', function (event) {
      if (!isOpen()) return;
      if (panel.contains(event.target) || btn.contains(event.target)) return;
      closePanel();
    });

    // ESC closes the settings panel (does NOT touch the search panel).
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 27 && isOpen()) {
        closePanel();
        event.stopPropagation();
      }
    }, true);

    // Re-position on window resize while open.
    window.addEventListener('resize', function () {
      if (isOpen()) positionPanel();
    });

    // Dark mode checkbox -> forward to the skin button's inner icon so the
    // existing toggle logic (in skins.html) runs with `event.target` set to
    // the icon, not the button itself. Clicking the button directly would
    // make `setIcon()` apply `fa-toggle-*` classes to the <button>, which
    // Font Awesome then renders as an extra ghost icon next to the button.
    darkChk.addEventListener('change', function () {
      if (skinBtn) {
        var icon = skinBtn.querySelector('.masthead_button_icon') || skinBtn;
        icon.click();
      }
      setTimeout(syncDarkCheckbox, 50);
    });

    // Persist search settings.
    prefillChk.addEventListener('change', function () {
      setCookie(PREFILL_KEY, prefillChk.checked ? 'true' : 'false');
    });
    escRadios.forEach(function (r) {
      r.addEventListener('change', function () {
        if (r.checked) setCookie(ESC_KEY, r.value);
      });
    });
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();
})();
