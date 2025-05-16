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
const cardHints = document.querySelectorAll('.projects .content .card .cardHint');

const websiteSrcBtn = document.querySelector('.websiteCode');

const skillBarRule = document.querySelectorAll('.skill-bar');
const skillLevelRule = document.querySelectorAll('.skill-level');
var skillLevel;

const navIndicator = document.querySelector(".indicator");

const sections = document.querySelectorAll('section');
const bodyTag = document.getElementsByTagName('body')[0];
const windowHeight = window.innerHeight;
const rootElement = document.documentElement;

const formButtons = document.querySelectorAll('form button');
const contactForm = document.getElementById('contact-form');
const form_name = document.getElementById('uName');
const form_email = document.getElementById('uEmail');;
const form_message = document.getElementById('uMessage');

var navHoverBackground = document.getElementsByClassName('navHoverBackground')[0];
const mobileMenuToggleIconSpan = document.querySelectorAll('.mobile-menu-toggle-icon span');
const mobileMenuToggleIcon = document.querySelector('.mobile-menu-toggle-icon');
const mobileNavigation = document.querySelector('.mobile-navigation');
const mobileNavLinks = mobileNavigation.querySelectorAll('a');
/* -------------------------------------------VARIABLES----------------------------------------- */

// ARRAY OF SKILLS AND THEIR LEVELS
const skills = [	
	{ name: "JavaScript", level: 95 },
	{ name: "CSS", level: 90 },
	{ name: "Python", level: 85 },
	{ name: "Android", level: 80 },
	{ name: "HTML", level: 80 },
	{ name: "Java", level: 80 },
	{ name: "Cpp", level: 75 },
	{ name: "CSharp", level: 70 },
	{ name: "C", level: 60 },
	{ name: "Firebase", level: 55 },
	{ name: "SQL", level: 50 }
];
console.log(skills)
/* ----------------------------------------------VARIABLES END----------------------------------------- */

updateOnEvent();

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
	updateTheme();
	updateColors();

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
		if(window.innerWidth < 935)
		{
			mobileMenuToggleIcon.classList.remove('hidden');
			mobileMenuToggleIcon.classList.add('shown');
		}
		else
		{
			mobileMenuToggleIcon.classList.add('hidden');
			mobileMenuToggleIcon.classList.remove('shown');
		}
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

				// Update components based on theme
				if(yellowTheme) {
					applyYellowThemeToComponents();
				} else {
					applyCyanThemeToComponents();
				}
				
				updateIndicatorTheme();
				updateMobileNavColors();
				updateColors();
			}, 500);
		});

		logoSrc.addEventListener("mouseout", (e) => 
		{
			clearTimeout(timeout);
			updateColors();
		});
	}
	
	/* ----------------------------------------------NAVIGATION HOVER EFFECT--------------------------------------------- */
	navLinks.forEach((nav) =>
	{
		const handleMouseMove = (e) => 
		{
			const rect = nav.getBoundingClientRect();
			const { clientX, clientY } = e;
			const { left, top, width, height } = rect;
			const x = (clientX - left - width / 2) * 0.2;
			const y = (clientY - top - height / 2) * 0.2;
			
			navHoverBackground.style.opacity = '1';

			if(yellowTheme || pageStart) {
				navHoverBackground.classList.add('theme-yellow');
				navHoverBackground.classList.remove('theme-cyan');
				navHoverBackground.style.width = `${nav.offsetWidth}px`;
				navHoverBackground.style.left = `${nav.offsetLeft}px`;
				navHoverBackground.style.transform = `translate(${x}px, ${y}px)`;
			} else {
				navHoverBackground.classList.remove('theme-yellow');
				navHoverBackground.classList.add('theme-cyan');
				navHoverBackground.style.width = `${nav.offsetWidth}px`;
				navHoverBackground.style.left = `${nav.offsetLeft}px`;
				navHoverBackground.style.transform = `translate(${x}px, ${y}px)`;
			}
			updateColors();
		};
		
		nav.addEventListener("mouseover", () => {
			nav.addEventListener("mousemove", handleMouseMove);
		});
		
		nav.addEventListener("mouseout", () =>
		{
			nav.removeEventListener("mousemove", handleMouseMove);
			nav.style.backgroundColor = 'transparent';
			navIndicator.style.transition = '0.2s ease width, 0.2s ease left';
			navHoverBackground.style.opacity = '0';
			navHoverBackground.style.transform = 'translate(0, 0)';
			updateColors();
		});
	});
	/* ----------------------------------------------NAVIGATION HOVER EFFECT END----------------------------------------- */

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
			});
			
			resetThemeComponents();
		}
		else
		{
			if(yellowTheme)
			{
				logoSrc.style.filter = 'sepia(0) hue-rotate(300deg) saturate(1) brightness(1) contrast(2)';
				header.style.backgroundColor = "black";
				header.style.transition = 'background-color 2s ease';
				
				applyYellowThemeToComponents();
				
				navLinks.forEach((nav) =>
				{
					nav.style.color = 'yellow';
					sectionPositionUpdate();
				});
			}
			else
			{
				logoSrc.style.filter = 'sepia(1) hue-rotate(300deg) saturate(15) brightness(1) invert(1)';
				header.style.transition = 'background-color 2s ease';
				header.style.backgroundColor = "aqua";
				
				applyCyanThemeToComponents();
				
				navLinks.forEach((nav) =>
				{
					nav.style.color = "black";
					sectionPositionUpdate();
				});
			}
		}
		updateMobileNavColors();
	}

	function applyYellowThemeToComponents() {
		cards.forEach(card => {
			card.classList.add('theme-yellow');
			card.classList.remove('theme-cyan');
		});

		cardHints.forEach(cardHint => {
			cardHint.classList.add('theme-yellow');
			cardHint.classList.remove('theme-cyan');
		});
		
		sectionTitleRule.forEach(title => {
			title.classList.add('theme-yellow');
			title.classList.remove('theme-cyan');
		});
		
		formButtons.forEach(button => {
			button.classList.add('theme-yellow');
			button.classList.remove('theme-cyan');
		});
		
		skillBarRule.forEach(skillBar => {
			skillBar.classList.add('theme-yellow');
			skillBar.classList.remove('theme-cyan');
		});
		
		skillLevelRule.forEach(skillLevel => {
			skillLevel.classList.add('theme-yellow');
			skillLevel.classList.remove('theme-cyan');
		});
		
		websiteSrcBtn.classList.add('theme-yellow');
		websiteSrcBtn.classList.remove('theme-cyan');
	}
	
	function applyCyanThemeToComponents() {
		cards.forEach(card => {
			card.classList.remove('theme-yellow');
			card.classList.add('theme-cyan');
		});

		cardHints.forEach(cardHint => {
			cardHint.classList.remove('theme-yellow');
			cardHint.classList.add('theme-cyan');
		});
		
		sectionTitleRule.forEach(title => {
			title.classList.remove('theme-yellow');
			title.classList.add('theme-cyan');
		});
		
		formButtons.forEach(button => {
			button.classList.remove('theme-yellow');
			button.classList.add('theme-cyan');
		});
		
		skillBarRule.forEach(skillBar => {
			skillBar.classList.remove('theme-yellow');
			skillBar.classList.add('theme-cyan');
		});
		
		skillLevelRule.forEach(skillLevel => {
			skillLevel.classList.remove('theme-yellow');
			skillLevel.classList.add('theme-cyan');
		});
		
		websiteSrcBtn.classList.remove('theme-yellow');
		websiteSrcBtn.classList.add('theme-cyan');
	}
	
	function resetThemeComponents() {
		cards.forEach(card => {
			card.classList.remove('theme-yellow', 'theme-cyan');
		});
		
		sectionTitleRule.forEach(title => {
			title.classList.remove('theme-yellow', 'theme-cyan');
		});
		
		formButtons.forEach(button => {
			button.classList.remove('theme-yellow', 'theme-cyan');
		});
		
		skillBarRule.forEach(skillBar => {
			skillBar.classList.remove('theme-yellow', 'theme-cyan');
		});
		
		skillLevelRule.forEach(skillLevel => {
			skillLevel.classList.remove('theme-yellow', 'theme-cyan');
		});
		
		websiteSrcBtn.classList.remove('theme-yellow', 'theme-cyan');
	}

	mobileMenuToggleIcon.onclick = () => {
		toggleMobileMenu();
	};

	mobileNavLinks.forEach(link => {
		link.onclick = () => {
			toggleMobileMenu();
		};
	});
}

function toggleMobileMenu() {
	mobileMenuToggleIcon.classList.toggle('open');
	mobileNavigation.classList.toggle('open');
}
// ─────────────────────────────────────────────────────────────────────────────

// TYPING TEXT 
var type = new Typed(".changing_text", {
	strings: [
		"Front End Developer",
		"Software Developer",
		"AI Engineer",
		"CS Passionate",
	],
	startDelay: 1000,
	typeSpeed: 60,
	backSpeed: 20,
		backDelay: 1400,
		loop: true,
		cursorChar: "_",
	});
// ─────────────────────────────────────────────────────────────────────────────

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

function updateMobileNavColors() {
	if(pageStart || yellowTheme) {
		mobileNavigation.classList.remove('theme-cyan');
		mobileMenuToggleIconSpan.forEach(span => {
			span?.classList.remove('theme-cyan');
			span?.classList.add('theme-yellow');
		});
		mobileNavLinks.forEach(link => {
			link.style.color = 'yellow';
		});
	} else {
		mobileNavigation.classList.add('theme-cyan');
		mobileMenuToggleIconSpan.forEach(span => {
			span?.classList.add('theme-cyan');
			span?.classList.remove('theme-yellow');
		});
		mobileNavLinks.forEach(link => {
			link.style.color = 'black';
		});
	}
}

function updateIndicatorTheme() {
	if(yellowTheme) {
		navIndicator.classList.add('theme-yellow');
		navIndicator.classList.remove('theme-cyan');
	} else {
		navIndicator.classList.remove('theme-yellow');
		navIndicator.classList.add('theme-cyan');
	}
}