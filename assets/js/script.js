// element toggle function
const elementToggleFunc = (elem) => {
	elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
	elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = () => {
	modalContainer.classList.toggle("active");
	overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
	testimonialsItem[i].addEventListener("click", function () {
		modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
		modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
		modalTitle.innerHTML = this.querySelector(
			"[data-testimonials-title]",
		).innerHTML;
		modalText.innerHTML = this.querySelector(
			"[data-testimonials-text]",
		).innerHTML;

		testimonialsModalFunc();
	});
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // Fix typo here
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

// Add touch event support for mobile
select.addEventListener("touchend", function (e) {
	e.preventDefault();
	e.stopPropagation(); // Prevent event bubbling
	elementToggleFunc(this);
});

// Close select box when clicking outside
document.addEventListener("click", (e) => {
	if (!select.contains(e.target)) {
		select.classList.remove("active");
	}
});

selectItems.forEach((item) => {
	item.addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText; // Update select value display
		elementToggleFunc(select);

		filterBtn.forEach((btn) => {
			if (btn.innerText.toLowerCase() === selectedValue) {
				btn.click();
			}
		});
	});

	// Add touch event support for mobile
	item.addEventListener("touchend", function (e) {
		e.preventDefault();
		e.stopPropagation(); // Prevent event bubbling
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText; // Update select value display
		elementToggleFunc(select);

		filterBtn.forEach((btn) => {
			if (btn.innerText.toLowerCase() === selectedValue) {
				btn.click();
			}
		});
	});
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
	for (let i = 0; i < filterItems.length; i++) {
		if (filterItems[i].dataset.category === "web development") {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}
	}
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;
	});
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", () => {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}

// Project modal functionality
const projectModalContainer = document.querySelector(
	"[data-project-modal-container]",
);
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModals = document.querySelectorAll("[data-modal]");
const projectModalCloseBtns = document.querySelectorAll(".modal-close-btn");

// Close modal function
const closeProjectModal = (e) => {
	// Only close if clicking close button
	if (!e.target.closest(".modal-close-btn")) return;

	e.stopPropagation();
	projectModalContainer.classList.remove("active");
	projectOverlay.classList.remove("active");
	document.body.classList.remove("modal-is-active");
	projectModals.forEach((modal) => {
		modal.style.display = "none";
	});
};

// Open modal function
const openProjectModal = (projectName) => {
	const targetModal = document.querySelector(`[data-modal="${projectName}"]`);
	if (!targetModal) return;

	projectModalContainer.classList.add("active");
	projectOverlay.classList.add("active");
	document.body.classList.add("modal-is-active");
	targetModal.style.display = "block";
};

// Add click events to project triggers
document.querySelectorAll(".project-trigger").forEach((trigger, index) => {
	trigger.addEventListener("click", () => {
		const projectName = index === 0 ? "gymnavigator" : "vulcon";
		openProjectModal(projectName);
	});
});

// Add click event listener to modal container for close buttons
projectModalContainer.addEventListener("click", closeProjectModal);

// Add click events to close buttons and overlay
projectModalCloseBtns.forEach((btn) => {
	btn.addEventListener("click", closeProjectModal);
});

projectOverlay.addEventListener("click", closeProjectModal);

// Add escape key listener
document.addEventListener("keydown", (e) => {
	if (
		e.key === "Escape" &&
		projectModalContainer.classList.contains("active")
	) {
		closeProjectModal();
	}
});

// Get all modals elements
const modals = document.querySelectorAll("[data-modal-container]");

// Add event listeners to all close buttons in all modals
modals.forEach((modal) => {
	const closeBtn = modal.querySelector("[data-modal-close-btn]");
	const overlay = modal.querySelector("[data-overlay]");

	if (closeBtn) {
		closeBtn.addEventListener("click", () => {
			modal.classList.remove("active");
		});
	}

	if (overlay) {
		overlay.addEventListener("click", () => {
			modal.classList.remove("active");
		});
	}
});

// When opening a modal
function openModal(modalContainer) {
	if (modalContainer) {
		modalContainer.classList.add("active");
	}
}
