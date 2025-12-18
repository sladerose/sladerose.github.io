document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GITHUB PROJECTS ---
    const projectList = document.getElementById('project-list');

    async function fetchProjects() {
        try {
            const res = await fetch('https://api.github.com/users/sladerose/repos?sort=updated');
            const data = await res.json();

            if (!Array.isArray(data)) {
                projectList.innerHTML = '<li>Error loading projects.</li>';
                return;
            }

            // Filter forks if you want, or just show top 6
            const topProjects = data.slice(0, 6);

            if (topProjects.length === 0) {
                projectList.innerHTML = '<li>No projects found.</li>';
                return;
            }

            projectList.innerHTML = ''; // Clear loading text

            topProjects.forEach(repo => {
                const li = document.createElement('li');

                // Arrow
                const arrow = document.createElement('span');
                arrow.classList.add('link-arrow');
                arrow.textContent = '/>';

                // Content Wrapper
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('project-content');

                // Link (Name)
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = repo.name; // Preserve case (e.g. FusionAnalyzer)
                // link.classList.add('project-title');

                // Description
                const desc = document.createElement('span');
                desc.classList.add('project-desc');
                desc.textContent = repo.description ? ` — ${repo.description}` : '';

                contentDiv.appendChild(link);
                contentDiv.appendChild(desc);

                li.appendChild(arrow);
                li.appendChild(contentDiv);
                projectList.appendChild(li);

                attachHoverEffect(li, arrow);
            });

        } catch (e) {
            console.error(e);
            if (projectList) projectList.innerHTML = '<li>Error connecting to GitHub.</li>';
        }
    }

    fetchProjects();


    // --- 2. THE "SLASH" COLOR EFFECT ---
    // Why? rohandharane.com has this cool effect where the symbols cycle colors on hover.

    const colors = [
        '#FF0000', // Red
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#00FFFF', // Cyan
        '#FF00FF', // Magenta
        '#FF5733', // Orange
        '#33FF57'  // Lime
    ];

    function attachHoverEffect(container, targetElement) {
        let interval;

        container.addEventListener('mouseenter', () => {
            // Cycle colors rapidly
            interval = setInterval(() => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                targetElement.style.color = randomColor;
            }, 100); // Change every 100ms
        });

        container.addEventListener('mouseleave', () => {
            clearInterval(interval);
            targetElement.style.color = 'inherit'; // Reset to white
        });
    }

    // Attach to existing static links in /connect
    document.querySelectorAll('#connect li').forEach(li => {
        const arrow = li.querySelector('.link-arrow');
        if (arrow) attachHoverEffect(li, arrow);
    });

    // Attach to main title logic?
    const titleHeader = document.querySelector('header');
    const titleSlash = document.querySelector('h1 .accent');
    if (titleHeader && titleSlash) {
        attachHoverEffect(titleHeader, titleSlash);
    }

});
