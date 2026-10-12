document.addEventListener('DOMContentLoaded', () => {

  /* VARIABEL GLOBAL */
  const projectGrid = document.getElementById('projectGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  
  let allProjects = []; 


  /* 1. AJAX DATA FETCHING — Ambil data dari projects.json */
  const loadProjects = async () => {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Gagal memuat data proyek');
      
      allProjects = await response.json();
      renderProjects(allProjects);
      
    } catch (error) {
      console.error(error);
      projectGrid.innerHTML = `<p class="loading-text">Maaf, gagal memuat data proyek.</p>`;
    }
  };


  /*  2. RENDER KARTU PROYEK KE HTML (DOM Manipulation) */
  const renderProjects = (projects) => {
    projectGrid.innerHTML = ''; 
    if (projects.length === 0) {
      projectGrid.innerHTML = `<p class="loading-text">Tidak ada proyek di kategori ini.</p>`;
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);

      card.innerHTML = `
        <div class="project-img">
          <img src="${project.image}" alt="${project.title}" class="img-cover">
        </div>
        <div class="project-info">
          <span class="project-tag">${project.categoryLabel}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <button class="btn btn-text btn-detail" data-id="${project.id}">Lihat Detail</button>
        </div>
      `;

      projectGrid.appendChild(card);
    });
    attachDetailListeners();
  };


  /* 3. FILTER KARYA (DOM Manipulation) */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      if (filterValue === 'all') {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.category === filterValue);
        renderProjects(filtered);
      }
    });
  });


  /* 4. POP-UP MODAL DETAIL PROYEK (Event Handling) */
  const attachDetailListeners = () => {
    const detailBtns = document.querySelectorAll('.btn-detail');

    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const data = allProjects.find(p => p.id === id);

        if (data) {
          document.getElementById('modalTitle').textContent = data.title;
          document.getElementById('modalDesc').textContent = data.longDescription;
          
          const modalImgContainer = document.getElementById('modalImg');
          modalImgContainer.innerHTML = `<img src="${data.image}" alt="${data.title}" class="img-cover">`;

          const techContainer = document.getElementById('modalTech');
          techContainer.innerHTML = '';
          data.tech.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techContainer.appendChild(span);
          });

          modal.style.display = 'grid';
          document.body.style.overflow = 'hidden'; 
        }
      });
    });
  };

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });


  /*  5. FORM VALIDATION (Peringatan Merah) */
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('nama');
      const email = document.getElementById('email');
      const pesan = document.getElementById('pesan');
      
      const errorNama = document.getElementById('errorNama');
      const errorEmail = document.getElementById('errorEmail');
      const errorPesan = document.getElementById('errorPesan');

      let isValid = true;

      [errorNama, errorEmail, errorPesan].forEach(el => el.classList.remove('is-visible'));

      // Validasi Nama
      if (nama.value.trim() === '') {
        errorNama.textContent = 'Nama lengkap wajib diisi.';
        errorNama.classList.add('is-visible');
        isValid = false;
      }

      // Validasi Email
      if (email.value.trim() === '') {
        errorEmail.textContent = 'Email wajib diisi.';
        errorEmail.classList.add('is-visible');
        isValid = false;
      } else if (!email.value.includes('@') || !email.value.includes('.')) {
        errorEmail.textContent = 'Format email tidak valid (contoh: nama@email.com).';
        errorEmail.classList.add('is-visible');
        isValid = false;
      }

      // Validasi Pesan
      if (pesan.value.trim() === '') {
        errorPesan.textContent = 'Pesan tidak boleh kosong.';
        errorPesan.classList.add('is-visible');
        isValid = false;
      }

      // Jika semua valid
      if (isValid) {
        alert('Terima kasih! Pesan Anda berhasil dikirim.');
        contactForm.reset();
      }
    });
  }


  /* JALANKAN */
  loadProjects();

});