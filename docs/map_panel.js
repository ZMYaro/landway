const MAP_PREFIX = 'images/maps/landway_map_v12_camberville_',
	MAP_ALT_TEXT = {
		'current': 'The current landway network, missing many connections.',
		'current_all': 'The current and in progress landway network, with unprotected marked routes and planned routes.',
		'future': 'The landway network someday, with missing connections built out.'
	};

	/** {HTMLButtonElement} */
let currentTab,
	/** {HTMLAnchorElement} */
	mapImageLink,
	/** {HTMLImageElement} */
	mapImage,
	/** {Boolean} */
	showProjects = false;

window.addEventListener('DOMContentLoaded', function () {
	currentTab = document.querySelector('button[role="tab"][aria-selected="true"]');
	mapImageLink = document.querySelector('#map-panel a');
	mapImage = document.querySelector('#map-panel img');
	// Set up event listeners for switching tabs.
	document.querySelector('[role="tablist"]').addEventListener('keydown', handleKeyDown);
	for (let button of document.querySelectorAll('button[role="tab"]')) {
		button.addEventListener('click', (ev) => switchToTab(ev.currentTarget));
		// Enable the button once it has been set up.
		button.disabled = false;
	}
	document.getElementById('show-projects').addEventListener('input', handleShowProjectsChange);
	
	// Make the image map resize with the window.
	imageMapResize(document.querySelector('map[name="projects"]'));
});

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
	
	currentTab.setAttribute('aria-selected', false);
	currentTab.tabIndex = -1;
	currentTab = tab;
	tab.setAttribute('aria-selected', true);
	currentTab.tabIndex = 0;
	tab.focus();
	
	updateMap();
}

/**
 * Update the map to match the current selection.
 */
function updateMap() {
	const mapVariant = currentTab.dataset.mapVariant;
	mapImageLink.href =
		mapImage.src = MAP_PREFIX + mapVariant + (showProjects ? '_projects' : '') + '.png';
	mapImage.alt = MAP_ALT_TEXT[mapVariant];
}

/**
 * Show or hide projects when the checkbox gets toggled.
 * @param {Event} ev
 */
function handleShowProjectsChange(ev) {
	showProjects = ev.currentTarget.checked;
	updateMap();
	mapImage.useMap = showProjects ? '#projects' : '';
}
