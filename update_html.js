const fs = require('fs');
const path = require('path');

const files = [
    'dashboard-home.html',
    'learning.html',
    'applications.html',
    'jobs.html',
    'resume-builder.html',
    'aptitude.html',
    'profile.html',
    'support.html'
];

files.forEach(file => {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    
    // Replace Sidebar
    const sidebarRegex = /<aside class="sidebar" id="sidebar">[\s\S]*?<\/aside>/;
    const sidebarHTML = `<aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <a href="index.html" class="logo">
          <i class='bx bxs-graduation'></i>
          Career<span>Bridge</span>
        </a>
      </div>
      
      <div class="sidebar-menu">
        <ul>
          <li><a href="dashboard-home.html" ${file === 'dashboard-home.html' ? 'class="active"' : ''}><i class='bx bxs-dashboard'></i> Dashboard Home</a></li>
          <li><a href="learning.html" ${file === 'learning.html' ? 'class="active"' : ''}><i class='bx bxs-book-open'></i> Learning Platform</a></li>
          <li><a href="applications.html" ${file === 'applications.html' ? 'class="active"' : ''}><i class='bx bxs-file-find'></i> My Applications</a></li>
          <li><a href="jobs.html" ${file === 'jobs.html' ? 'class="active"' : ''}><i class='bx bxs-briefcase'></i> Companies & Jobs</a></li>
          <li><a href="resume-builder.html" ${file === 'resume-builder.html' ? 'class="active"' : ''}><i class='bx bxs-file-doc'></i> Resume Builder</a></li>
          <li><a href="aptitude.html" ${file === 'aptitude.html' ? 'class="active"' : ''}><i class='bx bx-brain'></i> Aptitude Test</a></li>
          <li><a href="profile.html" ${file === 'profile.html' ? 'class="active"' : ''}><i class='bx bxs-user-detail'></i> Profile</a></li>
          <li><a href="support.html" ${file === 'support.html' ? 'class="active"' : ''}><i class='bx bx-support'></i> Support & Queries</a></li>
        </ul>
      </div>
      
      <div class="sidebar-footer">
        <a href="index.html" class="btn btn-outline w-100" style="padding: 0.5rem; font-size: 0.9rem;">
          <i class='bx bx-log-out'></i> Logout
        </a>
      </div>
    </aside>`;
    
    content = content.replace(sidebarRegex, sidebarHTML);
    
    // Replace Header Actions
    const headerActionsRegex = /<div class="header-actions">[\s\S]*?<\/header>/;
    const headerActionsHTML = `<div class="header-actions">
          <div class="notification-icon">
            <i class='bx bxs-bell'></i>
            <span class="badge-dot"></span>
          </div>
          <div class="user-profile dropdown-container">
            <span style="font-weight: 500;" id="userNameDisplay">Student User</span>
            <img id="userAvatar" src="https://ui-avatars.com/api/?name=Student+User&background=6366F1&color=fff" alt="User Profile">
            <div class="dropdown-menu-custom">
                <a href="profile.html"><i class='bx bx-user'></i> My Profile</a>
                <a href="support.html"><i class='bx bx-help-circle'></i> Help & Support</a>
                <div class="dropdown-divider"></div>
                <a href="index.html" class="text-danger"><i class='bx bx-log-out'></i> Logout</a>
            </div>
          </div>
        </div>
      </header>`;
      
    content = content.replace(headerActionsRegex, headerActionsHTML);
    
    // Remove leftover empty sections from older monolithic design
    content = content.replace(/<!-- Section: My Profile -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    content = content.replace(/<!-- Section: Companies \/ Jobs -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    content = content.replace(/<!-- Section: My Applications -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    content = content.replace(/<!-- Section: Resume Builder -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    content = content.replace(/<!-- Section: Aptitude Test & Query Box -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    content = content.replace(/<!-- Section: Learning Platform & LinkedIn -->[\s\S]*?<\/div>\s*<\/main>/, '</div>\n    </main>');
    
    // Make sure main-content gets the transition class
    content = content.replace(/<main class="main-content">/, '<main class="main-content page-transition">');

    fs.writeFileSync(path.join(__dirname, file), content);
});
console.log("HTML files updated successfully.");
