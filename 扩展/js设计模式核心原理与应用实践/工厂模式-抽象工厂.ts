class MobilePhoneFactory {
    // 提供操作系统的接口
    createOs() {
        throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
    }
    
    // 提供硬件的接口
    createHardWare() {
        throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
    }
}

// 定义操作系统这类产品的抽象产品类
class Os {
    constrolHardWare() {
        throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体操作系统的具体产品类
class AndroidOs extends Os {
    constrolHardWare() {
        console.log('我会用安卓的方式去操作硬件');
    }
}

class AppleOs extends Os {
    constrolHardWare() {
        console.log('我会用苹果的方式去操作硬件');
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法, 这里提取了'根据命令运转'这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用, 你需要将我重写');
    }
}

// 定义具体硬件的具体产品类
class QialcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转');
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转');
    }
}

// 具体的工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {

    createOs() {
        // 提供安卓系统实例
        return new AndroidOs()
    }

    createHardWare() {
        // 提供高通硬件实例
        return new QialcommHardWare();
    }

}

const myPhone = new FakeStarFactory();
const myOs = myPhone.createOs();
const myHardWare = myPhone.createHardWare();
myOs.constrolHardWare();
myHardWare.operateByOrder();
