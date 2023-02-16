/* ----------------------------------------------VARIABLES----------------------------------------- */
let pageStart = true;
let darkTheme = true;
const header = document.getElementsByClassName("header")[0];
const logo = document.getElementsByClassName("logo")[0];
const logoLink = document.getElementsByTagName("a")[0];

const nav = document.getElementsByClassName("navigation")[0];
const navLinks = nav.querySelectorAll("ul a");

const sectionTitleRule = document.querySelectorAll(".container-title");

const cardRule = document.querySelectorAll('.card');

const websiteSrcRule = document.querySelector('.websiteCode');

const skillBarRule = document.querySelectorAll('.skill-bar');
const skillLevelRule = document.querySelectorAll('.skill-level');
var skillLevel;

const navIndicator = document.querySelector(".indicator");

const sections = document.querySelectorAll('section');
const bodyTag = document.getElementsByTagName('body')[0];
const windowHeight = window.innerHeight;

var webSiteCodeSrc = document.head.appendChild(document.createElement("style"));
var AfterSectionTitle = document.head.appendChild(document.createElement("style"));
var contactFormBtn = document.head.appendChild(document.createElement("style"));
var pageHint = document.head.appendChild(document.createElement("style"));

const contactForm = document.getElementById('contact-form');
const form_name = document.getElementById('uName');
const form_email = document.getElementById('uEmail');;
const form_message = document.getElementById('uMessage');

const clickHint = document.getElementsByClassName(".clickHint");

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
	window.addEventListener('scroll', () => 
	{
		updateColors();
		navIndicator.style.transition = '0.3s ease-in-out width, 0.3s ease left, 0.3s ease top, 1s ease background-color';
		navIndicatorUpdate();
	});
	window.addEventListener('resize', () => 
	{
		updateColors();
		navIndicatorUpdate();
		navIndicator.style.transition = 'none';

		if (window.innerWidth <= 768)
		{
			clickHint.innerHTML = "click me";
		}
		else
		{
			clickHint.innerHTML = "hover me";
		}
	});
	let timeout;
	logo.addEventListener("mouseover", (e) => 
	{
		timeout = setTimeout(() =>
		{
			if (!darkTheme) darkTheme = true;
			else darkTheme = false;

			nav.style.transition = '2s ease';
			updateColors();
		}, 500);
	});

	logo.addEventListener("mouseout", (e) => 
	{
		clearTimeout(timeout);
		updateColors();
	});

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
				nav.style.transition = 'all 0.5s ease';
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
			if (darkTheme)
			{
				logoLink.style.color = "white";
				header.style.backgroundColor = "black";
				header.style.transition = 'background-color 2s ease';
				navIndicator.style.backgroundColor = 'white';
				webSiteCodeSrc.innerHTML = '.websiteCode {border: 3px solid yellow;}';
				AfterSectionTitle.innerHTML = '.container-title::after {background-color: yellow; transition: background-color 2s ease;}';
				contactFormBtn.innerHTML = 'form button {border: 2px solid yellow;}';
				pageHint.innerHTML = '.contact .content .hint {color: yellow;}';

				for (const nav of navLinks)
				{
					nav.style.color = 'yellow';
					nav.style.backgroundColor = "transparent";
					navIndicator.style.border = 'none';

					if (nav.matches(":hover"))
					{
						nav.style.transition = '0.5s ease';
						nav.style.backgroundColor = "white";
						nav.style.color = "black";
						navIndicatorUpdate();
					}
					navIndicatorUpdate();
				}

				for (const card of cardRule)
				{
					card.style.transition = 'transform 0.2s ease, border-color 2s ease';
					card.style.border = '3px solid yellow';
				}

				for (const skillBar of skillBarRule)
				{
					skillBar.style.backgroundColor = 'rgba(234, 255, 0, 0.2)';
				}

				for (const skillLevel of skillLevelRule)
				{
					skillLevel.style.backgroundColor = 'yellow';
				}
			}
			else
			{
				logoLink.style.color = "black";
				header.style.transition = 'background-color 2s ease';
				header.style.backgroundColor = "aqua";
				navIndicator.style.backgroundColor = 'black';
				webSiteCodeSrc.innerHTML = '.websiteCode {border: 3px solid aqua;}';
				webSiteCodeSrc.innerHTML = '.websiteCode:hover {border: 3px solid black;}';
				AfterSectionTitle.innerHTML = '.container-title::after {background-color: aqua; transition: background-color 2s ease;}';
				contactFormBtn.innerHTML = 'form button {border: 2px solid aqua;}';
				pageHint.innerHTML = '.contact .content .hint {color: aqua;}';

				for (const card of cardRule)
				{
					card.style.border = '3px solid aqua';
				}

				for (const skillBar of skillBarRule)
				{
					skillBar.style.backgroundColor = 'rgba(0, 255, 238, 0.2)';
				}

				for (const skillLevel of skillLevelRule)
				{
					skillLevel.style.backgroundColor = 'aqua';
				}

				for (const nav of navLinks)
				{
					navIndicatorUpdate();

					nav.addEventListener("mouseout", () =>
					{
						nav.style.backgroundColor = 'transparent';
						navIndicator.style.transition = '0.3s ease-in-out width, 0.3s ease left, 0.3s ease top, 1s ease background-color';
					});

					nav.style.transition = 'all 0.5s ease';
					nav.style.color = "black";
					nav.style.backgroundColor = "transparent";

					if (nav.matches(":hover"))
					{
						nav.style.backgroundColor = "black";
						nav.style.color = "white";
					}
				}
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
function navIndicatorUpdate()
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
							if (darkTheme)
							{
								navIndicator.style.backgroundColor = 'black';
								navIndicator.style.borderBottom = '0.5px solid white';
							}
							else
								navIndicator.style.backgroundColor = 'white';

							navIndicator.style.width = `${nav.offsetWidth}px`;
							navIndicator.style.left = `${nav.offsetLeft}px`;
						}
						else if (!nav.matches(":hover"))
						{
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


/* ----------------------------------------------CONTACT FORM - RECIEVE EMAIL--------------------------------------- */
emailjs.init("xtwhY4kGdw0CXW4Xk");

contactForm.addEventListener("submit", contactMsgSend);

function contactMsgSend(e)
{
	e.preventDefault();

	const serviceID = "service_8dd77nd";
	const templateID = "template_njen0la";

	var parameters = {
		name: form_name.value,
		email: form_email.value,
		message: form_message.value,
	};

	if (form_email.value == "")
		parameters.email = "empty@mail.com";

	emailjs
		.send(serviceID, templateID, parameters)
		.then((response) =>
		{
			alert("Message Sent");
		})
		.catch((error) => console.log(error));
}
/* ----------------------------------------------CONTACT FORM - RECIEVE EMAIL END----------------------------------- */

