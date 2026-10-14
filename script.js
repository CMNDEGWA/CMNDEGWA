const focusNotes = [
    "Good work starts with understanding the problem.",
    "Build with clarity, from first sketch to reliable system.",
    "Make useful things, then make them feel considered."
];

const noteRotator = document.querySelector("[data-note-rotator]");

if (noteRotator) {
    const noteCopy = noteRotator.querySelector("[data-note-copy]");
    const noteIndex = noteRotator.querySelector("[data-note-index]");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeNote = 0;
    let rotationTimer;

    function scheduleNextNote() {
        window.clearTimeout(rotationTimer);
        if (!document.hidden) {
            rotationTimer = window.setTimeout(showNextNote, 4000);
        }
    }

    function showNextNote() {
        const nextNote = (activeNote + 1) % focusNotes.length;
        const transitionDuration = motionPreference.matches ? 0 : 420;
        noteCopy.classList.add("is-exiting");

        window.setTimeout(() => {
            activeNote = nextNote;
            noteCopy.textContent = focusNotes[activeNote];
            noteIndex.textContent = `${String(activeNote + 1).padStart(2, "0")} / ${String(focusNotes.length).padStart(2, "0")}`;
            noteCopy.classList.remove("is-exiting");
            noteCopy.classList.add("is-entering");
            noteCopy.getBoundingClientRect();
            window.requestAnimationFrame(() => noteCopy.classList.remove("is-entering"));
            scheduleNextNote();
        }, transitionDuration);
    }

    document.addEventListener("visibilitychange", scheduleNextNote);
    scheduleNextNote();
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("has-scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    revealItems.forEach(item => revealObserver.observe(item));
}
