// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeStr = now.toLocaleString('zh-CN', options);
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeStr;
    }
}

// 初始化时间显示
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// 角色切换功能
const roleSelector = document.getElementById('roleSelector');
if (roleSelector) {
    roleSelector.addEventListener('change', function () {
        const selectedRole = this.value;
        updateRoleUI(selectedRole);
    });
}

function updateRoleUI(role) {
    const roleNames = {
        admin: '管理员',
        supervisor: '安全主管',
        operator: '作业人员'
    };

    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = roleNames[role] || '管理员';
    }
}

// 初始化角色UI
updateRoleUI('admin');

// 滚动预警栏 - 复制内容实现无缝滚动
function initScrollingAlert() {
    const scrollingText = document.getElementById('scrollingAlert');
    if (scrollingText) {
        const content = scrollingText.innerHTML;
        scrollingText.innerHTML = content + content;
    }
}

initScrollingAlert();

// 数据详情弹窗
function showDataDetail(type) {
    const modal = document.getElementById('dataModal');
    const title = document.getElementById('dataModalTitle');
    const body = document.getElementById('dataModalBody');

    const dataDetails = {
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

    const detail = dataDetails[type];
    if (detail && modal && title && body) {
        title.textContent = detail.title;
        body.innerHTML = detail.content;
        modal.style.display = 'flex';
    }
}

function closeDataModal() {
    const modal = document.getElementById('dataModal');
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
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabGroup = this.parentElement;
            tabGroup.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('data-tab');
            if (targetId) {
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                const targetContent = document.getElementById(targetId);
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
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

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
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    if (sidebar) sidebar.style.display = 'none';
    if (mainContent) mainContent.style.marginLeft = '0';
}
