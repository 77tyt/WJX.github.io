// 角色权限配置
// 页面权限分配：
// - 作业负责人：首页、作业前管理、实时监测、应急处置
// - 审批人员：首页、作业前管理、台账管理、复盘优化
// - 监护人员：首页、实时监测、应急处置、培训考核
// - 管理人员：首页、台账管理、培训考核、承包商管理、安全生产考评、复盘优化
// - 创始人：全部页面
var rolePermissions = {
    operator: {
        name: '作业负责人',
        pages: ['dashboard', 'pre-work', 'monitoring', 'emergency']
    },
    approver: {
        name: '审批人员',
        pages: ['dashboard', 'pre-work', 'ledger', 'review']
    },
    guardian: {
        name: '监护人员',
        pages: ['dashboard', 'monitoring', 'emergency', 'training']
    },
    manager: {
        name: '管理人员',
        pages: ['dashboard', 'ledger', 'training', 'contractor', 'evaluation', 'review']
    },
    founder: {
        name: '创始人',
        pages: ['dashboard', 'pre-work', 'monitoring', 'review', 'ledger', 'training', 'contractor', 'evaluation', 'emergency']
    }
};

// 核心功能区权限配置
var functionCardPermissions = {
    'risk': ['operator', 'approver', 'founder'],
    'approval': ['operator', 'approver', 'founder'],
    'monitoring': ['operator', 'guardian', 'founder'],
    'emergency': ['operator', 'guardian', 'founder'],
    'ledger': ['approver', 'manager', 'founder'],
    'training': ['guardian', 'manager', 'founder'],
    'contractor': ['manager', 'founder'],
    'evaluation': ['manager', 'founder'],
    'review': ['approver', 'manager', 'founder']
};

// 页面文件名与权限key映射
var pageKeyMap = {
    'index.html': 'dashboard',
    'pre-work.html': 'pre-work',
    'monitoring.html': 'monitoring',
    'emergency.html': 'emergency',
    'ledger.html': 'ledger',
    'training.html': 'training',
    'contractor.html': 'contractor',
    'evaluation.html': 'evaluation',
    'review.html': 'review'
};

// 检查当前用户是否有权限访问某页面
function checkPagePermission() {
    var currentRole = getRoleFromStorage();
    var currentPage = getCurrentPageKey();
    
    if (!currentPage) return true;
    
    var roleInfo = rolePermissions[currentRole];
    if (!roleInfo) {
        roleInfo = rolePermissions['operator'];
    }
    
    var allowedPages = roleInfo.pages;
    
    if (allowedPages.indexOf(currentPage) === -1) {
        showNoPermissionMessage(currentRole);
        return false;
    }
    
    updateSidebarForSubPage(currentRole);
    return true;
}

// 获取当前页面权限key
function getCurrentPageKey() {
    var pathname = window.location.pathname;
    var filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return pageKeyMap[filename] || 'dashboard';
}

// 显示无权限提示
function showNoPermissionMessage(role) {
    var roleInfo = rolePermissions[role] || rolePermissions['operator'];
    var body = document.body;
    
    body.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f0f2f5; font-family: Microsoft YaHei, Arial, sans-serif;">' +
        '<div style="background-color: white; border-radius: 12px; padding: 40px 60px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2" style="width: 80px; height: 80px; margin-bottom: 20px;">' +
        '<circle cx="12" cy="12" r="10"/>' +
        '<line x1="15" y1="9" x2="9" y2="15"/>' +
        '<line x1="9" y1="9" x2="15" y2="15"/>' +
        '</svg>' +
        '<h2 style="color: #e53e3e; font-size: 24px; margin-bottom: 16px;">无访问权限</h2>' +
        '<p style="color: #718096; font-size: 14px; margin-bottom: 8px;">当前角色：<strong style="color: #1a365d;">' + roleInfo.name + '</strong></p>' +
        '<p style="color: #718096; font-size: 14px; margin-bottom: 24px;">您没有权限访问此页面，请联系管理员或切换角色</p>' +
        '<a href="../index.html" style="display: inline-block; padding: 12px 32px; background-color: #1a365d; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; transition: background-color 0.3s;">返回首页</a>' +
        '</div></div>';
}

// 更新子页面侧边栏可见性
function updateSidebarForSubPage(role) {
    var allowedPages = rolePermissions[role].pages;
    var navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(function(item) {
        var page = item.getAttribute('data-page');
        if (page) {
            if (allowedPages.indexOf(page) !== -1) {
                item.classList.remove('nav-disabled');
                item.setAttribute('data-has-permission', 'true');
            } else {
                item.classList.add('nav-disabled');
                item.setAttribute('data-has-permission', 'false');
            }
        }
    });
    
    var userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = rolePermissions[role].name;
    }
    
    var roleSelectorElement = document.getElementById('roleSelector');
    if (roleSelectorElement) {
        roleSelectorElement.value = role;
    }
}

// 更新当前时间
function updateCurrentTime() {
    var now = new Date();
    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    var timeStr = now.toLocaleString('zh-CN', options);
    var timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeStr;
    }
}

// 初始化时间显示
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// 角色切换功能
var roleSelector = document.getElementById('roleSelector');
if (roleSelector) {
    roleSelector.addEventListener('change', function () {
        var selectedRole = this.value;
        updateRoleUI(selectedRole);
        saveRoleToStorage(selectedRole);
    });
}

// 保存角色到本地存储
function saveRoleToStorage(role) {
    localStorage.setItem('currentRole', role);
}

// 从本地存储获取角色
function getRoleFromStorage() {
    return localStorage.getItem('currentRole') || 'operator';
}

// 更新角色UI
function updateRoleUI(role) {
    var roleInfo = rolePermissions[role];
    if (!roleInfo) {
        role = 'operator';
        roleInfo = rolePermissions[role];
    }

    var userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = roleInfo.name;
    }

    updateNavVisibility(role);
    updateFunctionCardsVisibility(role);
    updateMobileNavVisibility(role);
}

// 更新左侧导航栏可见性
function updateNavVisibility(role) {
    var allowedPages = rolePermissions[role].pages;
    var navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(function(item) {
        var page = item.getAttribute('data-page');
        if (page) {
            if (allowedPages.indexOf(page) !== -1) {
                item.classList.remove('nav-disabled');
                item.setAttribute('data-has-permission', 'true');
            } else {
                item.classList.add('nav-disabled');
                item.setAttribute('data-has-permission', 'false');
            }
        }
    });
}

// 更新核心功能区卡片可见性
function updateFunctionCardsVisibility(role) {
    var functionCards = document.querySelectorAll('.function-card');
    
    functionCards.forEach(function(card) {
        var href = card.getAttribute('href');
        var pageKey = '';
        
        if (href) {
            if (href.indexOf('risk') !== -1) pageKey = 'risk';
            else if (href.indexOf('approval') !== -1) pageKey = 'approval';
            else if (href.indexOf('monitoring') !== -1) pageKey = 'monitoring';
            else if (href.indexOf('emergency') !== -1) pageKey = 'emergency';
            else if (href.indexOf('ledger') !== -1) pageKey = 'ledger';
            else if (href.indexOf('training') !== -1) pageKey = 'training';
            else if (href.indexOf('contractor') !== -1) pageKey = 'contractor';
            else if (href.indexOf('evaluation') !== -1) pageKey = 'evaluation';
            else if (href.indexOf('review') !== -1) pageKey = 'review';
        }
        
        if (pageKey && functionCardPermissions[pageKey]) {
            var allowedRoles = functionCardPermissions[pageKey];
            if (allowedRoles.indexOf(role) !== -1) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// 更新移动端导航栏可见性
function updateMobileNavVisibility(role) {
    var allowedPages = rolePermissions[role].pages;
    var mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    
    mobileNavLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        var page = '';
        
        if (href) {
            if (href.indexOf('index.html') !== -1 || href === '../index.html') page = 'dashboard';
            else if (href.indexOf('monitoring') !== -1) page = 'monitoring';
            else if (href.indexOf('emergency') !== -1) page = 'emergency';
            else if (href.indexOf('pre-work') !== -1) page = 'pre-work';
        }
        
        if (page) {
            if (allowedPages.indexOf(page) !== -1) {
                link.classList.remove('nav-link-disabled');
                link.setAttribute('data-has-permission', 'true');
            } else {
                link.classList.add('nav-link-disabled');
                link.setAttribute('data-has-permission', 'false');
            }
        }
    });
}

// 初始化角色UI（从本地存储读取）
var savedRole = getRoleFromStorage();
var roleSelectorElement = document.getElementById('roleSelector');
if (roleSelectorElement) {
    roleSelectorElement.value = savedRole;
}
updateRoleUI(savedRole);

// 滚动预警栏 - 复制内容实现无缝滚动
function initScrollingAlert() {
    var scrollingText = document.getElementById('scrollingAlert');
    if (scrollingText) {
        var content = scrollingText.innerHTML;
        scrollingText.innerHTML = content + content;
    }
}

initScrollingAlert();

// 数据详情弹窗
function showDataDetail(type) {
    var modal = document.getElementById('dataModal');
    var title = document.getElementById('dataModalTitle');
    var body = document.getElementById('dataModalBody');

    var dataDetails = {
        'today-jobs': {
            title: '今日作业明细',
            content: `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>作业编号</th>
                            <th>作业名称</th>
                            <th>作业地点</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>JOB-001</td><td>储罐清理</td><td>储罐区A</td><td><span class="status-tag danger">紧急</span></td></tr>
                        <tr><td>JOB-002</td><td>管道检修</td><td>管道区B</td><td><span class="status-tag warning">关注</span></td></tr>
                        <tr><td>JOB-003</td><td>通风系统维护</td><td>通风机房</td><td><span class="status-tag success">正常</span></td></tr>
                        <tr><td>JOB-004</td><td>设备检测</td><td>设备区C</td><td><span class="status-tag success">正常</span></td></tr>
                        <tr><td>JOB-005</td><td>储罐检测</td><td>储罐区B</td><td><span class="status-tag info">待审批</span></td></tr>
                    </tbody>
                </table>
            `
        },
        'pending-approval': {
            title: '待审批作业明细',
            content: `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>作业编号</th>
                            <th>作业名称</th>
                            <th>申请人</th>
                            <th>申请时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>JOB-004</td><td>储罐检测</td><td>张三</td><td>09:30</td></tr>
                        <tr><td>JOB-005</td><td>管道清洁</td><td>李四</td><td>10:15</td></tr>
                        <tr><td>JOB-006</td><td>设备检修</td><td>王五</td><td>10:45</td></tr>
                        <tr><td>JOB-007</td><td>通风检测</td><td>赵六</td><td>11:00</td></tr>
                    </tbody>
                </table>
            `
        },
        'alert-count': {
            title: '今日预警记录',
            content: `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>预警类型</th>
                            <th>预警内容</th>
                            <th>时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><span class="status-tag danger">紧急</span></td><td>3号储罐氧浓度低</td><td>10:30</td><td>待处理</td></tr>
                        <tr><td><span class="status-tag danger">紧急</span></td><td>7号反应釜有毒气体接近阈值</td><td>10:15</td><td>待处理</td></tr>
                        <tr><td><span class="status-tag warning">一般</span></td><td>5号管道作业超时</td><td>09:45</td><td>已处理</td></tr>
                        <tr><td><span class="status-tag warning">一般</span></td><td>承包商资质即将到期</td><td>09:00</td><td>待处理</td></tr>
                    </tbody>
                </table>
            `
        },
        'contractor-expiry': {
            title: '承包商资质到期明细',
            content: `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>承包商名称</th>
                            <th>资质类型</th>
                            <th>到期日期</th>
                            <th>剩余天数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>承包商A</td><td>有限空间作业资质</td><td>2024-01-18</td><td><span class="status-tag danger">3天</span></td></tr>
                        <tr><td>承包商B</td><td>安全作业资质</td><td>2024-01-20</td><td><span class="status-tag warning">5天</span></td></tr>
                        <tr><td>承包商C</td><td>特种设备作业资质</td><td>2024-01-22</td><td><span class="status-tag warning">7天</span></td></tr>
                    </tbody>
                </table>
            `
        }
    };

    var detail = dataDetails[type];
    if (detail && modal && title && body) {
        title.textContent = detail.title;
        body.innerHTML = detail.content;
        modal.style.display = 'flex';
    }
}

function closeDataModal() {
    var modal = document.getElementById('dataModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// 标签页切换功能
function initTabs() {
    var tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function () {
            var tabGroup = this.parentElement;
            tabGroup.querySelectorAll('.tab-item').forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            var targetId = this.getAttribute('data-tab');
            if (targetId) {
                document.querySelectorAll('.tab-content').forEach(function(content) {
                    content.style.display = 'none';
                });
                var targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            }
        });
    });
}

initTabs();

// 响应式处理(窗口大小变化)
window.addEventListener('resize', function () {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');

    if (window.innerWidth <= 992) {
        if (sidebar) sidebar.style.display = 'none';
        if (mainContent) mainContent.style.marginLeft = '0';
    } else {
        if (sidebar) sidebar.style.display = 'block';
        if (mainContent) mainContent.style.marginLeft = '200px';
    }
});

// 初始化响应式
if (window.innerWidth <= 992) {
    var sidebar = document.querySelector('.sidebar');
    var mainContent = document.querySelector('.main-content');
    if (sidebar) sidebar.style.display = 'none';
    if (mainContent) mainContent.style.marginLeft = '0';
}
