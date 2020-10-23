var taskReg = /去搜索|去浏览/;
var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
var speed = 1;

console.show();

log("正在打开淘宝");
launch("com.taobao.taobao");
sleep(2000 * speed);
log("正在等待进入吸猫活动页面");
className('android.widget.FrameLayout').desc("我的淘宝").findOne().click();
sleep(1000 * speed);
className('android.widget.FrameLayout').desc("养猫分20亿").findOne().click();
log("进入活动成功");
sleep(1000 * speed);
className("android.widget.Button").text("赚喵币").findOne().click()
sleep(2000 * speed);
// 获取所有点击按钮
const getBtn = () => {
    return className("android.widget.Button").textMatches(taskReg).findOne(3000);
}

// 领取各项猫币
let waitComputedBtn = getBtn();

while (waitComputedBtn) {
    log('点击按钮');
    waitComputedBtn.click();
    log('开始等待');
    sleep(15000 + (10000 * speed));
    back();
    sleep(1000 * speed);
    log('获取新按钮');
    waitComputedBtn = getBtn();
}

log("结束!");
exit();