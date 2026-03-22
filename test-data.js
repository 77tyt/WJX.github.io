var TestData = {
    users: [
        { id: 1, name: '张三', role: 'operator', roleName: '作业负责人', department: '生产部', phone: '13800138001', email: 'zhangsan@company.com', status: 'active' },
        { id: 2, name: '李四', role: 'approver', roleName: '审批人员', department: '安全部', phone: '13800138002', email: 'lisi@company.com', status: 'active' },
        { id: 3, name: '王五', role: 'guardian', roleName: '监护人员', department: '安全部', phone: '13800138003', email: 'wangwu@company.com', status: 'active' },
        { id: 4, name: '赵六', role: 'manager', roleName: '管理人员', department: '管理层', phone: '13800138004', email: 'zhaoliu@company.com', status: 'active' },
        { id: 5, name: '钱七', role: 'founder', roleName: '创始人', department: '管理层', phone: '13800138005', email: 'qianqi@company.com', status: 'active' }
    ],

    confinedSpaces: [
        { id: 1, name: '1号储罐', type: '储罐', location: '储罐区A', volume: 800, cycle: 30, lastCheck: '2024-01-15', nextCheck: '2024-02-14', status: '正常', responsible: '张三', risks: ['缺氧窒息', '有毒有害气体'], description: '直径8米，高度15米的立式储罐' },
        { id: 2, name: '2号储罐', type: '储罐', location: '储罐区A', volume: 500, cycle: 30, lastCheck: '2024-01-10', nextCheck: '2024-02-09', status: '正常', responsible: '张三', risks: ['缺氧窒息', '易燃易爆'], description: '直径6米，高度12米的立式储罐' },
        { id: 3, name: '3号储罐', type: '储罐', location: '储罐区A', volume: 500, cycle: 30, lastCheck: '2023-12-20', nextCheck: '2024-01-19', status: '即将到期', responsible: '李四', risks: ['缺氧窒息', '有毒有害气体'], description: '直径6米，高度12米的立式储罐' },
        { id: 4, name: '4号储罐', type: '储罐', location: '储罐区B', volume: 300, cycle: 30, lastCheck: '2024-01-05', nextCheck: '2024-02-04', status: '正常', responsible: '李四', risks: ['缺氧窒息'], description: '直径4米，高度10米的立式储罐' },
        { id: 5, name: '5号储罐', type: '储罐', location: '储罐区B', volume: 300, cycle: 30, lastCheck: '2023-12-25', nextCheck: '2024-01-24', status: '即将到期', responsible: '王五', risks: ['有毒有害气体', '易燃易爆'], description: '直径4米，高度10米的立式储罐' },
        { id: 6, name: '1号反应釜', type: '反应釜', location: '生产车间', volume: 50, cycle: 60, lastCheck: '2024-01-08', nextCheck: '2024-03-08', status: '正常', responsible: '张三', risks: ['有毒有害气体', '易燃易爆', '触电伤害'], description: '容积50立方米的高压反应釜' },
        { id: 7, name: '2号反应釜', type: '反应釜', location: '生产车间', volume: 50, cycle: 60, lastCheck: '2023-12-01', nextCheck: '2024-01-30', status: '已过期', responsible: '李四', risks: ['有毒有害气体', '易燃易爆', '触电伤害'], description: '容积50立方米的高压反应釜' },
        { id: 8, name: '地下污水池', type: '污水池', location: '污水处理区', volume: 200, cycle: 90, lastCheck: '2023-11-15', nextCheck: '2024-02-13', status: '正常', responsible: '王五', risks: ['缺氧窒息', '硫化氢中毒', '沼气爆炸'], description: '地下封闭式污水收集池' },
        { id: 9, name: '原料管道', type: '管道', location: '管道区', volume: 20, cycle: 180, lastCheck: '2023-10-20', nextCheck: '2024-04-17', status: '正常', responsible: '张三', risks: ['有毒有害气体', '易燃易爆'], description: '直径0.5米，长度100米的原料输送管道' },
        { id: 10, name: '成品管道', type: '管道', location: '管道区', volume: 15, cycle: 180, lastCheck: '2023-11-01', nextCheck: '2024-04-29', status: '正常', responsible: '李四', risks: ['易燃易爆'], description: '直径0.4米，长度120米的成品输送管道' }
    ],

    workRecords: [
        { id: 1, spaceId: 1, spaceName: '1号储罐', type: '清理作业', date: '2024-01-13', startTime: '09:00', endTime: '17:00', workers: '张三、李四、王五', manager: '张三', status: '已完成', risks: '缺氧窒息、有毒气体残留', measures: '1.作业前气体检测合格\n2.配备正压式空气呼吸器\n3.设置专职监护人\n4.作业时间不超过30分钟轮换', description: '对1号储罐内部进行清理作业，清除罐底沉积物约3吨' },
        { id: 2, spaceId: 3, spaceName: '3号储罐', type: '检修作业', date: '2024-01-14', startTime: '14:00', endTime: '18:00', workers: '张三、李四、王五、赵六', manager: '张三', status: '已完成', risks: '缺氧窒息、有毒气体残留、滑倒摔伤', measures: '1.作业前进行气体检测，氧含量19.5%-23.5%\n2.配备正压式空气呼吸器\n3.设置专职监护人\n4.罐内作业时间不超过30分钟轮换', description: '对3号储罐内部进行清理作业，清除罐底沉积物约2.5吨，检查罐体内部腐蚀情况' },
        { id: 3, spaceId: 6, spaceName: '1号反应釜', type: '检修作业', date: '2024-01-15', startTime: '08:00', endTime: '16:00', workers: '李四、王五', manager: '李四', status: '已完成', risks: '有毒有害气体、易燃易爆、触电伤害', measures: '1.切断电源并挂牌上锁\n2.气体检测合格后方可进入\n3.使用防爆工具\n4.配备便携式气体检测仪', description: '对1号反应釜进行年度检修，检查搅拌装置和密封系统' },
        { id: 4, spaceId: 8, spaceName: '地下污水池', type: '清理作业', date: '2024-01-16', startTime: '09:00', endTime: '15:00', workers: '王五、赵六', manager: '王五', status: '进行中', risks: '缺氧窒息、硫化氢中毒、沼气爆炸', measures: '1.强制通风30分钟以上\n2.气体检测合格后方可进入\n3.佩戴防毒面具和安全绳\n4.池外设置监护人员', description: '清理地下污水池淤泥，预计清理淤泥约10吨' },
        { id: 5, spaceId: 2, spaceName: '2号储罐', type: '检测作业', date: '2024-01-17', startTime: '10:00', endTime: '12:00', workers: '张三', manager: '张三', status: '待审批', risks: '缺氧窒息、易燃易爆', measures: '1.气体检测合格\n2.佩戴便携式气体检测仪\n3.设置监护人', description: '对2号储罐进行壁厚检测和焊缝探伤' }
    ],

    trainingRecords: [
        { id: 1, title: '有限空间作业安全培训', type: '安全培训', date: '2024-01-05', duration: 8, trainer: '安全部-刘主任', location: '公司培训室', participants: 25, passRate: 96, status: '已完成', description: '有限空间作业基础知识、风险识别、安全措施、应急救援等内容' },
        { id: 2, title: '气体检测仪使用培训', type: '技能培训', date: '2024-01-08', duration: 4, trainer: '设备部-王工', location: '设备车间', participants: 15, passRate: 100, status: '已完成', description: '便携式气体检测仪的使用方法、校准方法和日常维护' },
        { id: 3, title: '应急救援演练', type: '应急演练', date: '2024-01-10', duration: 4, trainer: '安全部-刘主任', location: '储罐区', participants: 30, passRate: 93, status: '已完成', description: '有限空间作业事故应急救援演练，包括人员救援、现场急救等' },
        { id: 4, title: '正压式空气呼吸器使用培训', type: '技能培训', date: '2024-01-12', duration: 4, trainer: '安全部-张工', location: '安全培训室', participants: 20, passRate: 95, status: '已完成', description: '正压式空气呼吸器的佩戴、使用和维护方法' },
        { id: 5, title: '有限空间作业法规培训', type: '法规培训', date: '2024-01-18', duration: 4, trainer: '外聘专家', location: '公司会议室', participants: 40, passRate: 0, status: '待开始', description: '有限空间作业相关法律法规、标准规范解读' },
        { id: 6, title: '新员工入职安全培训', type: '安全培训', date: '2024-01-20', duration: 16, trainer: '安全部-刘主任', location: '公司培训室', participants: 10, passRate: 0, status: '待开始', description: '新员工入职安全教育培训，包括公司安全制度、岗位安全操作规程等' }
    ],

    trainingPersons: [
        { id: 1, name: '张三', department: '生产部', position: '操作工', phone: '13800138001', trainings: [1, 2, 3, 4], totalHours: 20, lastTraining: '2024-01-12', certificateNo: 'AQ202301001', certificateExpiry: '2026-01-12', status: '合格' },
        { id: 2, name: '李四', department: '安全部', position: '安全员', phone: '13800138002', trainings: [1, 3, 4], totalHours: 16, lastTraining: '2024-01-12', certificateNo: 'AQ202301002', certificateExpiry: '2026-01-12', status: '合格' },
        { id: 3, name: '王五', department: '生产部', position: '班组长', phone: '13800138003', trainings: [1, 2, 3, 4], totalHours: 20, lastTraining: '2024-01-12', certificateNo: 'AQ202301003', certificateExpiry: '2026-01-12', status: '合格' },
        { id: 4, name: '赵六', department: '设备部', position: '维修工', phone: '13800138004', trainings: [1, 2, 3], totalHours: 16, lastTraining: '2024-01-10', certificateNo: 'AQ202301004', certificateExpiry: '2026-01-10', status: '合格' },
        { id: 5, name: '钱七', department: '生产部', position: '操作工', phone: '13800138005', trainings: [1, 3], totalHours: 12, lastTraining: '2024-01-10', certificateNo: 'AQ202301005', certificateExpiry: '2025-06-15', status: '即将到期' },
        { id: 6, name: '孙八', department: '安全部', position: '安全主管', phone: '13800138006', trainings: [1, 2, 3, 4], totalHours: 20, lastTraining: '2024-01-12', certificateNo: 'AQ202301006', certificateExpiry: '2026-01-12', status: '合格' },
        { id: 7, name: '周九', department: '生产部', position: '操作工', phone: '13800138007', trainings: [1], totalHours: 8, lastTraining: '2024-01-05', certificateNo: 'AQ202301007', certificateExpiry: '2024-07-05', status: '即将到期' },
        { id: 8, name: '吴十', department: '设备部', position: '维修工', phone: '13800138008', trainings: [1, 2, 3, 4], totalHours: 20, lastTraining: '2024-01-12', certificateNo: 'AQ202301008', certificateExpiry: '2026-01-12', status: '合格' }
    ],

    contractors: [
        { id: 1, name: '鑫源清洗服务有限公司', type: '清洗作业', contact: '陈经理', phone: '13900139001', address: '工业园区A区12号', workers: 15, qualification: '化工设备清洗一级资质', qualificationExpiry: '2025-06-30', safetyRecord: '良好', lastWorkDate: '2024-01-10', status: '合作中', description: '专业从事化工设备清洗服务，具有丰富的储罐清洗经验' },
        { id: 2, name: '安达特种设备检测有限公司', type: '检测作业', contact: '王工', phone: '13900139002', address: '科技园区B区5号', workers: 8, qualification: '特种设备检验检测机构核准证', qualificationExpiry: '2025-12-31', safetyRecord: '优秀', lastWorkDate: '2024-01-08', status: '合作中', description: '专业特种设备检测机构，可进行储罐、管道等设备的无损检测' },
        { id: 3, name: '华信防腐保温工程有限公司', type: '防腐作业', contact: '李总', phone: '13900139003', address: '建材市场C区18号', workers: 20, qualification: '防腐保温工程专业承包二级', qualificationExpiry: '2024-09-30', safetyRecord: '良好', lastWorkDate: '2023-12-20', status: '合作中', description: '专业从事储罐、管道等设备的防腐保温施工' },
        { id: 4, name: '恒通管道维修服务部', type: '维修作业', contact: '张师傅', phone: '13900139004', address: '工业园区D区8号', workers: 10, qualification: '管道维修服务资质', qualificationExpiry: '2024-03-31', safetyRecord: '一般', lastWorkDate: '2023-11-15', status: '资质即将到期', description: '专业管道维修服务，可进行管道安装、维修、更换等作业' },
        { id: 5, name: '蓝天环保科技有限公司', type: '环保作业', contact: '刘经理', phone: '13900139005', address: '环保产业园A栋', workers: 12, qualification: '环保工程专业承包三级', qualificationExpiry: '2025-08-31', safetyRecord: '优秀', lastWorkDate: '2024-01-05', status: '合作中', description: '专业环保服务公司，可进行污水处理、废气治理等作业' }
    ],

    evaluationRecords: [
        { id: 1, date: '2024-01-15', type: '月度考评', totalScore: 85, level: '优秀', details: { system: 18, training: 17, equipment: 16, operation: 17, emergency: 17 }, issues: 3, improvements: 5, status: '已完成' },
        { id: 2, date: '2023-12-15', type: '月度考评', totalScore: 82, level: '良好', details: { system: 17, training: 16, equipment: 16, operation: 17, emergency: 16 }, issues: 5, improvements: 8, status: '已完成' },
        { id: 3, date: '2023-11-15', type: '月度考评', totalScore: 78, level: '良好', details: { system: 16, training: 15, equipment: 15, operation: 16, emergency: 16 }, issues: 7, improvements: 10, status: '已完成' },
        { id: 4, date: '2023-10-15', type: '月度考评', totalScore: 80, level: '良好', details: { system: 17, training: 16, equipment: 15, operation: 16, emergency: 16 }, issues: 6, improvements: 9, status: '已完成' },
        { id: 5, date: '2023-09-15', type: '月度考评', totalScore: 75, level: '合格', details: { system: 15, training: 14, equipment: 15, operation: 16, emergency: 15 }, issues: 10, improvements: 12, status: '已完成' },
        { id: 6, date: '2023-01-15', type: '年度考评', totalScore: 88, level: '优秀', details: { system: 18, training: 18, equipment: 17, operation: 18, emergency: 17 }, issues: 2, improvements: 4, status: '已完成' }
    ],

    rectificationItems: [
        { id: 1, issue: '3号储罐检测周期即将到期', source: '系统预警', date: '2024-01-13', department: '生产部', responsible: '李四', deadline: '2024-01-19', status: '整改中', priority: '高', description: '3号储罐上次检测日期为2023-12-20，检测周期30天，即将到期需要安排检测' },
        { id: 2, issue: '5号储罐检测周期即将到期', source: '系统预警', date: '2024-01-13', department: '生产部', responsible: '王五', deadline: '2024-01-24', status: '待整改', priority: '高', description: '5号储罐上次检测日期为2023-12-25，检测周期30天，即将到期需要安排检测' },
        { id: 3, issue: '2号反应釜检测已过期', source: '系统预警', date: '2024-01-01', department: '设备部', responsible: '李四', deadline: '2024-01-30', status: '整改中', priority: '紧急', description: '2号反应釜上次检测日期为2023-12-01，检测周期60天，已过期需要立即安排检测' },
        { id: 4, issue: '部分员工培训证书即将到期', source: '培训检查', date: '2024-01-10', department: '安全部', responsible: '刘主任', deadline: '2024-06-15', status: '待整改', priority: '中', description: '钱七、周九等员工的有限空间作业培训证书即将到期，需要安排复训' },
        { id: 5, issue: '恒通管道维修服务部资质即将到期', source: '承包商检查', date: '2024-01-05', department: '采购部', responsible: '采购经理', deadline: '2024-03-31', status: '待整改', priority: '中', description: '恒通管道维修服务部的管道维修服务资质将于2024-03-31到期，需要督促其更新资质' },
        { id: 6, issue: '地下污水池通风设备故障', source: '日常检查', date: '2024-01-12', department: '设备部', responsible: '赵六', deadline: '2024-01-20', status: '整改中', priority: '高', description: '地下污水池通风风机出现故障，需要及时维修，确保作业安全' }
    ],

    sensorData: {
        o2: { current: 20.5, unit: '%', min: 19.5, max: 23.5, status: 'normal', trend: 'stable' },
        co: { current: 8, unit: 'ppm', min: 0, max: 24, status: 'normal', trend: 'down' },
        h2s: { current: 3, unit: 'ppm', min: 0, max: 10, status: 'normal', trend: 'stable' },
        lel: { current: 2, unit: '%LEL', min: 0, max: 25, status: 'normal', trend: 'stable' },
        temperature: { current: 25, unit: '°C', min: 0, max: 40, status: 'normal', trend: 'up' },
        humidity: { current: 65, unit: '%RH', min: 30, max: 80, status: 'normal', trend: 'stable' }
    },

    sensorHistory: [
        { time: '10:00', o2: 20.8, co: 10, h2s: 4, lel: 3, temperature: 24, humidity: 62 },
        { time: '10:05', o2: 20.7, co: 9, h2s: 4, lel: 3, temperature: 24, humidity: 63 },
        { time: '10:10', o2: 20.6, co: 9, h2s: 3, lel: 2, temperature: 25, humidity: 63 },
        { time: '10:15', o2: 20.5, co: 8, h2s: 3, lel: 2, temperature: 25, humidity: 64 },
        { time: '10:20', o2: 20.5, co: 8, h2s: 3, lel: 2, temperature: 25, humidity: 65 },
        { time: '10:25', o2: 20.4, co: 7, h2s: 3, lel: 2, temperature: 25, humidity: 65 },
        { time: '10:30', o2: 20.5, co: 8, h2s: 3, lel: 2, temperature: 25, humidity: 65 }
    ],

    emergencyContacts: [
        { id: 1, name: '消防部门', phone: '119', type: '紧急救援', priority: 1 },
        { id: 2, name: '急救中心', phone: '120', type: '医疗急救', priority: 2 },
        { id: 3, name: '安全主管', phone: '13800138006', type: '内部联系', priority: 3 },
        { id: 4, name: '生产经理', phone: '13800138007', type: '内部联系', priority: 4 },
        { id: 5, name: '总经理', phone: '13800138008', type: '内部联系', priority: 5 }
    ],

    equipmentList: [
        { id: 1, name: '正压式空气呼吸器', model: 'RHZKF9.0/30', quantity: 10, location: '应急物资室', lastCheck: '2024-01-10', nextCheck: '2024-02-10', status: '正常' },
        { id: 2, name: '便携式气体检测仪', model: 'MSA Altair 5X', quantity: 8, location: '应急物资室', lastCheck: '2024-01-12', nextCheck: '2024-02-12', status: '正常' },
        { id: 3, name: '安全绳', model: '直径16mm', quantity: 6, location: '应急物资室', lastCheck: '2024-01-08', nextCheck: '2024-04-08', status: '正常' },
        { id: 4, name: '三脚架救援装置', model: 'SJ-300', quantity: 2, location: '应急物资室', lastCheck: '2024-01-05', nextCheck: '2024-04-05', status: '正常' },
        { id: 5, name: '防爆照明灯', model: 'BAD85-N100', quantity: 12, location: '应急物资室', lastCheck: '2024-01-10', nextCheck: '2024-04-10', status: '正常' },
        { id: 6, name: '通风机', model: 'BT35-11', quantity: 4, location: '设备间', lastCheck: '2024-01-08', nextCheck: '2024-04-08', status: '正常' },
        { id: 7, name: '防毒面具', model: 'MF11', quantity: 15, location: '应急物资室', lastCheck: '2024-01-10', nextCheck: '2024-02-10', status: '正常' },
        { id: 8, name: '急救箱', model: '标准配置', quantity: 5, location: '各作业点', lastCheck: '2024-01-12', nextCheck: '2024-02-12', status: '正常' }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestData;
}
