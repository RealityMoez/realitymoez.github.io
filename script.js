/* ----------------------------------------------VARIABLES----------------------------------------- */
let pageStart = true;
const header = document.getElementsByClassName("header")[0];
const logo = document.getElementsByClassName("logo")[0];
const logoLink = document.getElementsByTagName("a")[0];

const nav = document.getElementsByClassName("navigation")[0];
const navLinks = nav.querySelectorAll("ul a");

const styleSheet = document.styleSheets[0];

const sectionTitleSelector = '.container-title::after';
const AfterSectionTitleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === sectionTitleSelector);

const cardSelector = '.card';
const cardIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === cardSelector);

const websiteSrcSelector = '.websiteCode';
const websiteSrcIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === websiteSrcSelector);

const skillBarSelector = '.skill-bar';
const skillBarIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === skillBarSelector);

const skillLevelSelector = '.skill-level';
const skillLevelIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === skillLevelSelector);

var skillLevel;

const navIndicator = document.querySelector(".indicator");

const sections = document.querySelectorAll('section');
const bodyTag = document.getElementsByTagName('body')[0];
const windowHeight = window.innerHeight;

const containers = document.querySelectorAll('.container');

// ARRAY OF SKILLS AND THEIR LEVEL
const skills = [
	{ name: "Android", level: 90 },
	{ name: "Java", level: 85 },
	{ name: "Cpp", level: 80 },
	{ name: "CSharp", level: 75 },
	{ name: "C", level: 70 },
	{ name: "JavaScript", level: 70 },
	{ name: "Python", level: 65 },
	{ name: "HTML", level: 60 },
	{ name: "CSS", level: 60 },
	{ name: "Firebase", level: 55 },
	{ name: "SQL", level: 50 }
];
/* ----------------------------------------------VARIABLES END----------------------------------------- */

function preloadImage(url)
{
	var img = new Image();
	img.src = url;
}
preloadImage("images/bg6.jpg");

// SCROLLING ANIMATION
const observer = new IntersectionObserver((entries) =>
{
	entries.forEach((entry) =>
	{
		if (entry.isIntersecting)
		{
			entry.target.classList.remove("hidden");
			entry.target.classList.add("shown");
		}
		else
		{
			entry.target.classList.add("hidden");
			entry.target.classList.remove("shown");
		}
	});
});

const hidden_elements = document.querySelectorAll(".hidden");
hidden_elements.forEach((element) => observer.observe(element));


// ─────────────────────────────────────────────────────────────────────────────


// CHANGE ELEMENTS' COLOR & POSITION BASED ON EVENT
function updateOnEvent()
{
	window.addEventListener('scroll', updateColors);
	window.addEventListener('scroll', () => 
	{
		navIndicator.style.transition = '0.3s ease-in-out width, 0.3s ease left, 0.3s ease top, 1s ease background-color';
		navIndicator_windowScroll();
	});
	window.addEventListener('resize', () => 
	{
		updateColors();
		navIndicator_windowScroll();
		navIndicator.style.transition = 'none';
	});

	logo.addEventListener("mouseover", updateColors);
	logo.addEventListener("mouseout", updateColors);

	for (const nav of navLinks)
	{
		nav.addEventListener("mouseover", updateColors);
		nav.addEventListener("mouseout", updateColors);
	}

	function updateColors()
	{
		pageStart = (window.scrollY <= 120);

		if (pageStart)
		{
			header.style.transition = 'background-color 0.5s ease';
			header.style.backgroundColor = "rgba(255, 255, 255, 0.08)";

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

			navIndicator.style.backgroundColor = 'black';

			styleSheet.cssRules[AfterSectionTitleIndex].style.backgroundColor = 'aqua';

			styleSheet.cssRules[cardIndex].style.border = '3px solid aqua';

			styleSheet.cssRules[websiteSrcIndex].style.transition = 'transform 0.2s ease, border-color 2s ease';
			styleSheet.cssRules[websiteSrcIndex].style.border = '3px solid aqua';

			styleSheet.cssRules[skillBarIndex].style.backgroundColor = 'rgba(0, 255, 238, 0.2)';
			styleSheet.cssRules[skillLevelIndex].style.backgroundColor = 'aqua';


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

				styleSheet.cssRules[cardIndex].style.transition = 'transform 0.2s ease, border-color 2s ease';
				styleSheet.cssRules[cardIndex].style.border = '3px solid yellow';

				styleSheet.cssRules[websiteSrcIndex].style.transition = 'border-color 2s ease';
				styleSheet.cssRules[websiteSrcIndex].style.border = '3px solid yellow';

				styleSheet.cssRules[skillBarIndex].style.backgroundColor = 'rgba(234, 255, 0, 0.2)';
				styleSheet.cssRules[skillLevelIndex].style.backgroundColor = 'yellow';
			}
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

			if (scrollTop >= sectionTop - 200 && sectionBottom > scrollBottom - 300) 
			{
				for (const nav of navLinks)
				{
					if (section.hasAttribute('id') && nav.getAttribute("href") == '#' + section.id)
					{
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

						if ("#" + section.id == "#skills")
						{
							// Animate the progress bar if the entry is a skill
							skills.forEach((skill) => 
							{
								skillLevel = document.querySelector(`#${skill.name.toLowerCase()}_level`);
								skillPerc = document.querySelector(`#${skill.name.toLowerCase()}_perc`);

								skillPerc.style.transition = 'all 3s ease';
								skillPerc.textContent = `${skill.level}%`;
								skillPerc.style.left = `${skill.level + 2}%`;

								skillLevel.style.transition = 'all 3s ease';
								skillLevel.style.width = `${skill.level}%`;
							});
						}
						else
						{
							skills.forEach((skill) => 
							{
								skillLevel = document.querySelector(`#${skill.name.toLowerCase()}_level`);
								skillPerc = document.querySelector(`#${skill.name.toLowerCase()}_perc`);

								skillPerc.style.transition = 'all 0.1s ease';
								skillPerc.textContent = '';
								skillPerc.style.left = '2%';

								skillLevel.style.transition = 'all 0.1s ease';
								skillLevel.style.width = `0%`;
							});
						}
					}
				}
			}
		}
	});
}
// ─────────────────────────────────────────────────────────────────────────────
/* ----------------------------------------------NAVIGATION INDICATOR END----------------------------------------- */
