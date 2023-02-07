/* ----------------------------------------------VARIABLES----------------------------------------- */
let pageStart = true;
const header = document.getElementsByClassName("header")[0];
const logo = document.getElementsByClassName("logo")[0];
const logoLink = document.getElementsByTagName("a")[0];

const nav = document.getElementsByClassName("navigation")[0];
const navLinks = nav.querySelectorAll("ul a");

const styleSheet = document.styleSheets[0];

const sectionTitle_selector = '.container-title::after';
const AfterSectionTitleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === sectionTitle_selector);

const cardSelector = '.card';
const cardIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === cardSelector);

const navIndicator = document.querySelector(".indicator");

const sections = document.querySelectorAll('section');
const windowHeight = window.innerHeight;
/* ----------------------------------------------VARIABLES END----------------------------------------- */


// SCROLLING ANIMATION
const observer = new IntersectionObserver((entries) =>
{
	entries.forEach((entry) =>
	{
		if (entry.isIntersecting)
			entry.target.classList.add("show");
		else
			entry.target.classList.remove("show");
	});
});

const hidden_elements = document.querySelectorAll(".hidden");
hidden_elements.forEach((element) => observer.observe(element));
// ─────────────────────────────────────────────────────────────────────────────


// CHANGE ELEMENTS' COLOR & POSITION BASED ON EVENT
function updateOnEvent()
{
	window.addEventListener('scroll', updateColors);
	window.addEventListener('scroll', navIndicator_windowScroll);

	logo.addEventListener("mouseover", updateColors);
	logo.addEventListener("mouseout", updateColors);

	for (const nav of navLinks)
	{
		nav.addEventListener("mouseover", updateColors);
		nav.addEventListener("mouseout", updateColors);
	}

	function updateColors()
	{
		pageStart = (window.scrollY <= 180);

		if (pageStart)
		{
			header.style.transition = 'background-color 0.5s ease';
			header.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

			if (logo.matches(":hover"))
				logoLink.style.color = "aqua";
			else
				logoLink.style.color = "white";

			for (const nav of navLinks)
			{
				nav.style.transition = '0.2s ease';
				nav.style.color = "yellow";
				nav.style.backgroundColor = "transparent";

				if (nav.matches(":hover"))
				{
					nav.style.backgroundColor = "white";
					nav.style.color = "blue";
				}
			}
		}
		else
		{
			header.style.transition = 'background-color 2s ease';
			header.style.backgroundColor = "aqua";

			logoLink.style.color = "black";

			styleSheet.cssRules[AfterSectionTitleIndex].style.backgroundColor = 'aqua';
			styleSheet.cssRules[cardIndex].style.border = '3px solid aqua';

			for (const nav of navLinks)
			{
				nav.addEventListener("mouseout", () =>
				{
					navIndicator.style.transition = '0.3s ease-in-out width, 0.3s ease left, 0.3s ease top, 1s ease background-color';
					navIndicator_windowScroll();
				});
				nav.addEventListener("mouseover", navIndicator_windowScroll);

				nav.style.transition = '0.2s ease';
				nav.style.color = "black";
				nav.style.backgroundColor = "transparent";

				if (nav.matches(":hover"))
				{
					nav.style.backgroundColor = "black";
					nav.style.color = "white";
					nav.style.transition = 'background-color 0.4s ease, color 0.4s ease';
				}
			}

			if (logo.matches(":hover"))
			{
				logoLink.style.color = "white";
				header.style.backgroundColor = "black";
				header.style.transition = 'background-color 2s ease';

				navIndicator.style.backgroundColor = 'white';

				for (const nav of navLinks)
				{
					nav.style.transition = '2s ease';
					nav.style.color = 'yellow';
				}

				styleSheet.cssRules[AfterSectionTitleIndex].style.transition = 'background-color 2s ease';
				styleSheet.cssRules[AfterSectionTitleIndex].style.backgroundColor = 'yellow';

				styleSheet.cssRules[cardIndex].style.transition = 'border-color 2s ease';
				styleSheet.cssRules[cardIndex].style.border = '3px solid yellow';
			}

			logo.addEventListener("mouseout", () => { navIndicator.style.backgroundColor = 'black'; });
		}
	}
}
updateOnEvent();
// ─────────────────────────────────────────────────────────────────────────────


// TYPING TEXT 
var type = new Typed(".changing_text", {
	strings: [
		"Front End Developer",
		"Software Developer",
		"Android Developer",
		"Computer Science Passionate",
	],
	startDelay: 1000,
	typeSpeed: 75,
	backSpeed: 20,
	backDelay: 1400,
	loop: true,
	cursorChar: "_",
});
// ─────────────────────────────────────────────────────────────────────────────

/* ----------------------------------------------NAVIGATION INDICATOR----------------------------------------- */

// TODO: NAVIGATION INDICATOR AUTO SCROLL BASED ON SECTION
function navIndicator_windowScroll()
{
	if (window.scrollY < 250)
		navIndicator.style.width = '0';

	const scrollTop = document.documentElement.scrollTop;
	const scrollBottom = document.documentElement.scrollTop + windowHeight;

	sections.forEach(function (section, i)
	{
		if (i > 0)
		{
			const sectionTop = section.offsetTop;
			const sectionBottom = section.offsetTop + section.offsetHeight;

			if (scrollTop >= sectionTop - 150 && sectionBottom > scrollBottom - 200) 
			{
				for (const nav of navLinks)
				{
					if (section.hasAttribute('id') && nav.getAttribute("href") == '#' + section.id)
					{
						// FOR SMALLER WINDOW WIDTH
						navIndicator.style.top = `${nav.offsetTop + nav.offsetHeight - 8}px`;
						// ─────────────────────────────────────────────────────────────────────────────
						if (nav.matches(":hover"))
						{
							navIndicator.style.backgroundColor = 'white';
							navIndicator.style.width = `${nav.offsetWidth}px`;
							navIndicator.style.left = `${nav.offsetLeft}px`;
						}
						else if (!nav.matches(":hover"))
						{
							if (!logo.matches(":hover"))
								navIndicator.style.backgroundColor = 'black';

							navIndicator.style.width = `${nav.offsetWidth - 24}px`;
							navIndicator.style.left = `${nav.offsetLeft + 12}px`;
						}

					}
				}
			}
		}
	});
}
// ─────────────────────────────────────────────────────────────────────────────
/* ----------------------------------------------NAVIGATION INDICATOR END----------------------------------------- */
