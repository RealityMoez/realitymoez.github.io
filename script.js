/* ----------------------------------------------VARIABLES----------------------------------------- */
let pageStart = true;
let yellowTheme = true;
const header = document.getElementsByClassName("header")[0];
const logoSrc = document.getElementById("logoSrc");

const nav = document.getElementsByClassName("navigation")[0];
const navLinks = nav.querySelectorAll("ul a");

const sectionTitleRule = document.querySelectorAll(".container-title");

const cards = document.querySelectorAll('.card');
const cardHeaders = document.querySelectorAll('.projects .content .card h5');

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
var cardAction = document.head.appendChild(document.createElement("style"));

const contactForm = document.getElementById('contact-form');
const form_name = document.getElementById('uName');
const form_email = document.getElementById('uEmail');;
const form_message = document.getElementById('uMessage');

var navHoverBackground = document.getElementsByClassName('navHoverBackground')[0];

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNavigation = document.querySelector('.mobile-navigation');
const mobileNavLinks = mobileNavigation.querySelectorAll('a');
/* -------------------------------------------VARIABLES----------------------------------------- */

// ARRAY OF SKILLS AND THEIR LEVELS
const skills = [	
	{ name: "JavaScript", level: 90 },
	{ name: "Java", level: 85 },
	{ name: "Cpp", level: 80 },
	{ name: "CSharp", level: 75 },
	{ name: "C", level: 70 },
	{ name: "Android", level: 70 },
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
		if(entry.isIntersecting)
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
skills.forEach((skill) => 
{
	skillLevel = document.querySelector(`#${skill.name.toLowerCase()}_level`);
	skillLevel.style.transition = 'all 0.1s ease';
	skillLevel.style.width = `0%`;
});

// CHANGE ELEMENTS' COLOR & POSITION BASED ON EVENT
function updateOnEvent()
{
	window.addEventListener('scroll', () => 
	{
		updateColors();
		navIndicator.style.transition = '0.2s ease width, 0.2s ease left';
		sectionPositionUpdate();
	});
	window.addEventListener('resize', () => 
	{
		updateColors();
		sectionPositionUpdate();
		navIndicator.style.transition = 'none';
	});

	function updateTheme()
	{
		let timeout;
		logoSrc.addEventListener("mouseover", (e) => 
		{
			if(pageStart) logoSrc.style.filter = 'sepia(1) hue-rotate(300deg) saturate(15) brightness(1) invert(1)';
			else if(yellowTheme) logoSrc.style.filter = 'sepia(1) hue-rotate(300deg) saturate(15) brightness(1) invert(1)';
			else logoSrc.style.filter = 'sepia(0) hue-rotate(300deg) saturate(1) brightness(1) contrast(2)';

			timeout = setTimeout(() =>
			{
				if(!yellowTheme) yellowTheme = true;
				else yellowTheme = false;

				cards.forEach((card) =>
				{
					if(yellowTheme) card.style.border = '3px solid yellow';
					else card.style.border = '3px solid aqua';
				});				
				updateColors();
			}, 500);
		});

		logoSrc.addEventListener("mouseout", (e) => 
		{
			clearTimeout(timeout);
			updateColors();
		});
	}
	updateTheme();

	navLinks.forEach((nav) =>
	{
		nav.addEventListener("mouseover", () => 
		{
			if(yellowTheme)	navHoverBgYellow(nav);
			else navHoverBgCyan(nav);
			updateColors();
		});
		nav.addEventListener("mouseout", () =>
		{
			nav.style.backgroundColor = 'transparent';
			navIndicator.style.transition = '0.2s ease width, 0.2s ease left';
			navHoverBackground.style.opacity = '0';
			updateColors();
		});
	});

	cards.forEach((card) =>
	{
		card.addEventListener("mouseover", () => 
		{
			card.style.border = '3px solid black';
		});

		card.addEventListener("mouseout", () => 
		{
			if(yellowTheme) card.style.border = '3px solid yellow';
			else card.style.border = '3px solid aqua';
		});
	});

	function updateColors()
	{
		pageStart = (window.scrollY <= 120);
		if(pageStart)
		{
			header.style.transition = 'background-color 0.5s ease';
			header.style.backgroundColor = "rgba(255, 255, 255, 0.08)";

			if(logoSrc.matches(':hover')) logoSrc.style.filter = 'sepia(1) hue-rotate(300deg) saturate(15) brightness(1) invert(1)';
			else logoSrc.style.filter = 'none';

			navLinks.forEach((nav) =>
			{
				nav.style.color = "yellow";
				nav.style.backgroundColor = "transparent";
				if(nav.matches(":hover")) navHoverBgYellow(nav);
			});
		}
		else
		{
			if(yellowTheme)
			{
				logoSrc.style.filter = 'sepia(0) hue-rotate(300deg) saturate(1) brightness(1) contrast(2)';
				header.style.backgroundColor = "black";
				header.style.transition = 'background-color 2s ease';
				navIndicator.style.backgroundColor = 'white';
				navIndicator.style.borderBottom = '1px solid transparent';
				webSiteCodeSrc.innerHTML = '.websiteCode {border: 3px solid yellow;}';
				AfterSectionTitle.innerHTML = '.container-title::after {background-color: yellow; transition: background-color 2s ease;}';
				contactFormBtn.innerHTML = 'form button {border: 2px solid yellow;}';
				pageHint.innerHTML = '.contact .content .hint {color: yellow;}';

				skillBarRule.forEach((skillBar) =>
				{
					skillBar.style.backgroundColor = 'rgba(234, 255, 0, 0.2)';
				});
				skillLevelRule.forEach((skillLevel) =>
				{
					skillLevel.style.backgroundColor = 'yellow';
				});

				navLinks.forEach((nav) =>
				{
					nav.style.color = 'yellow';
					sectionPositionUpdate();
					if(nav.matches(":hover")) navHoverBgYellow(nav);
				});
			}
			else
			{
				logoSrc.style.filter = 'sepia(1) hue-rotate(300deg) saturate(15) brightness(1) invert(1)';
				header.style.transition = 'background-color 2s ease';
				header.style.backgroundColor = "aqua";
				navIndicator.style.backgroundColor = 'black';
				navIndicator.style.borderBottom = '1px solid white';
				webSiteCodeSrc.innerHTML = '.websiteCode {border: 3px solid aqua;} .websiteCode:hover {border: 3px solid black;}';
				AfterSectionTitle.innerHTML = '.container-title::after {background-color: aqua; transition: background-color 2s ease;}';
				contactFormBtn.innerHTML = 'form button {border: 2px solid aqua;}';
				pageHint.innerHTML = '.contact .content .hint {color: aqua;}';

				skillBarRule.forEach((skillBar) =>
				{
					skillBar.style.backgroundColor = 'rgba(0, 255, 238, 0.2)';
				});
				skillLevelRule.forEach((skillLevel) =>
				{
					skillLevel.style.backgroundColor = 'aqua';
				});

				navLinks.forEach((nav) =>
				{
					nav.style.color = "black";
					sectionPositionUpdate();
					if(nav.matches(":hover")) navHoverBgCyan(nav);
				});
			}
		}
		updateMobileNavColors();
	}

	mobileMenuToggle.addEventListener('click', () => {
		updateColors();
		mobileMenuToggle.classList.toggle('open');
		mobileNavigation.classList.toggle('open');
	});
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
	typeSpeed: 60,
	backSpeed: 20,
		backDelay: 1400,
		loop: true,
		cursorChar: "_",
	});
// ─────────────────────────────────────────────────────────────────────────────

/* ----------------------------------------------NAVIGATION INDICATOR----------------------------------------- */
// NAVIGATION INDICATOR AUTO MOVE BASED ON SECTION
function sectionPositionUpdate()
{
	if(window.scrollY < 250)
	{
		navIndicator.style.width = '0';
		navIndicator.style.left = '0';
	}

	const scrollTop = document.documentElement.scrollTop;
	const scrollBottom = document.documentElement.scrollTop + windowHeight;

	sections.forEach((section, i) =>
	{
		if(i > 0)
		{
			const sectionTop = section.offsetTop;
			const sectionBottom = section.offsetTop + section.offsetHeight;

			if(scrollTop >= (sectionTop - 200) && (scrollBottom - 300) < sectionBottom) 
			{
				navLinks.forEach((nav) =>
				{
					if(section.hasAttribute('id') && nav.getAttribute("href") == '#' + section.id)
					{
						if(nav.matches(":hover"))
						{
							if(yellowTheme)
							{
								navIndicator.style.backgroundColor = 'white';
								navIndicator.style.borderBottom = '1px solid transparent';
							}
							else
							{
								navIndicator.style.backgroundColor = 'black';
								navIndicator.style.borderBottom = '1px solid white';
							}

							navIndicator.style.transition = '0.2s ease width, 0.2s ease left';
							navIndicator.style.width = `${(nav.offsetWidth)}px`;
							navIndicator.style.left = `${(nav.offsetLeft)}px`;
						}
						if(!nav.matches(":hover"))
						{
							navIndicator.style.width = `${(nav.offsetWidth - 60)}px`;
							navIndicator.style.left = `${(nav.offsetLeft + 30)}px`;
						}

						if(section.id == "skills")
						{
							// Animate the skill bars once if the viewport is the `skills` section
							skills.forEach((skill) => 
							{
								skillLevel = document.querySelector(`#${skill.name.toLowerCase()}_level`);
								skillLevel.style.transition = 'all 2s ease';
								skillLevel.style.width = `${skill.level}%`;
							});
						}
					}
				});
			}
		}
	});
}
// ─────────────────────────────────────────────────────────────────────────────
/* ----------------------------------------------NAVIGATION INDICATOR END----------------------------------------- */

var divElement = document.createElement('div');
var loadingElement = document.createElement('div');
const formContainer = document.getElementsByTagName('form')[0];

function animateLoading()
{
	divElement = document.createElement('div');

	loadingElement = document.createElement('div');
	loadingElement.classList.add('loading-dots');

	const loadingDot1 = document.createElement('span');
	const loadingDot2 = document.createElement('span');
	const loadingDot3 = document.createElement('span');

	loadingElement.appendChild(loadingDot1);
	loadingElement.appendChild(loadingDot2);
	loadingElement.appendChild(loadingDot3);

	divElement.appendChild(loadingElement);
	formContainer.appendChild(divElement);
}

/* ----------------------------------------------CONTACT FORM - RECIEVE EMAIL--------------------------------------- */
emailjs.init("xtwhY4kGdw0CXW4Xk");

var sendBtn = document.getElementsByClassName("contactSend")[0];
var animateTimeOut;

contactForm.addEventListener("submit", (e) => 
{
	if(formContainer.childElementCount == 4)
	{
		animateLoading();
		animateTimeOut = setTimeout(() => 
		{
			formContainer.removeChild(divElement);
		}, 850);
	}
	contactMsgSend(e);
});

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

	if(form_email.value == "")
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

/* ----------------------------------------------NAVIGATION HOVER EFFECT--------------------------------------------- */
function navHoverBgYellow(navLink)
{
	navHoverBackground.style.opacity = '1';
	navHoverBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
	navHoverBackground.style.width = `${navLink.offsetWidth}px`;
	navHoverBackground.style.left = `${navLink.offsetLeft}px`;
}
function navHoverBgCyan(navLink)
{
	navHoverBackground.style.opacity = '1';

	if(pageStart)
		navHoverBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
	else
		navHoverBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

	navHoverBackground.style.width = `${navLink.offsetWidth}px`;
	navHoverBackground.style.left = `${navLink.offsetLeft}px`;
}
/* ----------------------------------------------NAVIGATION HOVER EFFECT END----------------------------------------- */


function updateMobileNavColors() {
	if(pageStart)
	{
		mobileNavigation.style.background = 'rgb(0, 0, 0, 0.3)';
        mobileNavLinks.forEach(link => {
            link.style.color = 'yellow';
        });
	}
	else
	{
		if (yellowTheme) {
			mobileNavigation.style.background = 'rgb(0, 0, 0, 0.75)';
			mobileNavLinks.forEach(link => {
				link.style.color = 'yellow';
			});
		} else {
			mobileNavigation.style.background = 'rgb(0, 255, 255, 0.75)';
			mobileNavLinks.forEach(link => {
				link.style.color = 'black';
			});
		}
	}

}