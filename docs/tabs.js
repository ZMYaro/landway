let currentTab;

function init() {
	currentTab = document.querySelector('button[role="tab"][aria-selected="true"]');
	document.querySelector('[role="tablist"]').addEventListener('keydown', handleKeyDown);
	for (let button of document.querySelectorAll('button[role="tab"]')) {
		button.addEventListener('click', (ev) => switchToTab(ev.currentTarget));
		button.disabled = false;
	}
}

/**
 * Handle key being pressed on the tab bar.
 * @param {KeyboardEvent} ev
 */
function handleKeyDown(ev) {
	if (ev.ctrlKey || ev.altKey || ev.metaKey || ev.shiftKey) { return; }
	switch (ev.keyCode) {
		case 37:
			switchToPrevTab(currentTab);
			break;
		case 39:
			switchToNextTab(currentTab);
			break;
	}
}

/**
 * Switch to the previous tab before the currently selected one.
 * @param {HTMLButtonElement}
 */
function switchToPrevTab(tab) {
	if (tab.previousElementSibling) {
		switchToTab(tab.previousElementSibling);
		return;
	}
	switchToTab(Array.from(tab.parentElement.children).at(-1));
}

/**
 * Switch to the next tab after the currently selected one.
 * @param {HTMLButtonElement}
 */
function switchToNextTab(tab) {
	if (tab.nextElementSibling) {
		switchToTab(tab.nextElementSibling);
		return;
	}
	switchToTab(tab.parentElement.children[0]);
}

/**
 * Switch to a tab.
 * @param {HTMLButtonElement}
 */
function switchToTab(tab) {
	if (!tab) { return; }
	document.getElementById(currentTab.getAttribute('aria-controls')).style.display = 'none';
	currentTab.setAttribute('aria-selected', false);
	currentTab.tabIndex = -1;
	currentTab = tab;
	document.getElementById(tab.getAttribute('aria-controls')).style.removeProperty('display');
	tab.setAttribute('aria-selected', true);
	currentTab.tabIndex = 0;
	tab.focus();
}

window.addEventListener('DOMContentLoaded', init);
