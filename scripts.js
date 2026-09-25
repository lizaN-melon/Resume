const skills = [
  { name: 'HTML',         category: 'frontend' },
  { name: 'CSS',          category: 'frontend' },
  { name: 'JavaScript',   category: 'frontend' },
  { name: 'phpMyAdmin',   category: 'backend'  },
  { name: 'Git',          category: 'tools'    },
  { name: 'VS Code',      category: 'tools'    },
  { name: 'Gimp',         category: 'design'   },
  { name: 'Inkscape',     category: 'design'   },
  { name: 'Photoshop',    category: 'design'   },
  { name: 'Illustrator',  category: 'design'   },
  { name: 'Ibis Paint X', category: 'design'   },
];

let currentCategory = 'all';
let currentSearch = '';

const list = document.getElementById('skills-list');
const empty = document.getElementById('skills-empty');
const search = document.getElementById('skills-search');
const filters = document.getElementById('skills-filters');


function renderSkills() {
  let filtered = skills.filter(skill => {
    return currentCategory === 'all' || skill.category === currentCategory;
  });

  const query = currentSearch.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(skill =>
      skill.name.toLowerCase().includes(query)
    );
  }

  list.innerHTML = ''; /*очищаем список*/

  if (filtered.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  filtered.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill.name;
    list.appendChild(li);
  });
}

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  currentCategory = btn.dataset.category;

  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('is-active', b === btn);
  });

  renderSkills();
});

search.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderSkills();
});

/*смена темы*/
const themeBtn = document.getElementById('theme-btn');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☼' : '☽';

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '☼' : '☽';
});

renderSkills();