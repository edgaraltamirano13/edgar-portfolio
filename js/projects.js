// ---- Project Data ----
const projectsData = {
  'jam-jar': {
    title: 'Jam Jar: Preserving Musical Moments',
    category: 'Motion',
    description: 'Inspiration is fleeting. Jam Jar was born from a simple need: a digital space where musicians can capture raw ideas without the technical hurdles of complex recording software. Designed for the "instant session," this platform focuses on speed and intuition, ensuring that the next great melody is never lost to a cluttered interface.',
    videoSrc: 'videos/JAMJAR_EDGAR-SALAZAR_CHANG-TING_QUIJADA-DENISSE_KIM-DURI_UTTAM-Gajulabalaja.mp4',
    videoFit: 'cover'
  },
  'kinetic-typography': {
    title: 'Kinetic Typography',
    category: 'Motion',
    description: 'Created for the Interactive Media Management (IMM) program at Sheridan College, this project transforms static text into a dynamic visual narrative synced to audio.\n\nTechnical Highlights\n\nAudio Synchronization: Mastered keyframe coordination in After Effects to align motion perfectly with frequency and beat, creating a seamless connection between sound and type.\n\n3D Spatial Design: Integrated a 3D Camera to create depth and parallax. I utilized focal length manipulation to execute a cinematic "fly-through" for the word "Magic," making it the visual climax of the piece.\n\nMotion Dynamics: Focused on timing, easing, and spatial awareness to ensure the typography amplified the emotional tone of the soundtrack.',
    videoSrc: 'videos/Assignment1-Kinetic Typography - EdgarSalazar_JennyKim.mp4',
    videoFit: 'cover'
  },
  'social-media-kinetic': {
    title: 'Social Media: Kinetic Content Strategy',
    category: 'Motion',
    description: 'The Concept\n\nFor this Content Strategy project, my team focused on humanizing digital engagement. We transformed our professor\'s signature classroom catchphrase into a dynamic Kinetic Typography piece, turning a familiar vocal cue into shareable "micro-content."\n\nTechnical Highlights\n\nAudio-Motion Sync: Aligned typography to the specific cadence and tone of a live voice recording for maximum impact.\n\nSocial-First Design: Optimized for fast-scrolling environments with high-contrast visuals and rapid transitions.\n\nStrategic Collaboration: Partnered with a strategy team to ensure the visual style complemented the campaign\'s engagement goals.',
    videoSrc: 'videos/SOCIALMEDIA.mp4',
    videoFit: 'contain'
  },
  'stoked-video': {
    title: 'Stoked: Creative Editorial & Sound Redesign',
    category: 'Video',
    description: 'The Project\nA comprehensive editorial overhaul for "Stoked," focusing on enhancing the visual energy through advanced cutting techniques and a complete soundscape reconstruction.\n\nTechnical Execution\nPrecision Editing: Performed in Adobe Premiere Pro, I redesigned the video\'s timing and cuts to create a more compelling flow, ensuring every transition hit with maximum impact.\n\nAudio Overhaul: Replaced the original soundtrack and executed a full SFX Redesign. I selected and layered sound effects to align perfectly with the on-screen action, creating a more immersive sensory experience.\n\nRhythmic Pacing: Focused on "cutting to the beat," synchronizing visual spikes with the new musical score to drive the narrative forward.',
    videoSrc: 'videos/Stoked-EdgarSalazar_JennyKim_DenisseQuijada.mp4',
    videoFit: 'cover'
  },
  'api-project': {
    title: 'API Project',
    category: 'Code',
    description: 'A colorful coding project developed during my Sheridan IMM learning path. It focuses on practical front-end structure, JavaScript logic, and clear visual communication.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    zipUrl: 'assets/proyects/API.zip',
    previewTone: 'api',
    statusText: 'Built while learning in Sheridan IMM. Local project - not published on GitHub yet.'
  },
  'digital-museum': {
    title: 'Digital Museum',
    category: 'Code',
    description: 'A digital museum concept designed to post and explore stories and artifacts that were historically prohibited. The project combines narrative intent with structured web presentation.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    zipUrl: 'assets/proyects/digital-museum-submit%20(2).zip',
    previewTone: 'museum',
    statusText: 'Built while learning in Sheridan IMM. Local project - not published on GitHub yet.'
  },
  'mobile-app': {
    title: 'Mobile Application Development',
    category: 'Code',
    description: 'A mobile-focused app project built as part of coursework, emphasizing interface clarity, touch-first behavior, and mobile usability.',
    tech: ['Mobile UI', 'UX', 'App Workflow'],
    previewTone: 'mobile',
    statusText: 'Built while learning in Sheridan IMM. Large source package available on request.'
  },
  'wet-canada': {
    title: 'WET Canada Example',
    category: 'Code',
    description: 'A hands-on example of how to use WET in a real page context. My version presents a Canada-focused web page prototype using WET conventions and components.',
    tech: ['WET', 'HTML', 'CSS'],
    previewTone: 'wet',
    statusText: 'Built while learning in Sheridan IMM. Large source package available on request.'
  },
  'framework-project': {
    title: 'Framework Project',
    category: 'Code',
    description: 'Framework-focused web assignment developed during Sheridan IMM to practice structure, consistency, and reusable interface blocks.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    zipUrl: 'assets/proyects/FRAMEWORK.zip',
    previewTone: 'framework',
    statusText: 'Built while learning in Sheridan IMM. Local project - not published on GitHub yet.'
  }
};

function createGeneratedPreview(title, tech, tone) {
  const toneClass = tone ? `project-faux-preview--${tone}` : 'project-faux-preview--api';
  const safeTech = Array.isArray(tech) ? tech.slice(0, 3) : [];
  const tags = safeTech.map(item => `<span class="project-faux-preview__tag">${item}</span>`).join('');

  return `
    <div class="project-faux-preview ${toneClass}">
      <div class="project-faux-preview__grid"></div>
      <div class="project-faux-preview__panel">
        <p class="project-faux-preview__kicker">CODE PREVIEW</p>
        <h3 class="project-faux-preview__title">${title}</h3>
        <div class="project-faux-preview__tags">${tags}</div>
      </div>
    </div>
  `;
}

// ---- Category Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.getElementById('projects-grid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.borderColor = '';
      b.style.color = '';
    });
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    if (filter === 'all') {
      if (projectsGrid) {
        projectsGrid.style.gridTemplateColumns = '';
      }

      // In "All", show up to 3 cards per column and preserve the original order.
      document.querySelectorAll('.column-wrapper').forEach(col => {
        const cardsInColumn = col.querySelectorAll('.project-card');
        cardsInColumn.forEach((card, index) => {
          if (index < 3) {
            card.style.display = 'flex';
            card.style.animation = 'revealUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    } else {
      if (projectsGrid) {
        projectsGrid.style.gridTemplateColumns = 'minmax(0, 1fr)';
      }

      // In category filters, show all cards from the selected category.
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'revealUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Column visibility behavior:
    // - "All": show all columns.
    // - Specific category: show only the column that contains that category.
    document.querySelectorAll('.column-wrapper').forEach(col => {
      const cardsInColumn = Array.from(col.querySelectorAll('.project-card'));
      const hasCategory = cardsInColumn.some(card => card.dataset.category === filter);

      if (filter === 'all') {
        col.style.display = '';
        col.style.opacity = '1';
        col.style.pointerEvents = '';
      } else if (hasCategory) {
        col.style.display = '';
        col.style.opacity = '1';
        col.style.pointerEvents = '';
      } else {
        col.style.display = 'none';
      }
    });
  });
});

// ---- Project Modal ----
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    // Get card data
    const projectId = card.dataset.projectId;
    const title = card.querySelector('h3').textContent;
    const category = card.querySelector('span').textContent;
    const videoEl = card.querySelector('video');
    const imgEl = card.querySelector('img');
    const videoSrc = videoEl ? videoEl.src : '';
    const imgSrc = imgEl ? imgEl.src : '';

    // Check if we have custom project data
    const customData = projectId ? projectsData[projectId] : null;

    // Use custom data or fallback to card data
    const finalTitle = customData ? customData.title : title;
    const finalCategory = customData && customData.category ? customData.category : category;
    const finalDescription = customData ? customData.description : 'Add your full project description here — tools used, process, outcome, and impact. This is where you tell the story behind the work.';
    const finalVideoSrc = customData ? customData.videoSrc : videoSrc;
    const finalVideoFit = customData && customData.videoFit ? customData.videoFit : 'cover';
    const finalTech = customData && customData.tech ? customData.tech : [];
    const finalGithubUrl = customData && customData.githubUrl ? customData.githubUrl : '';
    const finalLiveUrl = customData && customData.liveUrl ? customData.liveUrl : '';
    const finalZipUrl = customData && customData.zipUrl ? customData.zipUrl : '';
    const finalPreviewTone = customData && customData.previewTone ? customData.previewTone : 'api';
    const finalStatusText = customData && customData.statusText ? customData.statusText : '';
    const finalImgSrc = imgSrc;
    const hasPreview = finalVideoSrc || finalImgSrc;

    const techMarkup = finalTech.length
      ? `<div class="flex flex-wrap gap-2 mt-5">${finalTech.map(tech => `<span class="px-3 py-1 rounded-full border border-white/20 text-xs tracking-wide text-gray-300">${tech}</span>`).join('')}</div>`
      : '';

    const externalLinksMarkup = [
      finalGithubUrl ? `<a href="${finalGithubUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-2 border border-white/25 text-white text-sm tracking-widest uppercase font-medium rounded-full hover:border-brand hover:text-brand transition-all">View Code</a>` : '',
      finalLiveUrl ? `<a href="${finalLiveUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-2 bg-brand text-white text-sm tracking-widest uppercase font-medium rounded-full hover:bg-white hover:text-dark transition-all">Live Demo</a>` : '',
      finalZipUrl ? `<a href="${finalZipUrl}" download class="px-6 py-2 border border-white/25 text-white text-sm tracking-widest uppercase font-medium rounded-full hover:border-brand hover:text-brand transition-all">Download ZIP</a>` : ''
    ].filter(Boolean).join('');

    const statusMarkup = finalStatusText
      ? `<p class="text-xs text-gray-500 mt-4 tracking-wide uppercase">${finalStatusText}</p>`
      : '';

    const generatedPreviewMarkup = !hasPreview
      ? createGeneratedPreview(finalTitle, finalTech, finalPreviewTone)
      : '';

    modalContent.innerHTML = `
      <div class="aspect-video rounded-xl overflow-hidden bg-black mb-6 relative">
        ${finalVideoSrc ? `<video src="${finalVideoSrc}" class="w-full h-full" style="object-fit:${finalVideoFit};" muted playsinline controls></video>` : (finalImgSrc ? `<img src="${finalImgSrc}" alt="${finalTitle}" class="w-full h-full object-cover" onerror="this.style.display='none'"/>` : '')}
        ${generatedPreviewMarkup ? `<div class="absolute inset-0">${generatedPreviewMarkup}</div>` : ''}
      </div>
      <p class="text-brand text-xs tracking-widest uppercase font-medium mb-2">${finalCategory}</p>
      <h2 class="font-display text-3xl tracking-wider text-white mb-4">${finalTitle}</h2>
      <p class="text-gray-400 leading-relaxed whitespace-pre-line">
        ${finalDescription}
      </p>
      ${techMarkup}
      ${statusMarkup}
      <div class="flex gap-3 mt-6 flex-wrap">
        ${externalLinksMarkup}
        <button type="button" id="share-project-btn" class="px-6 py-2 bg-brand text-white text-sm tracking-widest uppercase font-medium rounded-full hover:bg-white hover:text-dark transition-all">Share</button>
      </div>
    `;

    const shareButton = document.getElementById('share-project-btn');
    if (shareButton) {
      shareButton.addEventListener('click', async () => {
        const sharePayload = {
          title: finalTitle,
          text: finalDescription,
          url: window.location.href,
        };

        if (navigator.share) {
          try {
            await navigator.share(sharePayload);
            return;
          } catch (error) {
            if (error && error.name === 'AbortError') {
              return;
            }
          }
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(window.location.href);
            shareButton.textContent = 'Copied';
            setTimeout(() => {
              shareButton.textContent = 'Share';
            }, 1300);
            return;
          } catch (error) {
            // Fallback below if clipboard fails.
          }
        }

        window.prompt('Copy this link:', window.location.href);
      });
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.add('opacity-0', 'pointer-events-none');
  document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }
});

// Close with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }
});
