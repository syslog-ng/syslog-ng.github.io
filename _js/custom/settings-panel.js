// Settings panel popover toggled by the masthead `#settings-button`.
//
// Persistence:
//   Appearance:
//     - Dark mode    -> reuses the existing `skin-state` cookie owned by skins.html.
//
//   Tooltips:
//     - Tooltips on  -> cookie `settings-tooltips-enabled`   ('true' / 'false', default 'true').
//     - Opacity      -> cookie `settings-tooltip-opacity`    (%, default '100';
//                                                            applied via CSS var --tooltip-opacity).
//     - Show delay   -> cookie `settings-tooltip-delay`      (ms, default '100').
//     - Hide delay   -> cookie `settings-tooltip-hide-delay` (ms, default '50').
//
//   Search:
//     - Prefill      -> cookie `settings-prefill-selection`  ('true' / 'false', default 'true').
//     - Hotkey       -> cookie `settings-hotkey-search`      (combo string, e.g.
//                                                            'Ctrl+Shift+F'; empty disables the shortcut).
//     - ESC mode     -> cookie `settings-esc-behavior`       ('close' | 'clear-then-close'
//                                                            | 'close-and-clear', default 'close').
//     - List scroll  -> cookie `settings-restore-search-scroll` ('true' / 'false', default 'true').
//                       Gates only the in-panel result-list scroll restore on reopen;
//                       the page content scroll position is always saved & restored.
//
// Consumers:
//   - navigation.js reads the prefill + ESC cookies on demand at event time.
//   - The dark-mode checkbox here just forwards the click to `#skin-button`
//     so we do not duplicate skin-state logic.

(function () {
  var PREFILL_KEY = 'settings-prefill-selection';
  var RESTORE_SEARCH_SCROLL_KEY = 'settings-restore-search-scroll';
  var ESC_KEY = 'settings-esc-behavior';
  var HOTKEY_KEY = 'settings-hotkey-search';
  var TOOLTIPS_ENABLED_KEY = 'settings-tooltips-enabled';
  var TOOLTIP_DELAY_KEY = 'settings-tooltip-delay';
  var TOOLTIP_HIDE_DELAY_KEY = 'settings-tooltip-hide-delay';
  var TOOLTIP_OPACITY_KEY = 'settings-tooltip-opacity';
  var TOOLTIP_DELAY_DEFAULT = 100;
  var TOOLTIP_HIDE_DELAY_DEFAULT = 50;
  var TOOLTIP_OPACITY_DEFAULT = 96;

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
    var restoreSearchScrollChk = document.getElementById('settings-restore-search-scroll');
    var hotkeyDisplay = document.getElementById('settings-hotkey-display');
    var hotkeyRecord = document.getElementById('settings-hotkey-record');
    var hotkeyClear = document.getElementById('settings-hotkey-clear');
    var tooltipsEnabledChk = document.getElementById('settings-tooltips-enabled');
    var delaySlider = document.getElementById('settings-tooltip-delay');
    var delayValue = document.getElementById('settings-tooltip-delay-value');
    var hideDelaySlider = document.getElementById('settings-tooltip-hide-delay');
    var hideDelayValue = document.getElementById('settings-tooltip-hide-delay-value');
    var opacitySlider = document.getElementById('settings-tooltip-opacity');
    var opacityValue = document.getElementById('settings-tooltip-opacity-value');
    var escRadios = document.querySelectorAll('input[name="settings-esc-behavior"]');
    var skinBtn = document.getElementById('skin-button');

    // Initialize control values from cookies.
    prefillChk.checked = readBool(PREFILL_KEY, true);
    if (restoreSearchScrollChk)
      restoreSearchScrollChk.checked = readBool(RESTORE_SEARCH_SCROLL_KEY, true);
    var currentHotkey = getCookie(HOTKEY_KEY, 'Ctrl+Shift+F', true);
    hotkeyDisplay.textContent = currentHotkey || '(disabled)';
    var currentEsc = getCookie(ESC_KEY, 'close', true);
    escRadios.forEach(function (r) { r.checked = (r.value === currentEsc); });
    var currentDelay = parseInt(getCookie(TOOLTIP_DELAY_KEY, String(TOOLTIP_DELAY_DEFAULT), true), 10);
    if (isNaN(currentDelay)) currentDelay = TOOLTIP_DELAY_DEFAULT;
    delaySlider.value = String(currentDelay);
    delayValue.textContent = currentDelay + ' ms';
    var currentHideDelay = parseInt(getCookie(TOOLTIP_HIDE_DELAY_KEY, String(TOOLTIP_HIDE_DELAY_DEFAULT), true), 10);
    if (isNaN(currentHideDelay)) currentHideDelay = TOOLTIP_HIDE_DELAY_DEFAULT;
    hideDelaySlider.value = String(currentHideDelay);
    hideDelayValue.textContent = currentHideDelay + ' ms';
    var currentOpacity = parseInt(getCookie(TOOLTIP_OPACITY_KEY, String(TOOLTIP_OPACITY_DEFAULT), true), 10);
    if (isNaN(currentOpacity)) currentOpacity = TOOLTIP_OPACITY_DEFAULT;
    opacitySlider.value = String(currentOpacity);
    opacityValue.textContent = currentOpacity + ' %';
    function applyTooltipOpacity(percent) {
      document.documentElement.style.setProperty('--tooltip-opacity', (percent / 100).toFixed(2));
    }
    applyTooltipOpacity(currentOpacity);
    tooltipsEnabledChk.checked = readBool(TOOLTIPS_ENABLED_KEY, true);

    function syncTooltipDelaysDisabled() {
      var disabled = !tooltipsEnabledChk.checked;
      delaySlider.disabled = disabled;
      hideDelaySlider.disabled = disabled;
      // Dim the whole row (label + value) when disabled.
      [delaySlider, hideDelaySlider].forEach(function (s) {
        var row = s.closest('.settings-panel__row');
        if (row) row.classList.toggle('settings-panel__row--disabled', disabled);
      });
    }
    syncTooltipDelaysDisabled();

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

      // Right-anchor the panel so its right margin from the viewport
      // edge matches the panel's top distance from the viewport top
      // (= `top`). This gives a balanced inset from the top-right
      // corner and decouples the panel from the page content (TOC, …).
      var viewportWidth = window.innerWidth;
      var rightInset = ARROW_HALF;
      var left = viewportWidth - panelWidth - rightInset;
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
      // If the search panel is open underneath, return focus to its
      // input so typing resumes immediately.
      var searchVisible = document.querySelector('.search-content.is--visible');
      if (searchVisible) {
        var searchInput = document.getElementById('search');
        if (searchInput) searchInput.focus();
      }
    }
    function isOpen() { return panel.classList.contains('visible'); }
    function togglePanel() { isOpen() ? closePanel() : openPanel(); }

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      // Hide any hover hint tooltip (e.g. the button's own tooltip) so
      // it does not stay on screen on top of the opened panel.
      var hoverTooltip = document.getElementById('tooltip');
      if (hoverTooltip) hoverTooltip.classList.remove('visible');
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
    if (restoreSearchScrollChk) {
      restoreSearchScrollChk.addEventListener('change', function () {
        setCookie(RESTORE_SEARCH_SCROLL_KEY,
                  restoreSearchScrollChk.checked ? 'true' : 'false');
      });
    }

    // Hotkey customization: click "Change", then press the desired key
    // combination (modifiers + one main key). ESC cancels. "Clear"
    // disables the shortcut entirely.
    var recording = false;
    function setHotkey(combo) {
      setCookie(HOTKEY_KEY, combo);
      hotkeyDisplay.textContent = combo || '(disabled)';
    }
    function describeEvent(event) {
      var key = event.key;
      if (!key) return '';
      // Skip when only a modifier key is pressed by itself.
      if (key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Meta') return '';
      var parts = [];
      if (event.ctrlKey)  parts.push('Ctrl');
      if (event.shiftKey) parts.push('Shift');
      if (event.altKey)   parts.push('Alt');
      if (event.metaKey)  parts.push('Meta');
      // Normalize to a single readable token (single letters uppercased).
      if (key.length === 1) key = key.toUpperCase();
      parts.push(key);
      return parts.join('+');
    }
    function stopRecording() {
      recording = false;
      hotkeyRecord.textContent = 'Change';
      hotkeyRecord.classList.remove('settings-panel__hotkey-btn--recording');
    }
    hotkeyRecord.addEventListener('click', function () {
      recording = true;
      hotkeyRecord.textContent = 'Press keys…';
      hotkeyRecord.classList.add('settings-panel__hotkey-btn--recording');
    });
    hotkeyClear.addEventListener('click', function () {
      if (recording) stopRecording();
      setHotkey('');
    });
    document.addEventListener('keydown', function (event) {
      if (!recording) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'Escape') {
        stopRecording();
        return;
      }
      var combo = describeEvent(event);
      if (!combo) return; // pure modifier; wait for the main key
      setHotkey(combo);
      stopRecording();
    }, true);
    delaySlider.addEventListener('input', function () {
      delayValue.textContent = delaySlider.value + ' ms';
    });
    delaySlider.addEventListener('change', function () {
      setCookie(TOOLTIP_DELAY_KEY, delaySlider.value);
    });
    hideDelaySlider.addEventListener('input', function () {
      hideDelayValue.textContent = hideDelaySlider.value + ' ms';
    });
    hideDelaySlider.addEventListener('change', function () {
      setCookie(TOOLTIP_HIDE_DELAY_KEY, hideDelaySlider.value);
    });
    opacitySlider.addEventListener('input', function () {
      opacityValue.textContent = opacitySlider.value + ' %';
      applyTooltipOpacity(parseInt(opacitySlider.value, 10));
    });
    opacitySlider.addEventListener('change', function () {
      setCookie(TOOLTIP_OPACITY_KEY, opacitySlider.value);
    });
    tooltipsEnabledChk.addEventListener('change', function () {
      setCookie(TOOLTIPS_ENABLED_KEY, tooltipsEnabledChk.checked ? 'true' : 'false');
      syncTooltipDelaysDisabled();
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
