document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetEl = document.querySelector(this.getAttribute("href"));
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));
}

const modal = document.getElementById("certModal");
const openModal = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

if (modal && openModal && closeBtn) {
  openModal.onclick = () => (modal.style.display = "block");
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}

const counters = document.querySelectorAll(".counter");
let counterTriggered = false;
const speed = 200;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    if (!target) return;

    let count = 0;
    const updateCount = () => {
      const increment = Math.max(1, Math.ceil(target / speed));
      count += increment;

      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

window.addEventListener("scroll", () => {
  const achievements = document.getElementById("achievements");
  if (achievements) {
    const rect = achievements.getBoundingClientRect();
    if (!counterTriggered && rect.top < window.innerHeight) {
      animateCounters();
      counterTriggered = true;
    }
  }
});

(function () {
  const revealSelectors = [
    ".hero-text",
    ".hero-image",
    ".project-card",
    ".timeline-item .content",
    ".skill-box",
    ".achievement-box",
    ".cert-card",
    ".exp-image",
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(","));

  const obsOptions = { root: null, rootMargin: "0px", threshold: 0.12 };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        const achSection = document.getElementById("achievements");
        if (
          achSection &&
          (entry.target.closest("#achievements") ||
            entry.target.id === "achievements")
        ) {
          if (
            typeof animateCounters === "function" &&
            !window.__countersStarted
          ) {
            animateCounters();
            window.__countersStarted = true;
          }
        }
        obs.unobserve(entry.target);
      }
    });
  }, obsOptions);

  revealEls.forEach((el) => {
    if (el) revealObserver.observe(el);
  });
  const achievements = document.getElementById("achievements");
  if (achievements) {
    revealObserver.observe(achievements);
  }
})();

const typedRoles = ["Full Stack Developer", "IoT Enthusiast", "AI Explorer"];
let roleIndex = 0;
let charIndex = 0;
const typedElement = document.querySelector(".typed-role");

function typeRole() {
  if (!typedElement) return;
  typedElement.textContent = typedRoles[roleIndex].slice(0, charIndex);
  charIndex++;
  if (charIndex > typedRoles[roleIndex].length) {
    setTimeout(() => {
      charIndex = 0;
      roleIndex = (roleIndex + 1) % typedRoles.length;
      typeRole();
    }, 1500);
  } else {
    setTimeout(typeRole, 150);
  }
}
typeRole();

const certCards = document.querySelectorAll(".cert-card");
const certModal = document.getElementById("certModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalClose = certModal.querySelector(".close");

certCards.forEach((card) => {
  card.addEventListener("click", () => {
    const imgSrc = card.querySelector("img").src;
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-description");

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    certModal.style.display = "block";
  });
});

modalClose.addEventListener("click", () => {
  certModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === certModal) {
    certModal.style.display = "none";
  }
});

const onlineCertsData = [
  {
    src: "images/Certificates/2 (1).jpg",
    title: "Certificate 1",
    desc: "Description of certificate 1",
  },
  {
    src: "images/Certificates/2 (2).jpg",
    title: "Certificate 2",
    desc: "Description of certificate 2",
  },
  {
    src: "images/Certificates/2 (3).jpg",
    title: "Certificate 3",
    desc: "Description of certificate 3",
  },
  {
    src: "images/Certificates/2 (4).jpg",
    title: "Certificate 4",
    desc: "Description of certificate 4",
  },
  {
    src: "images/Certificates/2 (5).jpg",
    title: "Certificate 5",
    desc: "Description of certificate 5",
  },
  {
    src: "images/Certificates/2 (6).jpg",
    title: "Certificate 6",
    desc: "Description of certificate 6",
  },
  {
    src: "images/Certificates/2 (7).jpg",
    title: "Certificate 7",
    desc: "Description of certificate 7",
  },
  {
    src: "images/Certificates/2 (8).jpg",
    title: "Certificate 8",
    desc: "Description of certificate 8",
  },
];

const openOnlineCerts = document.getElementById("openOnlineCerts");
const onlineContainer = document.getElementById("online-certs-container");

openOnlineCerts.addEventListener("click", () => {
  onlineContainer.innerHTML = "";
  onlineCertsData.forEach((cert) => {
    const certDiv = document.createElement("div");
    certDiv.classList.add("online-cert-item");
    certDiv.innerHTML = `
      <img src="${cert.src}" alt="${cert.title}" data-title="${cert.title}" data-desc="${cert.desc}" />
    `;
    onlineContainer.appendChild(certDiv);
  });
  certModal.style.display = "block";

  document.querySelectorAll(".online-cert-item img").forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalTitle.textContent = img.dataset.title;
      modalDesc.textContent = img.dataset.desc;
    });
  });
});

const academicModal = document.getElementById("academicModal");
const academicModalTitle = document.getElementById("academic-modal-title");
const academicModalPDF = document.getElementById("academic-modal-pdf");
const academicModalClose = academicModal.querySelector(".close");

document.querySelectorAll(".project-links .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentCard = btn.closest(".project-card");
    const title = parentCard.getAttribute("data-title");

    if (btn.classList.contains("academic-pdf")) {
      const pdfFile = parentCard.getAttribute("data-report");
      academicModalTitle.textContent = `${title} - PDF Report`;
      academicModalPDF.src = pdfFile;
      academicModal.style.display = "block";
    }

    if (btn.classList.contains("academic-paper")) {
      const paperLink = parentCard.getAttribute("data-paper");
      window.open(paperLink, "_blank");
    }
  });
});

academicModalClose.addEventListener("click", () => {
  academicModal.style.display = "none";
  academicModalPDF.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === academicModal) {
    academicModal.style.display = "none";
    academicModalPDF.src = "";
  }
});

document.querySelectorAll('.resume-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const fileUrl = this.getAttribute('href');
      const fileName = this.getAttribute('download') || 'resume.pdf';
      const a = document.createElement('a');
      a.href = fileUrl;
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  formStatus.textContent = "Sending...";
  formStatus.style.color = "black";
  formStatus.style.display = "block";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      formStatus.textContent = "✅ Message sent successfully!";
      formStatus.style.color = "green";
      contactForm.reset();
    } else {
      formStatus.textContent = "❌ Failed to send: " + (result.message || "Unknown error");
      formStatus.style.color = "red";
    }
  } catch (error) {
    formStatus.textContent = "❌ Network or API error.";
    formStatus.style.color = "red";
    console.error(error);
  }
});

const resumeBtn = document.querySelector('.resume-btn');

resumeBtn.addEventListener('click', function(e) {
  e.preventDefault(); 
  const link = document.createElement('a');
  link.href = this.href;
  link.download = 'Venkatesh_Kumar_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});




