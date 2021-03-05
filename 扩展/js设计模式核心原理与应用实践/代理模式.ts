const present = {
  type: "巧克力",
  value: 60
};

const girl = {
  name: "xiaowang",
  aboutMe: "//=.=//",
  age: 25,
  career: "teacher",
  fakeAvatar: "xxxx",
  avatar: "xxxx",
  phone: "15000000000",
  presents: [],
  // 拒收50块以下的礼物
  bottomValue: 50,
  // 记录最近一次收到的礼物
  lastPresent: present
};

const baseInfo = ["age", "career"];
const privateInfo = ["avatar", "phone"];

const user = {
  isValidated: true,
  isVip: false
};

const JuejinLovers = new Proxy(girl, {
  get: function (girl, key: string) {
    if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
      alert("您还未完成验证");
      return;
    }

    if (user.isValidated && privateInfo.indexOf("key") !== -1 && !user.isVip) {
      alert("只有VIP才可以查看该信息");
      return;
    }
  },
  set: function (girl, key: string, val: any) {
    //   最近一次送来的礼物会尝试赋值给lastPresent字段
    if (key === "lastPresent") {
      if (val.value < girl.bottomValue) {
        alert("您的礼物被拒收了");
        return;
      }
      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl.lastPresent = val;
      girl.presents = [...girl.presents, val];
    }
    return true;
  }
});

// const proxy = new Proxy()
